import { db } from "./firestore.js";
import { doc, runTransaction, Timestamp } from "firebase/firestore";

const MAX_EXPIRY_MS = 3 * 60 * 60 * 1000;    // 3 hour hard cap
const UPVOTE_EXTENSION_MS = 30 * 60 * 1000;  // +30 min per upvote

export const voteReport = async (reportId, voteType, uid) => {
  if (voteType !== "up" && voteType !== "down") {
    throw new Error("Invalid vote type");
  }

  const reportRef = doc(db, "reports", reportId);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(reportRef);
    if (!snap.exists()) throw new Error("Report not found");

    const data = snap.data();
    const votedBy = { ...(data.votedBy || {}) };
    const previousVote = votedBy[uid];

    let upvotes = data.upvotes || 0;
    let downvotes = data.downvotes || 0;

    if (previousVote === voteType) {
      delete votedBy[uid];
      if (voteType === "up") upvotes = Math.max(0, upvotes - 1);
      else downvotes = Math.max(0, downvotes - 1);
    } else {
      if (previousVote === "up") upvotes = Math.max(0, upvotes - 1);
      if (previousVote === "down") downvotes = Math.max(0, downvotes - 1);
      votedBy[uid] = voteType;
      if (voteType === "up") upvotes++;
      else downvotes++;
    }

    // Delete instantly on 5 downvotes
    if (downvotes >= 5) {
      transaction.delete(reportRef);
      return;
    }

    const updates = { upvotes, downvotes, votedBy };

    // Extend expiry on a fresh upvote (not when toggling off)
    if (voteType === "up" && previousVote !== "up") {
      const currentExpiry = data.expiresAt.toMillis();
      const createdAt = data.createdAt.toMillis();
      const maxExpiry = createdAt + MAX_EXPIRY_MS;
      const newExpiry = Math.min(currentExpiry + UPVOTE_EXTENSION_MS, maxExpiry);
      updates.expiresAt = Timestamp.fromMillis(newExpiry);
    }

    transaction.update(reportRef, updates);
  });
};
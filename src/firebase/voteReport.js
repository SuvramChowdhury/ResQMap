import { db } from "./firestore.js";
import { doc, runTransaction } from "firebase/firestore";

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

    transaction.update(reportRef, { upvotes, downvotes, votedBy });
  });
};
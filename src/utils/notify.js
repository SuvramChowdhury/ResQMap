export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;
  const permission = await Notification.requestPermission();
  if (permission === "granted" && "serviceWorker" in navigator) {
    await navigator.serviceWorker.register("/sw.js");
  }
  return permission === "granted";
};

export const sendNotification = async (report) => {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const payload = {
    title: "🚨 Nearby Emergency",
    body: `${report.intensity}: ${report.description}`,
    tag: report.id,
  };

  // Mobile — use Service Worker
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      registration.showNotification(payload.title, {
        body: payload.body,
        icon: "/icon.svg",
        badge: "/icon.svg",
        tag: payload.tag,
      });
      return;
    }
  }

  // Desktop fallback
  try {
    new Notification(payload.title, {
      body: payload.body,
      icon: "/icon.svg",
      badge: "/icon.svg",
      tag: payload.tag,
    });
  } catch (e) {
    console.warn("Notification not supported:", e);
  }
};
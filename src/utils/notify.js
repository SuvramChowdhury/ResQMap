export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (report) => {
  if (Notification.permission !== "granted") return;

  new Notification("🚨 Nearby Emergency", {
    body: `${report.intensity}: ${report.description}`,
    icon: "/icon.svg",
    badge: "/icon.svg",
    tag: report.id,
  });
};
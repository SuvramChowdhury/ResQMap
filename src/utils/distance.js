export const getDistance = (c1, c2) => {
  if (
    !c1 ||
    !c2 ||
    typeof c1.lat !== "number" ||
    typeof c1.lng !== "number" ||
    typeof c2.lat !== "number" ||
    typeof c2.lng !== "number"
  ) {
    return Infinity;
  }

  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371e3;

  const lat1Rad = toRad(c1.lat);
  const lat2Rad = toRad(c2.lat);

  const deltaLat = lat2Rad - lat1Rad;
  const deltaLng = toRad(c2.lng - c1.lng);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

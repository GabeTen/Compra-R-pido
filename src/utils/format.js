export const money = (n) => `R$ ${n.toFixed(2).replace('.', ',')}`;

export const FREE_SHIPPING_FROM = 300;
export const shipping = (subtotal) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : 19.9;

export function distanceKm(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLng = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export function formatMoney(cents, currency = "USD") {
  const value = (cents ?? 0) / 100;
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
}


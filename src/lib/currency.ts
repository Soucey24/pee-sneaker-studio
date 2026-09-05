export const PAYMENT_CURRENCY = "GHS" as const;

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: PAYMENT_CURRENCY,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatMoney(amount: number): string {
  return formatPrice(amount).replace("GHS", "GHS").trim();
}

export function toPesewas(amount: number): number {
  return Math.round(amount * 100);
}
export type PaymentMode = "manual_review" | "provider_pending";

export function getPaymentMode(environment: { PAYMENT_PROVIDER?: string }): PaymentMode {
  return environment.PAYMENT_PROVIDER ? "provider_pending" : "manual_review";
}

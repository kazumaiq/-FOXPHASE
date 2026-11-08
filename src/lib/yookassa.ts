/**
 * Minimal server-only YooKassa (ЮKassa) client.
 * Docs: https://yookassa.ru/developers/api
 * Requires YOOKASSA_SHOP_ID and YOOKASSA_SECRET_KEY.
 */
const API = "https://api.yookassa.ru/v3";

export interface YookassaPayment {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  paid: boolean;
  amount: { value: string; currency: string };
  description?: string;
  metadata?: Record<string, string>;
  confirmation?: { type: string; confirmation_url?: string };
}

export function isYookassaConfigured() {
  return Boolean(process.env.YOOKASSA_SHOP_ID && process.env.YOOKASSA_SECRET_KEY);
}

function authHeader() {
  const raw = `${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET_KEY}`;
  return `Basic ${Buffer.from(raw).toString("base64")}`;
}

export async function createYookassaPayment(params: {
  amountRub: number;
  description: string;
  returnUrl: string;
  idempotenceKey: string;
  metadata: Record<string, string>;
  customerEmail: string;
  receiptItems?: { description: string; amountRub: number }[];
}): Promise<YookassaPayment> {
  const body: Record<string, unknown> = {
    amount: { value: params.amountRub.toFixed(2), currency: "RUB" },
    capture: true,
    confirmation: { type: "redirect", return_url: params.returnUrl },
    description: params.description.slice(0, 128),
    metadata: params.metadata,
  };

  // Fiscal receipt (54-ФЗ) — enable with YOOKASSA_SEND_RECEIPT=true if your shop requires it.
  if (process.env.YOOKASSA_SEND_RECEIPT === "true" && params.receiptItems?.length) {
    body.receipt = {
      customer: { email: params.customerEmail },
      items: params.receiptItems.map((item) => ({
        description: item.description.slice(0, 128),
        quantity: "1.00",
        amount: { value: item.amountRub.toFixed(2), currency: "RUB" },
        vat_code: Number(process.env.YOOKASSA_VAT_CODE || 1),
        payment_mode: "full_payment",
        payment_subject: "service",
      })),
    };
  }

  const res = await fetch(`${API}/payments`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Idempotence-Key": params.idempotenceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`YooKassa create payment failed: ${res.status} ${text}`);
  }
  return (await res.json()) as YookassaPayment;
}

export async function getYookassaPayment(id: string): Promise<YookassaPayment | null> {
  if (!/^[a-z0-9-]{10,64}$/i.test(id)) return null;
  const res = await fetch(`${API}/payments/${id}`, {
    headers: { Authorization: authHeader() },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as YookassaPayment;
}

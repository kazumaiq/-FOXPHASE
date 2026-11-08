import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { escapeHtml, notifyProducer } from "@/lib/notify";
import { getYookassaPayment, isYookassaConfigured } from "@/lib/yookassa";

/**
 * Payment webhook receiver.
 *
 * 1. YooKassa notifications (`{ type: "notification", event, object }`):
 *    the payload is NOT trusted — the payment is re-fetched from the YooKassa API
 *    with the shop's secret key and only the API's answer is used.
 * 2. Generic providers: HMAC-SHA256 signature in `x-foxphase-signature`
 *    verified with PAYMENT_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-foxphase-signature");

  // ── Generic HMAC-signed provider ──────────────────────────────
  if (signature) {
    const secret = process.env.PAYMENT_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Webhook secret missing" }, { status: 401 });
    }
    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    const sigBuffer = Buffer.from(signature);
    const expBuffer = Buffer.from(expected);
    if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }
    return NextResponse.json({ verified: true, status: "webhook_accepted" });
  }

  // ── YooKassa ──────────────────────────────────────────────────
  let payload: { type?: string; event?: string; object?: { id?: string } } | null = null;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    payload = null;
  }

  if (!payload?.object?.id || !isYookassaConfigured()) {
    return NextResponse.json({ error: "Webhook secret or signature missing" }, { status: 401 });
  }

  const payment = await getYookassaPayment(payload.object.id);
  if (!payment) {
    return NextResponse.json({ error: "Unknown payment" }, { status: 400 });
  }

  const meta = payment.metadata ?? {};
  const orderId = meta.order_id ?? "—";

  if (payment.status === "succeeded" && payment.paid) {
    const items = (meta.items ?? "")
      .split("|")
      .filter(Boolean)
      .map((entry, i) => `${i + 1}. ${escapeHtml(entry.replace(":", " — "))}`)
      .join("\n");

    await notifyProducer(
      [
        `✅ <b>ОПЛАЧЕНО: заказ ${escapeHtml(orderId)}</b>`,
        "",
        items,
        "",
        `💰 ${escapeHtml(payment.amount.value)} ${escapeHtml(payment.amount.currency)}`,
        `👤 ${escapeHtml(meta.name ?? "")}`,
        `📧 ${escapeHtml(meta.email ?? "")}`,
        `💬 ${escapeHtml(meta.contact ?? "")}`,
        "",
        "📦 Отправьте покупателю файлы и лицензию.",
      ].join("\n")
    );
  } else if (payment.status === "canceled") {
    await notifyProducer(`❌ Оплата заказа <b>${escapeHtml(orderId)}</b> отменена.`);
  }

  // YooKassa expects HTTP 200 to stop retries.
  return NextResponse.json({ received: true, status: payment.status });
}

import { NextResponse } from "next/server";
import { getYookassaPayment, isYookassaConfigured } from "@/lib/yookassa";

/**
 * Buyer-facing payment status check. Status is always read from YooKassa directly,
 * never trusted from the browser return URL.
 */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!isYookassaConfigured()) {
    return NextResponse.json({ status: "not_configured" }, { status: 200 });
  }

  const payment = await getYookassaPayment(id);
  if (!payment) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    status: payment.status,
    paid: payment.paid,
    amount: payment.amount,
    orderId: payment.metadata?.order_id ?? null,
  });
}

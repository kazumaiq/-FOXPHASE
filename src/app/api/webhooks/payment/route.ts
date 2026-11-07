import { NextResponse } from "next/server";
import crypto from "node:crypto";

/**
 * Independent Payment Provider Webhook Receiver.
 * Strictly verifies HMAC signature using PAYMENT_WEBHOOK_SECRET before
 * transitioning any order to `paid` or creating download entitlements.
 */
export async function POST(request: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  const signature = request.headers.get("x-foxphase-signature");

  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Webhook secret or signature missing" },
      { status: 401 }
    );
  }

  const rawBody = await request.text();
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  const sigBuffer = Buffer.from(signature);
  const expBuffer = Buffer.from(expected);

  if (
    sigBuffer.length !== expBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expBuffer)
  ) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 401 }
    );
  }

  return NextResponse.json({ verified: true, status: "webhook_accepted" });
}

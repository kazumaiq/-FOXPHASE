import { NextResponse } from "next/server";
import { z } from "zod";
import { getPaymentMode } from "@/lib/payment";
import { beats } from "@/content/site";

const schema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(2).max(120),
  contact: z.string().trim().min(2).max(160),
  items: z
    .array(
      z.object({
        beatId: z.string().min(1).max(120),
        licenseId: z.string().min(1).max(60),
      })
    )
    .min(1)
    .max(20),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout" }, { status: 400 });
  }

  // Server-side catalog price & availability verification (never trust client price)
  let serverTotalUsd = 0;
  for (const item of parsed.data.items) {
    const beat = beats.find((b) => b.id === item.beatId || b.slug === item.beatId);
    const license = beat?.licenses.find((l) => l.id === item.licenseId);
    if (!beat || beat.status !== "available" || !license) {
      return NextResponse.json(
        { error: "Unavailable beat or license tier" },
        { status: 400 }
      );
    }
    serverTotalUsd += license.price;
  }

  const mode = getPaymentMode({
    PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER,
  });

  return NextResponse.json(
    {
      status: mode,
      verifiedTotalUsd: serverTotalUsd,
      message:
        mode === "manual_review"
          ? "Request received; no payment has been confirmed."
          : "Order is awaiting provider webhook confirmation.",
    },
    { status: 202 }
  );
}

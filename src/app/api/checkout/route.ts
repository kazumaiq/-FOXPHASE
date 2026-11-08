import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { getPaymentMode } from "@/lib/payment";
import { beats } from "@/content/site";
import { getLicenseMeta } from "@/lib/shop";
import { escapeHtml, notifyProducer } from "@/lib/notify";
import { createYookassaPayment, isYookassaConfigured } from "@/lib/yookassa";

const schema = z.object({
  email: z.string().trim().email().max(160),
  name: z.string().trim().min(2).max(120),
  contact: z.string().trim().min(2).max(160),
  comment: z.string().trim().max(600).optional().default(""),
  locale: z.enum(["en", "ru"]).optional().default("ru"),
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

function createOrderId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `FX-${stamp}${rand}`;
}

function siteOrigin(request: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromRequest = new URL(request.url).origin;
  // Prefer the real request origin on preview deployments / localhost.
  if (fromRequest.includes("localhost") || fromRequest.includes("vercel.app")) {
    return fromRequest;
  }
  return fromEnv || fromRequest;
}

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_form", message: "Проверьте email, имя и контакт." },
      { status: 400 }
    );
  }

  const { email, name, contact, comment, locale, items } = parsed.data;

  // Server-side catalog price & availability verification (never trust client price)
  const lines: { title: string; slug: string; license: string; rub: number; usd: number }[] = [];
  for (const item of items) {
    const beat = beats.find((b) => b.id === item.beatId || b.slug === item.beatId);
    const license = beat?.licenses.find((l) => l.id === item.licenseId);
    if (!beat || beat.status !== "available" || !license) {
      return NextResponse.json(
        { error: "unavailable", message: "Бит или лицензия недоступны." },
        { status: 400 }
      );
    }
    const meta = getLicenseMeta(license.id);
    if (!meta.online) {
      return NextResponse.json(
        {
          error: "exclusive_offline",
          message:
            "Exclusive Rights оформляются индивидуально — напишите продюсеру через страницу контактов.",
        },
        { status: 400 }
      );
    }
    lines.push({
      title: beat.title,
      slug: beat.slug,
      license: meta.name,
      rub: meta.priceRub,
      usd: meta.priceUsd,
    });
  }

  const totalRub = lines.reduce((s, l) => s + l.rub, 0);
  const totalUsd = lines.reduce((s, l) => s + l.usd, 0);
  const orderId = createOrderId();
  const origin = siteOrigin(request);

  const orderSummary = lines
    .map((l, i) => `${i + 1}. ${escapeHtml(l.title)} — ${l.license} — ${l.rub} ₽ / $${l.usd}`)
    .join("\n");

  const useYookassa = isYookassaConfigured();
  const mode = useYookassa ? "yookassa" : getPaymentMode({ PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER });

  // ── Online payment through YooKassa ─────────────────────────────
  if (useYookassa) {
    try {
      const payment = await createYookassaPayment({
        amountRub: totalRub,
        description: `FOXPHASE ${orderId}: ${lines.map((l) => `${l.title} (${l.license})`).join(", ")}`,
        returnUrl: `${origin}/checkout/success?order=${orderId}`,
        idempotenceKey: crypto.randomUUID(),
        customerEmail: email,
        metadata: {
          order_id: orderId,
          email: email.slice(0, 160),
          name: name.slice(0, 120),
          contact: contact.slice(0, 160),
          items: lines.map((l) => `${l.slug}:${l.license}`).join("|").slice(0, 500),
        },
        receiptItems: lines.map((l) => ({
          description: `Лицензия ${l.license} на бит ${l.title}`,
          amountRub: l.rub,
        })),
      });

      await notifyProducer(
        [
          `🕒 <b>Новый заказ ${orderId}</b> — ожидает оплаты (ЮKassa)`,
          "",
          orderSummary,
          "",
          `💰 Итого: <b>${totalRub} ₽</b> ($${totalUsd})`,
          `👤 ${escapeHtml(name)}`,
          `📧 ${escapeHtml(email)}`,
          `💬 ${escapeHtml(contact)}`,
          comment ? `📝 ${escapeHtml(comment)}` : "",
          `🔑 payment: <code>${payment.id}</code>`,
        ]
          .filter(Boolean)
          .join("\n")
      );

      return NextResponse.json(
        {
          mode: "redirect",
          orderId,
          paymentId: payment.id,
          confirmationUrl: payment.confirmation?.confirmation_url,
          totalRub,
          totalUsd,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error: "payment_provider",
          message:
            locale === "ru"
              ? "Платёжная система временно недоступна. Попробуйте ещё раз или напишите в Telegram."
              : "Payment provider is temporarily unavailable. Try again or message on Telegram.",
        },
        { status: 502 }
      );
    }
  }

  // ── Manual payment (transfer / Telegram) ───────────────────────
  const notified = await notifyProducer(
    [
      `🛒 <b>Новый заказ ${orderId}</b> — ручная оплата`,
      "",
      orderSummary,
      "",
      `💰 Итого: <b>${totalRub} ₽</b> ($${totalUsd})`,
      `👤 ${escapeHtml(name)}`,
      `📧 ${escapeHtml(email)}`,
      `💬 ${escapeHtml(contact)}`,
      comment ? `📝 ${escapeHtml(comment)}` : "",
      "",
      "➡️ Свяжитесь с покупателем, подтвердите оплату и отправьте файлы.",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return NextResponse.json(
    {
      mode: "manual",
      status: mode,
      orderId,
      totalRub,
      totalUsd,
      producerNotified: notified,
      paymentDetails: process.env.PAYMENT_MANUAL_DETAILS || null,
      lines: lines.map((l) => ({ title: l.title, license: l.license, rub: l.rub, usd: l.usd })),
    },
    { status: 201 }
  );
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { addLead } from "@/lib/admin-store";
import { escapeHtml, notifyProducer } from "@/lib/notify";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email(),
  topic: z.enum([
    "Collaboration",
    "Custom Beat",
    "Mixing",
    "Mastering",
    "Exclusive Rights",
  ]),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, topic, message } = parsed.data;

  // Save to Admin Panel
  const savedLead = addLead({
    name,
    email,
    topic,
    message,
  });

  // Telegram notification to producer
  await notifyProducer(
    [
      `📩 <b>Новая заявка с сайта</b> (ID: ${savedLead.id})`,
      `👤 <b>Имя:</b> ${escapeHtml(name)}`,
      `📧 <b>Email:</b> ${escapeHtml(email)}`,
      `🏷️ <b>Тема:</b> ${escapeHtml(topic)}`,
      "",
      `💬 <b>Сообщение:</b>`,
      escapeHtml(message),
    ].join("\n")
  );

  return NextResponse.json(
    { status: "received", mode: "manual_review", id: savedLead.id },
    { status: 202 }
  );
}

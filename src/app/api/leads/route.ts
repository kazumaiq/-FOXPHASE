import { NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().email(), topic: z.enum(["Collaboration", "Custom Beat", "Mixing", "Mastering", "Exclusive Rights"]), message: z.string().trim().min(10).max(4000) });
export async function POST(request: Request) { const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 }); return NextResponse.json({ status: "received", mode: "manual_review" }, { status: 202 }); }

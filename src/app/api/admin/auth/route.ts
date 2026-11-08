import { NextResponse } from "next/server";
import { createAdminToken, getAdminPassword } from "@/lib/admin-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = body?.password;

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "missing_password" }, { status: 400 });
  }

  const expected = getAdminPassword();
  if (password.trim() !== expected.trim()) {
    return NextResponse.json(
      { error: "invalid_password", message: "Неверный пароль администратора" },
      { status: 401 }
    );
  }

  const token = createAdminToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set("foxphase_admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ loggedOut: true });
  response.cookies.delete("foxphase_admin_token");
  return response;
}

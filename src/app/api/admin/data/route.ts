import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getOrders,
  getLeads,
  updateOrderStatus,
  deleteOrder,
  updateLeadStatus,
  deleteLead,
  verifyAdminToken,
} from "@/lib/admin-store";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("foxphase_admin_token")?.value;
  return verifyAdminToken(token);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const orders = getOrders();
  const leads = getLeads();

  return NextResponse.json({
    orders,
    leads,
    stats: {
      totalOrders: orders.length,
      newOrders: orders.filter((o) => o.status === "new").length,
      totalRevenueRub: orders
        .filter((o) => o.status === "confirmed" || o.status === "completed")
        .reduce((sum, o) => sum + o.totalRub, 0),
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === "new").length,
    },
  });
}

export async function PATCH(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { type, id, status } = body;

  if (type === "order" && id && status) {
    const ok = updateOrderStatus(id, status);
    return NextResponse.json({ success: ok });
  }

  if (type === "lead" && id && status) {
    const ok = updateLeadStatus(id, status);
    return NextResponse.json({ success: ok });
  }

  return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!id || !type) {
    return NextResponse.json({ error: "missing_id_or_type" }, { status: 400 });
  }

  if (type === "order") {
    deleteOrder(id);
    return NextResponse.json({ deleted: true });
  }

  if (type === "lead") {
    deleteLead(id);
    return NextResponse.json({ deleted: true });
  }

  return NextResponse.json({ error: "invalid_type" }, { status: 400 });
}

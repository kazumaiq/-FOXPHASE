import crypto from "node:crypto";

export interface StoredOrder {
  id: string;
  orderId: string;
  name: string;
  email: string;
  contact: string;
  comment?: string;
  items: { title: string; license: string; rub: number; usd: number }[];
  totalRub: number;
  totalUsd: number;
  status: "new" | "confirmed" | "completed" | "canceled";
  createdAt: string;
  source: "checkout" | "direct";
}

export interface StoredLead {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "new" | "in_progress" | "closed";
  createdAt: string;
}

// Global in-memory storage that persists across requests within the server runtime.
// For persistent database backup, Supabase tables `orders` and `leads` can also be connected.
const globalOrders: StoredOrder[] = [
  {
    id: "ord-seed-01",
    orderId: "FX-INIT1",
    name: "Demo Artist",
    email: "artist@sample.com",
    contact: "@sample_artist",
    comment: "Нужен чистый микс и дорожки без тегов.",
    items: [
      { title: "CHROME PRESSURE", license: "WAV LEASE", rub: 2000, usd: 20 },
      { title: "OBSIDIAN ECHO", license: "TRACKOUT LEASE", rub: 5700, usd: 70 },
    ],
    totalRub: 7700,
    totalUsd: 90,
    status: "new",
    createdAt: new Date().toISOString(),
    source: "checkout",
  },
];

const globalLeads: StoredLead[] = [
  {
    id: "lead-seed-01",
    name: "Alex Prod",
    email: "alex@sound.fm",
    topic: "Collaboration",
    message: "Привет, FOXPHASE! Хотим предложить совместный релиз на нашем лейбле. Понравился трек BLADE.",
    status: "new",
    createdAt: new Date().toISOString(),
  },
];

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "foxphase2026";
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = crypto
    .createHash("sha256")
    .update(getAdminPassword())
    .digest("hex");
  return token === expected;
}

export function createAdminToken(): string {
  return crypto
    .createHash("sha256")
    .update(getAdminPassword())
    .digest("hex");
}

export function addOrder(order: Omit<StoredOrder, "id" | "createdAt" | "status">): StoredOrder {
  const newOrder: StoredOrder = {
    ...order,
    id: `ord-${Date.now().toString(36)}-${crypto.randomBytes(3).toString("hex")}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  globalOrders.unshift(newOrder);
  if (globalOrders.length > 200) globalOrders.pop();
  return newOrder;
}

export function getOrders(): StoredOrder[] {
  return globalOrders;
}

export function updateOrderStatus(orderId: string, status: StoredOrder["status"]): boolean {
  const ord = globalOrders.find((o) => o.id === orderId || o.orderId === orderId);
  if (!ord) return false;
  ord.status = status;
  return true;
}

export function deleteOrder(orderId: string): boolean {
  const idx = globalOrders.findIndex((o) => o.id === orderId || o.orderId === orderId);
  if (idx === -1) return false;
  globalOrders.splice(idx, 1);
  return true;
}

export function addLead(lead: Omit<StoredLead, "id" | "createdAt" | "status">): StoredLead {
  const newLead: StoredLead = {
    ...lead,
    id: `lead-${Date.now().toString(36)}-${crypto.randomBytes(3).toString("hex")}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  globalLeads.unshift(newLead);
  if (globalLeads.length > 200) globalLeads.pop();
  return newLead;
}

export function getLeads(): StoredLead[] {
  return globalLeads;
}

export function updateLeadStatus(id: string, status: StoredLead["status"]): boolean {
  const lead = globalLeads.find((l) => l.id === id);
  if (!lead) return false;
  lead.status = status;
  return true;
}

export function deleteLead(id: string): boolean {
  const idx = globalLeads.findIndex((l) => l.id === id);
  if (idx === -1) return false;
  globalLeads.splice(idx, 1);
  return true;
}

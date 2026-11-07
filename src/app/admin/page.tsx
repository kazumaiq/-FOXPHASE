import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AdminConsole } from "@/components/admin-console";

export default function AdminPage() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E8E8]">
      <SiteHeader />
      <main>
        <AdminConsole supabaseConfigured={supabaseConfigured} />
      </main>
      <SiteFooter />
    </div>
  );
}

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AdminConsole } from "@/components/admin-console";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E8E8]">
      <SiteHeader />
      <main>
        <AdminConsole />
      </main>
      <SiteFooter />
    </div>
  );
}

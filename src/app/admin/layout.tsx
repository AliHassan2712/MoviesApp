import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>


      <div className="bg-card border border-main rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-[calc(100vh-140px)]">
          <div className="border-b border-main lg:border-b-0 lg:border-r border-main">
            <AdminSidebar />
          </div>

          <main className="p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

    </>
  );
}

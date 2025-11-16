// app/dashboard/layout.tsx (The sub layout)
import TTLayoutWrapper from "@/componets/TTLayoutWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* 🌞 Sun-Themed Sidebar/Navigation */}
    

      {/* Main content area */}
      <main className="w-full bg-white">
        {/* The children here will be the dashboard/page.tsx or dashboard/settings/page.tsx */}
          <TTLayoutWrapper>
        {children}
        </TTLayoutWrapper>
      </main>

      
    </div>
  );
}
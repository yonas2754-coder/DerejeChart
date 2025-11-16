// app/dashboard/layout.tsx (The sub layout)
import TTLayoutWrapper from "@/componets/TTLayoutWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      
      {/* 🌞 Sun-Themed Sidebar/Navigation */}
    

      {/* Main content area */}
   
        {/* The children here will be the dashboard/page.tsx or dashboard/settings/page.tsx */}
          <TTLayoutWrapper>
        {children}
        </TTLayoutWrapper>
  

      
    </div>
  );
}
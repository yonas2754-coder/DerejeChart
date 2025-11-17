// app/dashboard/layout.tsx (The sub layout)
import TTLayoutWrapper from "@/componets/TTLayoutWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div  className="w-screen h-full flex flex-col bg-gray-100 overflow-hidden p-0">
      
      {/* 🌞 Sun-Themed Sidebar/Navigation */}
    

      {/* Main content area */}
   
        {/* The children here will be the dashboard/page.tsx or dashboard/settings/page.tsx */}
          <TTLayoutWrapper>
        {children}
        </TTLayoutWrapper>
  

      
    </div>
  );
}
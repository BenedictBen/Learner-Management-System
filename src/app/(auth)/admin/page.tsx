"use client"
import DashboardHome from "./(protected)/dashboard/DashboardHome"
import Dashboardlayout from "./(protected)/dashboard/layout"
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AdminPage = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);


  return (
    <div> 
      {children}
    </div>
  )
}

export default AdminPage
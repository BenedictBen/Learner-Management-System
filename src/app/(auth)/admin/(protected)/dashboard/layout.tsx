"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Avatar, Spinner } from "@chakra-ui/react"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { useRouter,usePathname  } from "next/navigation";
import { loadSession,AdminUser  } from "@/features/authSlice"
import { ModeToggle } from "@/components/ModeToggle"
import AdminFooter from "@/components/Admin/AdminFooter"

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const { isAuthenticated, user, loading } = useSelector(
  (state: RootState) => state.auth,
  shallowEqual
);

const pathname = usePathname();
const router = useRouter();
const dispatch = useDispatch();


  // Close sidebar when path changes
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

useEffect(() => {
  dispatch(loadSession());
}, [dispatch]);

useEffect(() => {
  if (!loading) {
    console.log("isAuthenticated:", isAuthenticated, "Admin:", user);
    const isAdmin = user?.role === "admin";
    if (!isAuthenticated || !isAdmin) {
      router.push("/admin/login");
    }
  }
}, [isAuthenticated, user, loading, router]);
 
 
 const sidebarRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const handleOutsideClick = (e: MouseEvent) => {
       if (
         isSidebarOpen &&
         sidebarRef.current &&
         !sidebarRef.current.contains(e.target as Node)
       ) {
         setIsSidebarOpen(false);
       }
     };
 
     if (isSidebarOpen) {
       document.addEventListener("mousedown", handleOutsideClick);
     }
 
     return () => {
       document.removeEventListener("mousedown", handleOutsideClick);
     };
   }, [isSidebarOpen]);
 
 
   const getDisplayName = () => {
    if (!user) return "Guest";
    if (user.role === "admin") {
      // Tell TypeScript this is an AdminUser
      const admin = user as AdminUser;
      return `${admin.first_name} ${admin.last_name}`;
    }  
    
    return user.email?.split("@")[0] || "User";
  };
 const getInitials = (name: string) => {
   return name
     .split(/[\s_]+/)
     .slice(0, 2)
     .map((part) => part[0]?.toUpperCase() || "")
     .join("");
 };

 if (loading) {
  return <div className="w-screen h-screen flex items-center justify-center">
      <Spinner size="xl" color="#01589A"/>
  </div>;
}

  return (
        <div className="flex h-screen w-screen bg-white dark:bg-black">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white  shadow-lg transition-transform md:static md:translate-x-0",
            isSidebarOpen ? "translate-y-[64px]" : "-translate-x-full"
          )}
          style={{
            top: isSidebarOpen && window.innerWidth < 768 ? "4px" : undefined, // Apply top offset only on small screens
          }}
        > 
          <AppSidebar />
        </div>
    
        {/* Main Content Area */}
        <div className="relative flex-1 overflow-auto ml-0 ">
          {/* Header */}
          <header className="h-16 shrink-0 flex gap-2 items-center px-4 z-50 relative sticky top-0 bg-white  dark:bg-black shadow-sm">
          <div className="block md:hidden">
            <Image src="/logo-L.png" width={70} height={70} alt="logo"/>
          </div>
    
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="mr-4 md:hidden"
            >
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
         
            <div className="flex items-center justify-end w-full gap-4">
            <ModeToggle/>
            <div className="flex items-center justify-center gap-4 bg-casbGreyBorder dark:bg-black p-2">
    
              <Avatar 
               src={user?.image || undefined}
               name={getDisplayName()}
              bg="teal.500"
              boxSize="50"
              getInitials={(name) => getInitials(name)}
              />
              <span>{getDisplayName()}</span>
            </div>
          </div>
          </header>
    
          {/* Main Content */}
          <main className="p-4 md:p-6 overflow-y-auto flex-1">
            {children}
          </main>
          <AdminFooter/>
        </div>
      </div>
  );
};

export default Dashboardlayout


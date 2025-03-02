"use client"

import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { logout } from "@/features/authSlice";
import { usePathname } from "next/navigation";
import { handleGoogleSignOut } from "@/actions/auth-actions";
import { clearCourseState } from "@/features/courseSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"
import { useLogout } from "@/hooks/admin/useAuth"


type NavItem = {
  title: string
  url: string
  image: string
  className?: string
  isActive?: boolean;
}
const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    image: "/admin/dashboard-white.png",
  },
  {
    title: "Invoices",
    url: "/admin/dashboard/invoices",
    image: "/admin/invoices.png",
  },
  {
    title: "Learner",
    url: "/admin/dashboard/learner", 
    image: "/admin/learners.png",
  },
  {
    title: "Courses",
    url: "/admin/dashboard/courses", 
    image: "/admin/hat-white.png",
  },
  {
    title: "Report",
    url: "/admin/dashboard/reports",
    image: "/admin/dashboard-white.png",
  },
]
const data = {

  navFooter: [
    {
      title: "Settings",
      url: "/admin/dashboard/settings",
      image: "/admin/settings.png",

      
    },
    {
      title: "Logout",
      url: "/admin",
      image: "/admin/logout.png",

      
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      image: "/admin/dashboard-white.png",
      isActive: true,
      
    },
    {
      title: "Invoices",
      url: "/admin/dashboard/invoices",
      image: "/admin/invoices.png",

    },
    {
      title: "Learners",
      url: "/admin/dashboard/learner", 
      image: "/admin/learners.png",

    
    },
    {
      title: "Courses",
      url: "/admin/dashboard/courses", 
      image: "/admin/hat-white.png",

    },
    {
      title: "Report",
      url: "/admin/dashboard/reports",
      image: "/admin/dashboard-white.png",

    },
  ],

  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

    const dispatch = useDispatch();
    const { mutate: logoutMutation } = useLogout();
      const router = useRouter();
    
  
      const handleLogout = async () => {
        try {
          // Call the mutation function, not the hook itself
          logoutMutation();
        } catch (error) {
          console.error("Logout error:", error);
        }
      };
  return (

<nav className="flex flex-col h-[calc(100vh-64px)] md:h-full py-4 px-2 bg-casbBluePrimary dark:bg-gray-900">
      {/* Logo */}
      <div className="hidden mb-4 w-auto py-6 px-3 bg-white dark:bg-black md:flex items-center justify-center">
        <Image src="/logo-L.png" alt="Logo" className="" width={100} height={100} />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-2 grow text-white">
        {navItems.map((item) => (
        <Link
        key={item.title}
        href={item.url}
        className={cn(
          "group flex items-center gap-3 px-4 py-2 rounded-md transition-colors ",
          pathname === item.url 
            ? "bg-white text-casbBluePrimary dark:bg-black dark:text-white" 
            : "hover:bg-white hover:text-casbBluePrimary dark:hover:bg-black dark:hover:text-white"
        )}
      >
        {/* Image with identical active/hover filters */}
        <Image
          src={item.image}
          alt={item.title}
          width={20}
          height={20}
          className={cn(
            "transition-all duration-300",
            // Default state (original colors)
            "[filter:initial]",
            // Apply SAME filter for both active and hover
            pathname === item.url && "active-hover-filter",
            "group-hover:active-hover-filter"
          )}
        />
      
        <span className="md:inline-block transition-colors">
          {item.title}
        </span>
      </Link>
        ))}
      </div>

      {/* Footer Links */}
      <div className="space-y-2 text-white shrink-0 sticky bottom-0">
  <Link
    href="/admin/dashboard/settings"
    className={cn(
      "group flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
      pathname === "/admin/dashboard/settings" 
        ? "bg-white text-casbBluePrimary dark:bg-black dark:text-white"
        : "hover:bg-white hover:text-casbBluePrimary dark:hover:bg-black dark:hover:text-white"
    )}
  >
    <Image
      src="/settings.png"
      alt="Settings"
      width={20}
      height={20}
      className={cn(
        "w-6 h-6 transition-all",
        // Apply blue filter for both active and hover
        pathname === "/admin/dashboard/settings" && "active-hover-filter",
        "group-hover:active-hover-filter"
      )}
    />
    <span className="transition-colors">
      Settings
    </span>
  </Link>

  <Link
    href=""
    onClick={handleLogout}
    className={cn(
      "group flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
      pathname === "/admin/dashboard/logout" 
        ? "bg-white text-casbBluePrimary dark:bg-black dark:text-white"
        : "hover:bg-white hover:text-casbBluePrimary dark:hover:bg-black dark:hover:text-white"
    )}
  >
    <Image
      src="/logout.png"
      alt="Logout"
      width={20}
      height={20}
      className={cn(
        "w-6 h-6 transition-all",
        // Apply same blue filter for consistency
        pathname === "/admin/dashboard/logout" && "active-hover-filter",
        "group-hover:active-hover-filter"
      )}
    />
    <span className="transition-colors">
      Logout
    </span>
  </Link>
</div>

    </nav>
  )
}

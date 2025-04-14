"use client" // Required for theme provider
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light" // Force dark mode for admin
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <nav className="bg-gray-100 dark:bg-gray-800 ">
          {/* Admin navigation */}
        </nav>
        <main>
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
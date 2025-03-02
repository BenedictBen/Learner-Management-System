"use client" // Required for theme provider

import { ThemeProvider } from "@/components/theme-provider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark" // Force dark mode for admin
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
"use client"



import {
  Collapsible,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,

  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import Link from "next/link"

type NavMainProps = {
  items: Array<NavItem & Record<string, any>>;
};

export function NavMain({
  items,
}: NavMainProps) {
   return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url} className={cn("text-lg", item.className)}>
                <img
                    src={item.image}
                    alt={item.title}
                    className={cn(
                      "w-6 h-6 mr-2 transition duration-300",
                      (item.isActive || (item.className?.includes("hover") ?? false)) 
                        ? "brightness-100 text:blue-500" // Active or hover state: original color
                      : "brightness-50 group-hover:brightness-100"
                    )}
                  />
                  <span >{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

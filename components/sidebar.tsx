"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Calendar,
  Users,
  Image as ImageIcon,
  BarChart3,
  UserCircle,
  Menu,
  CogIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Attendance", href: "/attendance", icon: Users },
  { name: "Fixtures", href: "/fixtures", icon: Calendar },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
  { name: "Stats Center", href: "/stats", icon: BarChart3 },
  { name: "Profile", href: "/profile", icon: UserCircle },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative border-r bg-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <span className="text-lg font-semibold">Team Manager</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-1 p-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "px-2" : "px-4"
                )}
              >
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

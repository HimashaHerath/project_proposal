"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plus, LayoutDashboard, FileText, Settings, ScrollText } from "lucide-react";
import { settingsStore } from "@/lib/settingsStore";
import { useEffect, useState } from "react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Proposal", href: "/proposal/new", icon: Plus },
    { name: "New Contract", href: "/contract/new", icon: ScrollText },
    { name: "Drafts", href: "/proposal/drafts", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Sidebar (Sheet) */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] p-0 flex flex-col h-full bg-background border-r">
                    <SidebarContent pathname={pathname} />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-[240px] border-r bg-background h-screen fixed top-0 left-0 z-40">
                <SidebarContent pathname={pathname} />
            </aside>
        </>
    );
}

function SidebarContent({ pathname }: { pathname: string }) {
    const [brand, setBrand] = useState({ name: "Agency Name", initials: "A" });

    useEffect(() => {
        const settings = settingsStore.get();
        if (settings.brandName) {
            setBrand({
                name: settings.brandName,
                initials: settings.brandName.charAt(0).toUpperCase(),
            });
        }
    }, []);

    return (
        <div className="flex flex-col h-full py-6">
            {/* Logo */}
            <div className="px-6 pb-6 border-b">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center text-sm">
                        {brand.initials}
                    </div>
                    {brand.name.toLowerCase()}.
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

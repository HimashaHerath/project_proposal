import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-muted/40 font-sans">
            <AppSidebar />
            <main className="md:ml-[240px] p-8 md:p-12 transition-all duration-300">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

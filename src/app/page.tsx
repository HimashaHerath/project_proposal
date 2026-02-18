import Link from "next/link";
import { ArrowRight, FileText, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="max-w-2xl text-center space-y-8 p-8">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            Proposal & Contract Generator
          </div>
          <h1 className="text-6xl font-bold tracking-tight">infrasurge.</h1>
          <p className="text-xl text-muted-foreground">
            Create premium, print-perfect proposals in seconds.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full">
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight size={20} className="ml-2" />
            </Link>
          </Button>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <Feature
            icon={<Layers size={20} />}
            title="Minimalist Design"
            desc="Clean typography and ethereal gradients that impress."
          />
          <Feature
            icon={<FileText size={20} />}
            title="A4 Print Ready"
            desc="Pixel-perfect layout designed specifically for PDF output."
          />
          <Feature
            icon={<Zap size={20} />}
            title="Fast Workflow"
            desc="Enter details, preview instantly, and download."
          />
        </div>
      </div>

      {/* Background Decor - subtle monochrome radial glow */}
      <div className="fixed bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-muted/50 blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-muted/50 blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card className="border-border/50">
      <CardContent className="pt-6 space-y-2">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">{icon}</span>
        </div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}

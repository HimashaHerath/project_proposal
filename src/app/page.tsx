import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black">
      <div className="max-w-2xl text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight">infrasurge.</h1>
          <p className="text-xl text-gray-500">
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

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <Feature
            title="Minimalist Design"
            desc="Clean typography and ethereal gradients that impress."
          />
          <Feature
            title="A4 Print Ready"
            desc="Pixel-perfect layout designed specifically for PDF output."
          />
          <Feature
            title="Fast Workflow"
            desc="Enter details, preview instantly, and download."
          />
        </div>
      </div>

      {/* Background Decor */}
      <div className="fixed bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-yellow-50 via-orange-50 to-red-50 blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-2">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <FileText size={20} className="text-gray-600" />
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ContractData } from "@/lib/contractSchema";
import { ContractPreview } from "@/components/contract/ContractPreview";

function ContractPreviewContent() {
    const searchParams = useSearchParams();
    const dataParam = searchParams.get("data");
    const [data, setData] = useState<ContractData | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (dataParam) {
            try {
                const decoded = JSON.parse(atob(dataParam));
                setData(decoded);
            } catch (e) {
                console.error("Failed to decode contract data", e);
            }
        }
    }, [dataParam]);

    const handleDownload = async () => {
        if (!data) return;
        setIsGenerating(true);
        try {
            const response = await fetch("/api/pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, type: "contract" }), // Add type flag
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${data.clientName.replace(/\s+/g, "_")}_Contract.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert("Failed to generate PDF");
            }
        } catch (error) {
            console.error(error);
            alert("Error generating PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!data) return <div className="p-8">Loading contract...</div>;

    return (
        <div className="min-h-screen bg-muted p-8 print:p-0">
            {/* Toolbar - Hidden in Print */}
            <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center print:hidden">
                <Link href="/contract/new">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Edit Contract
                    </Button>
                </Link>
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => window.print()} variant="secondary">
                        Print / Save as PDF
                    </Button>
                    <Button onClick={handleDownload} disabled={isGenerating} size="sm">
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                        Download High-Res PDF
                    </Button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex justify-center print:block">
                <ContractPreview data={data} />
            </div>
        </div>
    );
}

export default function ContractPreviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContractPreviewContent />
        </Suspense>
    );
}

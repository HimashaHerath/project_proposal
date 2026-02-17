"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CoverPage } from "@/components/preview/CoverPage";
import { ProjectBriefPage } from "@/components/preview/ProjectBriefPage";
import { PricingPage } from "@/components/preview/PricingPage";
import { TermsPage } from "@/components/preview/TermsPage";
import { ProposalData } from "@/lib/schema";
import { Loader2, Download } from "lucide-react";

function PreviewContent() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<ProposalData | null>(null);
    const [loading, setLoading] = useState(true);
    const [generatingPdf, setGeneratingPdf] = useState(false);

    useEffect(() => {
        const dataParam = searchParams.get("data");
        if (dataParam) {
            try {
                const parsed = JSON.parse(atob(dataParam));
                setData(parsed);
            } catch (e) {
                console.error("Failed to parse proposal data", e);
            }
        }
        setLoading(false);
    }, [searchParams]);

    const handleDownload = async () => {
        if (!data) return;
        setGeneratingPdf(true);
        try {
            const response = await fetch("/api/pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to generate PDF");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${data.projectName.replace(/\s+/g, "_")}_Proposal.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error(error);
            alert("Error generating PDF");
        } finally {
            setGeneratingPdf(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <p>No proposal data found.</p>
                <Button asChild>
                    <Link href="/proposal/new">Create New</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-8 py-12 bg-gray-100 min-h-screen">
            <div className="flex gap-4 print:hidden">
                <Button variant="secondary" asChild>
                    <Link href={`/proposal/new?data=${btoa(JSON.stringify(data))}`}>
                        Edit Data
                    </Link>
                </Button>
                <Button
                    onClick={handleDownload}
                    disabled={generatingPdf}
                    className="gap-2"
                >
                    {generatingPdf ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                        <Download className="w-4 h-4" />
                    )}
                    {generatingPdf ? "Generating..." : "Download PDF"}
                </Button>
            </div>

            <div id="proposal-content" className="space-y-0 shadow-2xl print:shadow-none bg-white">
                <CoverPage
                    clientName={data.clientName}
                    projectName={data.projectName}
                    projectType={data.projectType}
                    authorName={data.authorName}
                    authorRole={data.authorRole}
                    date={new Date().toLocaleDateString()}
                    brandName={data.brandName}
                    brandDescription={data.brandDescription}
                />

                <ProjectBriefPage
                    overview={data.overview}
                    successCriteria={data.successCriteria}
                    includedScope={data.includedScope}
                    excludedScope={data.excludedScope}
                    assumptions={data.assumptions}
                    authorName={data.authorName}
                    authorContact={data.authorContact}
                    authorEmail={data.authorEmail}
                />

                <PricingPage
                    items={data.pricingItems}
                    milestones={data.milestones}
                    paymentSchedule={data.paymentSchedule}
                    revisions={data.revisions}
                    startCondition={data.startCondition}
                    feedbackDependency={data.feedbackDependency}
                    authorName={data.authorName}
                    authorContact={data.authorContact}
                    authorEmail={data.authorEmail}
                />

                <TermsPage
                    terms={data.terms}
                    authorName={data.authorName}
                    authorContact={data.authorContact}
                    authorEmail={data.authorEmail}
                />
            </div>
        </div>
    );
}

export default function PreviewPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <PreviewContent />
        </Suspense>
    );
}

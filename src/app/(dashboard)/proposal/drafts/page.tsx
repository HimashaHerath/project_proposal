"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Edit, Trash2, ScrollText, Plus } from "lucide-react";
import { proposalStore, StoredProposal } from "@/lib/store";
import { contractStore, StoredContract } from "@/lib/contractStore";
import { formatDistanceToNow } from "date-fns";

export default function DraftsPage() {
    const [proposalDrafts, setProposalDrafts] = useState<StoredProposal[]>([]);
    const [contractDrafts, setContractDrafts] = useState<StoredContract[]>([]);

    useEffect(() => {
        setProposalDrafts(proposalStore.getAll().filter((p) => p.status === "draft"));
        setContractDrafts(contractStore.getAll().filter((c) => c.status === "draft"));
    }, []);

    const handleDeleteProposal = (id: string) => {
        proposalStore.delete(id);
        setProposalDrafts(proposalStore.getAll().filter((p) => p.status === "draft"));
    };

    const handleDeleteContract = (id: string) => {
        contractStore.delete(id);
        setContractDrafts(contractStore.getAll().filter((c) => c.status === "draft"));
    };

    const isEmpty = proposalDrafts.length === 0 && contractDrafts.length === 0;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Drafts</h1>
                <p className="text-muted-foreground mt-1">
                    Continue working on your unfinished proposals and contracts.
                </p>
            </div>

            {isEmpty ? (
                <Card>
                    <CardContent className="h-[300px] flex flex-col items-center justify-center text-muted-foreground gap-4">
                        <FileText className="h-12 w-12 opacity-20" />
                        <p>No drafts found.</p>
                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href="/proposal/new"><Plus className="mr-2 h-4 w-4" /> New Proposal</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/contract/new"><Plus className="mr-2 h-4 w-4" /> New Contract</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* Proposal Drafts */}
                    {proposalDrafts.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" /> Proposal Drafts
                            </h2>
                            <div className="grid gap-4">
                                {proposalDrafts.map((draft) => (
                                    <Card key={draft.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="flex items-center justify-between p-6">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-lg">
                                                    {draft.projectName || "Untitled Proposal"}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {draft.clientName || "Unknown Client"} • Last updated{" "}
                                                    {formatDistanceToNow(new Date(draft.updatedAt), { addSuffix: true })}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/proposal/new?id=${draft.id}`}>
                                                        <Edit className="mr-2 h-4 w-4" /> Continue Editing
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDeleteProposal(draft.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contract Drafts */}
                    {contractDrafts.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <ScrollText className="h-4 w-4 text-muted-foreground" /> Contract Drafts
                            </h2>
                            <div className="grid gap-4">
                                {contractDrafts.map((draft) => (
                                    <Card key={draft.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="flex items-center justify-between p-6">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-lg">
                                                    {draft.clientName || "Untitled Contract"}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {draft.providerName} • Last updated{" "}
                                                    {formatDistanceToNow(new Date(draft.updatedAt), { addSuffix: true })}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/contract/new?id=${draft.id}`}>
                                                        <Edit className="mr-2 h-4 w-4" /> Continue Editing
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDeleteContract(draft.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

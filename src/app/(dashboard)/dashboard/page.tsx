"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, FileText, Clock, Edit, ScrollText } from "lucide-react";
import { proposalStore, StoredProposal } from "@/lib/store";
import { contractStore, StoredContract } from "@/lib/contractStore";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
    const [proposals, setProposals] = useState<StoredProposal[]>([]);
    const [contracts, setContracts] = useState<StoredContract[]>([]);
    const [stats, setStats] = useState({ totalProposals: 0, totalContracts: 0, drafts: 0 });

    useEffect(() => {
        const proposalData = proposalStore.getAll();
        const contractData = contractStore.getAll();
        setProposals(proposalData);
        setContracts(contractData);
        setStats({
            totalProposals: proposalData.length,
            totalContracts: contractData.length,
            drafts:
                proposalData.filter((p) => p.status === "draft").length +
                contractData.filter((c) => c.status === "draft").length,
        });
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage your proposals and contracts.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href="/contract/new">
                            <ScrollText className="mr-2 h-4 w-4" /> New Contract
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/proposal/new">
                            <Plus className="mr-2 h-4 w-4" /> New Proposal
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Proposals</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProposals}</div>
                        <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contracts</CardTitle>
                        <ScrollText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalContracts}</div>
                        <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Drafts</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.drafts}</div>
                        <p className="text-xs text-muted-foreground">In progress</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Proposals */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Proposals</h2>
                <Card>
                    <CardContent className="pt-6">
                        {proposals.length === 0 ? (
                            <div className="h-[120px] flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                                No proposals yet. Create one to get started.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {proposals.slice(0, 5).map((proposal) => (
                                    <div
                                        key={proposal.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium leading-none">{proposal.projectName || "Untitled Project"}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {proposal.clientName || "Unknown Client"} • {proposal.status === "draft" ? "Draft" : "Generated"} • Last updated {formatDistanceToNow(new Date(proposal.updatedAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/proposal/new?id=${proposal.id}`}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </Link>
                                            </Button>
                                            {proposal.status === "generated" && (
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/proposal/preview?id=${proposal.id}`}>
                                                        <FileText className="mr-2 h-4 w-4" /> View
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Contracts */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Contracts</h2>
                <Card>
                    <CardContent className="pt-6">
                        {contracts.length === 0 ? (
                            <div className="h-[120px] flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                                No contracts yet. Create one to get started.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {contracts.slice(0, 5).map((contract) => (
                                    <div
                                        key={contract.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium leading-none">{contract.clientName || "Untitled Contract"}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {contract.providerName} • {contract.status === "draft" ? "Draft" : "Generated"} • Last updated {formatDistanceToNow(new Date(contract.updatedAt), { addSuffix: true })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/contract/new?id=${contract.id}`}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </Link>
                                            </Button>
                                            {contract.status === "generated" && (
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/contract/preview?id=${contract.id}`}>
                                                        <ScrollText className="mr-2 h-4 w-4" /> View
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

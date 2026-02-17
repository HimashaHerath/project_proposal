"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, FileText, Clock, ChevronRight, Edit } from "lucide-react";
import { proposalStore, StoredProposal } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
    const [proposals, setProposals] = useState<StoredProposal[]>([]);
    const [stats, setStats] = useState({ total: 0, drafts: 0 });

    useEffect(() => {
        // Load proposals on mount
        const data = proposalStore.getAll();
        setProposals(data);
        setStats({
            total: data.length,
            drafts: data.filter((p) => p.status === "draft").length,
        });
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage your proposals and projects.</p>
                </div>
                <Button asChild>
                    <Link href="/proposal/new">
                        <Plus className="mr-2 h-4 w-4" /> New Proposal
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
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
                        <p className="text-xs text-muted-foreground">in progress</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Proposals</CardTitle>
                        <CardDescription>Your latest work.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {proposals.length === 0 ? (
                            <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                                No proposals found. Create one to get started.
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
        </div>
    );
}

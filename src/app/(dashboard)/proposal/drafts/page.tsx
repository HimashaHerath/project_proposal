"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Edit, Trash2 } from "lucide-react";
import { proposalStore, StoredProposal } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";

export default function DraftsPage() {
    const [drafts, setDrafts] = useState<StoredProposal[]>([]);

    useEffect(() => {
        // Load drafts on mount
        const data = proposalStore.getAll();
        setDrafts(data.filter((p) => p.status === "draft"));
    }, []);

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this draft?")) {
            proposalStore.delete(id);
            setDrafts(proposalStore.getAll().filter((p) => p.status === "draft"));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Drafts</h1>
                <p className="text-muted-foreground mt-1">
                    Continue working on your unfinished proposals.
                </p>
            </div>

            <div className="grid gap-4">
                {drafts.length === 0 ? (
                    <Card>
                        <CardContent className="h-[300px] flex flex-col items-center justify-center text-muted-foreground gap-4">
                            <FileText className="h-12 w-12 opacity-20" />
                            <p>No drafts found.</p>
                            <Button asChild variant="outline">
                                <Link href="/proposal/new">Create New Proposal</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    drafts.map((draft) => (
                        <Card key={draft.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-lg">
                                        {draft.projectName || "Untitled Proposal"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {draft.clientName || "Unknown Client"} • Last updated{" "}
                                        {formatDistanceToNow(new Date(draft.updatedAt), {
                                            addSuffix: true,
                                        })}
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
                                        onClick={() => handleDelete(draft.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

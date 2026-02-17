import { Suspense } from "react";
import { ProposalForm } from "@/components/proposal/ProposalForm";
import { Loader2 } from "lucide-react";

export default function NewProposalPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            }
        >
            <ProposalForm />
        </Suspense>
    );
}

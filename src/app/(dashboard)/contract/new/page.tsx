import { Suspense } from "react";
import { ContractForm } from "@/components/contract/ContractForm";
import { Loader2 } from "lucide-react";

export default function NewContractPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="animate-spin" /></div>}>
            <ContractForm />
        </Suspense>
    );
}

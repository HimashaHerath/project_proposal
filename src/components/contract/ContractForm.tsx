"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractSchema, ContractData, defaultContractValues } from "@/lib/contractSchema";
import { settingsStore } from "@/lib/settingsStore";
import { contractStore } from "@/lib/contractStore";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowRight, Save } from "lucide-react";
import { motion } from "framer-motion";

export const ContractForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contractId = searchParams.get("id");
    const [isLoading, setIsLoading] = useState(false);
    const [draftSaved, setDraftSaved] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ContractData>({
        resolver: zodResolver(contractSchema) as any,
        defaultValues: defaultContractValues,
    });

    useEffect(() => {
        if (contractId) {
            const stored = contractStore.getById(contractId);
            if (stored) {
                const { id, createdAt, updatedAt, status, ...data } = stored;
                reset(data);
            }
        } else {
            // Load Settings for Provider Defaults
            const settings = settingsStore.get();
            if (settings.authorName) setValue("providerName", settings.authorName);
            if (settings.brandName) setValue("brandName", settings.brandName);
            setValue("providerAddress", "123 Creative Studio Blvd, Design City");
        }
    }, [contractId, reset, setValue]);

    const onGenerate = (data: ContractData) => {
        setIsLoading(true);

        const settings = settingsStore.get();
        const finalData = {
            ...data,
            brandName: settings.brandName || "Agency Name",
        };

        const id = contractStore.save(finalData, contractId || undefined);
        contractStore.markAsGenerated(id);

        const payload = btoa(JSON.stringify(finalData));
        router.push(`/contract/preview?data=${payload}&id=${id}`);
        setIsLoading(false);
    };

    const onSaveDraft = (data: ContractData) => {
        const id = contractStore.save(data, contractId || undefined);
        if (!contractId) {
            router.replace(`/contract/new?id=${id}`);
        }
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 3000);
    };

    return (
        <form onSubmit={handleSubmit(onGenerate)} className="space-y-8 max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center border-b pb-6"
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{contractId ? "Edit Contract" : "New Contract"}</h1>
                    <p className="text-muted-foreground mt-1">Master Services Agreement (MSA)</p>
                </div>
                <div className="flex items-center gap-2">
                    {draftSaved && <p className="text-sm text-muted-foreground">Draft saved.</p>}
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Back</Button>
                    <Button variant="secondary" type="button" onClick={handleSubmit(onSaveDraft)}>
                        <Save className="mr-2 h-4 w-4" /> Save Draft
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                        Preview Contract
                    </Button>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Parties */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Parties</CardTitle>
                        <CardDescription>Who is entering into this agreement?</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Client</h3>
                            <div className="grid gap-2">
                                <Label>Client Name</Label>
                                <Input {...register("clientName")} placeholder="Acme Corp" />
                                {errors.clientName && <p className="text-destructive text-sm">{errors.clientName.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Address</Label>
                                <Input {...register("clientAddress")} placeholder="456 Client HQ" />
                                {errors.clientAddress && <p className="text-destructive text-sm">{errors.clientAddress.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold">Provider</h3>
                            <div className="grid gap-2">
                                <Label>Provider Name</Label>
                                <Input {...register("providerName")} />
                                {errors.providerName && <p className="text-destructive text-sm">{errors.providerName.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Address</Label>
                                <Input {...register("providerAddress")} />
                                {errors.providerAddress && <p className="text-destructive text-sm">{errors.providerAddress.message}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Scope & Fees */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Engagement Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label>Effective Date</Label>
                                <Input type="date" {...register("effectiveDate")} />
                                {errors.effectiveDate && <p className="text-destructive text-sm">{errors.effectiveDate.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Total Fee ($)</Label>
                                <Input type="number" {...register("totalFee", { valueAsNumber: true })} />
                                {errors.totalFee && <p className="text-destructive text-sm">{errors.totalFee.message}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Services Description (Scope)</Label>
                            <Textarea {...register("servicesDescription")} className="min-h-[100px]" />
                            {errors.servicesDescription && <p className="text-destructive text-sm">{errors.servicesDescription.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Payment Terms</Label>
                            <Input {...register("paymentTerms")} />
                            {errors.paymentTerms && <p className="text-destructive text-sm">{errors.paymentTerms.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Legal Clauses */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Legal Clauses</CardTitle>
                        <CardDescription>Standard clauses for protection. Edit as needed.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label>Confidentiality</Label>
                            <Textarea {...register("confidentialityClause")} className="min-h-[80px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Intellectual Property Rights</Label>
                            <Textarea {...register("ipRightsClause")} className="min-h-[80px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Termination</Label>
                            <Textarea {...register("terminationClause")} className="min-h-[80px]" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Governing Law</Label>
                            <Input {...register("governingLaw")} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
};

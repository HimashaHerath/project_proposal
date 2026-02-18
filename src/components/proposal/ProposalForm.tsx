"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler, Controller, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { proposalSchema, ProposalData } from "@/lib/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, ChevronRight, Loader2 } from "lucide-react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { proposalStore } from "@/lib/store";
import { settingsStore } from "@/lib/settingsStore";

export const ProposalForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const proposalId = searchParams.get("id");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ProposalData>({
        resolver: zodResolver(proposalSchema),
        defaultValues: {
            clientName: "",
            projectName: "",
            projectType: "Complete Web App Build",
            authorName: "", // Will be filled from settings
            authorRole: "",
            authorContact: "",
            authorEmail: "",
            version: "1.0",
            validUntil: "7 days",
            overview: "We will build a scalable, high-performance solution that aligns with your business goals...",
            successCriteria: "Success = Functional MVP shipped + 95+ Lighthouse Score",
            includedScope: ["Design System", "Frontend Development (Next.js)", "Backend API", "Deployment Setup"],
            excludedScope: ["Content Writing", "Logo Design", "Ongoing Maintenance"],
            assumptions: ["Client provides all copy/text", "Brand assets provided in SVG format"],
            pricingItems: [{ description: "Development Sprint", price: 5000 }],
            paymentSchedule: "50% kickoff / 50% pre-launch",
            revisions: "2 rounds per milestone",
            milestones: [{ phase: "Phase 1: Design", duration: "1 week" }],
            startCondition: "Timeline starts after contract + deposit + onboarding",
            feedbackDependency: "Delays in feedback extend timeline",
            terms: [
                "Payment Structure: 50/50 split.",
                "Revisions: 2 rounds included per phase.",
                "IP Transfer: You own the code upon final payment.",
                "Third-Party Costs: Hosting/domains are client responsibility.",
            ],
        },
    });

    const [brandLine, setBrandLine] = useState("Proposals • Commercial-Proof");
    const [draftSaved, setDraftSaved] = useState(false);

    useEffect(() => {
        if (proposalId) {
            const stored = proposalStore.getById(proposalId);
            if (stored) {
                // Reset form with stored data (omitting internal store fields)
                const { id, createdAt, updatedAt, status, ...data } = stored;
                reset(data);
            }
        } else {
            // Load settings defaults for new proposals
            const settings = settingsStore.get();
            setValue("authorName", settings.authorName);
            setValue("authorRole", settings.authorRole);
            setValue("authorContact", settings.authorContact);
            setValue("authorEmail", settings.authorEmail);

            if (settings.brandName && settings.brandDescription) {
                setBrandLine(`${settings.brandName} • ${settings.brandDescription}`);
            }
        }
    }, [proposalId, reset, setValue]);

    const { fields: includedScopeFields, append: appendIncluded, remove: removeIncluded } =
        useFieldArray({ control, name: "includedScope" as any });

    const { fields: excludedScopeFields, append: appendExcluded, remove: removeExcluded } =
        useFieldArray({ control, name: "excludedScope" as any });

    const { fields: assumptionsFields, append: appendAssumption, remove: removeAssumption } =
        useFieldArray({ control, name: "assumptions" as any });

    const { fields: pricingFields, append: appendPricing, remove: removePricing } =
        useFieldArray({ control, name: "pricingItems" });

    const { fields: milestoneFields, append: appendMilestone, remove: removeMilestone } =
        useFieldArray({ control, name: "milestones" });

    const { fields: termsFields, append: appendTerm, remove: removeTerm } =
        useFieldArray({ control, name: "terms" as any });

    const onGenerate = (data: ProposalData) => {
        setIsLoading(true);

        // Inject current settings branding if not present (or always overwrite? let's overwrite to ensure latest brand)
        const settings = settingsStore.get();
        const finalData = {
            ...data,
            brandName: settings.brandName || "Agency Name",
            brandDescription: settings.brandDescription || "Project Proposal"
        };

        // Save to store first
        const id = proposalStore.save(finalData, proposalId || undefined);
        proposalStore.markAsGenerated(id);

        // Encode data for preview
        const payload = btoa(JSON.stringify(finalData));
        router.push(`/proposal/preview?data=${payload}&id=${id}`);
        setIsLoading(false);
    };

    const onSaveDraft = (data: ProposalData) => {
        const id = proposalStore.save(data, proposalId || undefined);
        if (!proposalId) {
            // Replace URL if new draft
            router.replace(`/proposal/new?id=${id}`);
        }
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 3000);
    };

    return (
        <form onSubmit={handleSubmit(onGenerate)} className="space-y-8 max-w-5xl mx-auto py-12 px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center border-b pb-6"
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{proposalId ? "Edit Proposal" : "New Proposal"}</h1>
                    <p className="text-muted-foreground mt-1">{brandLine}</p>
                </div>
                <div className="flex items-center gap-2">
                    {draftSaved && <p className="text-sm text-muted-foreground">Draft saved.</p>}
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Back</Button>
                    <Button variant="secondary" type="button" onClick={handleSubmit(onSaveDraft)}>Save Draft</Button>
                </div>
            </motion.div>

            {/* Basic Info */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>Client and author information for the cover page.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <FormInput label="Client Name" {...register("clientName")} error={errors.clientName?.message} />
                        <FormInput label="Project Name" {...register("projectName")} error={errors.projectName?.message} />
                        <FormInput label="Project Type" {...register("projectType")} error={errors.projectType?.message} />

                        {/* Author Defaults */}
                        <FormInput label="Prepared By" {...register("authorName")} error={errors.authorName?.message} />
                        <FormInput label="Role / Title" {...register("authorRole")} error={errors.authorRole?.message} />
                        <FormInput label="Contact" {...register("authorContact")} error={errors.authorContact?.message} />
                        <FormInput label="Email" {...register("authorEmail")} type="email" error={errors.authorEmail?.message} />

                        {/* Meta */}
                        <FormInput label="Version" {...register("version")} />
                        <FormInput label="Valid Until" {...register("validUntil")} />
                    </CardContent>
                </Card>
            </motion.section>

            {/* Scope */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Scope & Brief</CardTitle>
                        <CardDescription>Define the project overview, deliverables, and exclusions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Project Overview</Label>
                            <Textarea
                                {...register("overview")}
                                className="min-h-[100px]"
                                placeholder="High level goal..."
                            />
                            {errors.overview && <p className="text-destructive text-xs">{errors.overview.message}</p>}
                        </div>

                        <FormInput label="Success Criteria (One-Liner)" {...register("successCriteria")} placeholder="e.g. Success = site shipped + analytics installed" />

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Included */}
                            <div className="space-y-4">
                                <Label>Deliverables (Included)</Label>
                                {includedScopeFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <ShadcnInput
                                            {...register(`includedScope.${index}` as const)}
                                            className="flex-1"
                                        />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeIncluded(index)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendIncluded("New Item")}
                                    className="w-full border-dashed"
                                >
                                    <Plus size={14} className="mr-2" /> Add Deliverable
                                </Button>
                            </div>

                            {/* Excluded */}
                            <div className="space-y-4">
                                <Label className="text-muted-foreground">Out of Scope (Excluded)</Label>
                                {excludedScopeFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <ShadcnInput
                                            {...register(`excludedScope.${index}` as const)}
                                            className="flex-1"
                                        />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeExcluded(index)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendExcluded("New Item")}
                                    className="w-full border-dashed"
                                >
                                    <Plus size={14} className="mr-2" /> Add Exclusion
                                </Button>
                            </div>
                        </div>

                        {/* Assumptions */}
                        <div className="space-y-4">
                            <Label>Client Assumptions</Label>
                            {assumptionsFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <ShadcnInput
                                        {...register(`assumptions.${index}` as const)}
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeAssumption(index)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendAssumption("New Assumption")}
                                className="w-full border-dashed"
                            >
                                <Plus size={14} className="mr-2" /> Add Assumption
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Pricing */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Commercials</CardTitle>
                        <CardDescription>Define pricing items and payment terms.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            {pricingFields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <Label className="mb-2 block text-xs text-muted-foreground">Description</Label>
                                        <ShadcnInput {...register(`pricingItems.${index}.description`)} />
                                    </div>
                                    <div className="w-32">
                                        <Label className="mb-2 block text-xs text-muted-foreground">Price ($)</Label>
                                        <ShadcnInput type="number" {...register(`pricingItems.${index}.price`, { valueAsNumber: true })} />
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removePricing(index)} className="mt-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendPricing({ description: "", price: 0 })}
                                className="w-full border-dashed"
                            >
                                <Plus size={16} className="mr-2" /> Add Pricing Item
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                            <FormInput label="Payment Schedule" {...register("paymentSchedule")} />
                            <FormInput label="Revisions Included" {...register("revisions")} />
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Timeline */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Timeline</CardTitle>
                        <CardDescription>Project milestones and dependencies.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            {milestoneFields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <Label className="mb-2 block text-xs text-muted-foreground">Phase</Label>
                                        <ShadcnInput {...register(`milestones.${index}.phase`)} />
                                    </div>
                                    <div className="w-32">
                                        <Label className="mb-2 block text-xs text-muted-foreground">Duration</Label>
                                        <ShadcnInput {...register(`milestones.${index}.duration`)} />
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeMilestone(index)} className="mt-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendMilestone({ phase: "", duration: "" })}
                                className="w-full border-dashed"
                            >
                                <Plus size={16} className="mr-2" /> Add Milestone
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-1 gap-6 pt-4 border-t">
                            <FormInput label="Start Condition" {...register("startCondition")} />
                            <FormInput label="Feedback Dependency" {...register("feedbackDependency")} />
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Terms */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Terms (Commercial)</CardTitle>
                        <CardDescription>Key terms included in the proposal.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {termsFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <Textarea
                                    {...register(`terms.${index}` as const)}
                                    className="flex-1 min-h-[60px]"
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeTerm(index)} className="text-destructive hover:text-destructive hover:bg-destructive/10 self-start">
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendTerm("New term")}
                            className="w-full border-dashed"
                        >
                            <Plus size={16} className="mr-2" /> Add Term
                        </Button>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="sticky bottom-4 bg-background/80 backdrop-blur-md p-4 border rounded-xl shadow-lg flex justify-end gap-4"
            >
                <Button type="submit" size="lg" className="font-semibold" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save size={18} className="mr-2" />}
                    Generate Proposal
                </Button>
            </motion.div>
        </form>
    );
};

// Helper Input Component using Shadcn
const FormInput = React.forwardRef<HTMLInputElement, any>(({ label, error, ...props }, ref) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <ShadcnInput
            ref={ref}
            className={error ? "border-destructive focus-visible:ring-destructive" : ""}
            {...props}
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
));
FormInput.displayName = "FormInput";

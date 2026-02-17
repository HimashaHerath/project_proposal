import { z } from "zod";

export const proposalSchema = z.object({
    clientName: z.string().min(1, "Client Name is required"),
    projectName: z.string().min(1, "Project Name is required"),
    projectType: z.string().min(1, "Project Type is required"),
    authorName: z.string().min(1, "Author Name is required"),
    authorRole: z.string().min(1, "Author Role is required"),
    authorContact: z.string().min(1, "Contact is required"),
    authorEmail: z.string().email("Invalid email"),

    // Brand Details
    brandName: z.string().optional(),
    brandDescription: z.string().optional(),

    // Cover Details
    version: z.string(),
    validUntil: z.string(),

    // Brief / Scope
    overview: z.string().min(10, "Overview must be at least 10 characters"),
    successCriteria: z.string(),
    includedScope: z.array(z.string().min(1, "Item cannot be empty")),
    excludedScope: z.array(z.string().min(1, "Item cannot be empty")),
    assumptions: z.array(z.string().min(1, "Item cannot be empty")),

    // Pricing & Timeline
    pricingItems: z.array(z.object({
        description: z.string().min(1, "Description required"),
        price: z.number().min(0, "Price must be positive"),
    })).min(1, "Add at least one pricing item"),
    paymentSchedule: z.string(),
    revisions: z.string(),

    milestones: z.array(z.object({
        phase: z.string().min(1, "Phase name required"),
        duration: z.string().min(1, "Duration required"),
    })).min(1, "Add at least one milestone"),
    startCondition: z.string(),
    feedbackDependency: z.string(),

    terms: z.array(z.string().min(1, "Term cannot be empty")).min(1, "Add at least one term"),
});

export type ProposalData = z.infer<typeof proposalSchema>;

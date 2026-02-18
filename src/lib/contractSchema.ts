import { z } from "zod";

export const contractSchema = z.object({
    // Parties
    clientName: z.string().min(1, "Client Name is required"),
    clientAddress: z.string().min(1, "Client Address is required"),
    providerName: z.string().min(1, "Provider Name is required"), // Defaults from Settings
    providerAddress: z.string().min(1, "Provider Address is required"),

    // Engagement Details
    effectiveDate: z.string().min(1, "Effective Date is required"),
    servicesDescription: z.string().min(10, "Description must be detailed"), // Can link to a Proposal ID in future

    // Financials
    totalFee: z.number().min(0, "Fee must be positive"),
    paymentTerms: z.string().default("50% Upfront, 50% Upon Completion"),

    // Clauses (Defaults provided in Form)
    confidentialityClause: z.string(),
    ipRightsClause: z.string(),
    terminationClause: z.string(),
    governingLaw: z.string().default("State of California"),

    // Branding (Auto-injected)
    brandName: z.string().optional(),
});

export type ContractData = z.infer<typeof contractSchema>;

export const defaultContractValues: ContractData = {
    clientName: "",
    clientAddress: "",
    providerName: "",
    providerAddress: "",
    effectiveDate: new Date().toISOString().split('T')[0],
    servicesDescription: "Design and development of [Project Name] as outlined in the attached Proposal.",
    totalFee: 0,
    paymentTerms: "50% non-refundable deposit due upon signing. Remaining 50% due prior to final file delivery.",
    confidentialityClause: "Both parties agree to treat all non-public information received from the other party as confidential and will not disclose it to any third party without prior written consent.",
    ipRightsClause: "Upon full payment of all fees, Provider assigns to Client all right, title, and interest in the Final Deliverables. Provider retains background technology and portfolio rights.",
    terminationClause: "Either party may terminate this Agreement with 14 days written notice. Client shall pay for all services performed up to the termination date.",
    governingLaw: "State of California",
    brandName: "",
};

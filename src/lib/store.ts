"use client";

import { ProposalData } from "./schema";

export interface StoredProposal extends ProposalData {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "generated";
}

const STORAGE_KEY = "infrasurge_proposals";

export const proposalStore = {
    getAll: (): StoredProposal[] => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to load proposals", e);
            return [];
        }
    },

    getById: (id: string): StoredProposal | undefined => {
        const proposals = proposalStore.getAll();
        return proposals.find((p) => p.id === id);
    },

    save: (data: ProposalData, id?: string): string => {
        const proposals = proposalStore.getAll();
        const now = new Date().toISOString();

        let proposal: StoredProposal;

        if (id) {
            // Update existing
            const index = proposals.findIndex((p) => p.id === id);
            if (index >= 0) {
                proposal = { ...proposals[index], ...data, updatedAt: now };
                proposals[index] = proposal;
            } else {
                // Fallback if ID not found (shouldn't happen)
                proposal = { ...data, id, createdAt: now, updatedAt: now, status: "draft" };
                proposals.push(proposal);
            }
        } else {
            // Create new
            const newId = crypto.randomUUID();
            proposal = { ...data, id: newId, createdAt: now, updatedAt: now, status: "draft" };
            proposals.unshift(proposal); // Add to top
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
        return proposal.id;
    },

    delete: (id: string) => {
        const proposals = proposalStore.getAll().filter((p) => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
    },

    markAsGenerated: (id: string) => {
        const proposals = proposalStore.getAll();
        const index = proposals.findIndex((p) => p.id === id);
        if (index >= 0) {
            proposals[index] = { ...proposals[index], status: "generated", updatedAt: new Date().toISOString() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
        }
    }
};

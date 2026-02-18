"use client";

import { ContractData } from "./contractSchema";

export interface StoredContract extends ContractData {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "generated";
}

const STORAGE_KEY = "infrasurge_contracts";

export const contractStore = {
    getAll: (): StoredContract[] => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to load contracts", e);
            return [];
        }
    },

    getById: (id: string): StoredContract | undefined => {
        const contracts = contractStore.getAll();
        return contracts.find((c) => c.id === id);
    },

    save: (data: ContractData, id?: string): string => {
        const contracts = contractStore.getAll();
        const now = new Date().toISOString();

        let contract: StoredContract;

        if (id) {
            const index = contracts.findIndex((c) => c.id === id);
            if (index >= 0) {
                contract = { ...contracts[index], ...data, updatedAt: now };
                contracts[index] = contract;
            } else {
                contract = { ...data, id, createdAt: now, updatedAt: now, status: "draft" };
                contracts.push(contract);
            }
        } else {
            const newId = crypto.randomUUID();
            contract = { ...data, id: newId, createdAt: now, updatedAt: now, status: "draft" };
            contracts.unshift(contract);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
        return contract.id;
    },

    delete: (id: string) => {
        const contracts = contractStore.getAll().filter((c) => c.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
    },

    markAsGenerated: (id: string) => {
        const contracts = contractStore.getAll();
        const index = contracts.findIndex((c) => c.id === id);
        if (index >= 0) {
            contracts[index] = { ...contracts[index], status: "generated", updatedAt: new Date().toISOString() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
        }
    },
};

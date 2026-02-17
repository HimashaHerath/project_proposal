"use client";

export interface SettingsData {
    authorName: string;
    authorRole: string;
    authorContact: string;
    authorEmail: string;
    brandName: string;
    brandDescription?: string;
}

const SETTINGS_KEY = "infrasurge_settings";

export const defaultSettings: SettingsData = {
    authorName: "John Doe",
    authorRole: "Freelance Developer",
    authorContact: "contact@example.com",
    authorEmail: "john@example.com",
    brandName: "Agency Name",
    brandDescription: "Digital Solutions",
};

export const settingsStore = {
    get: (): SettingsData => {
        if (typeof window === "undefined") return defaultSettings;
        try {
            const stored = localStorage.getItem(SETTINGS_KEY);
            return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
        } catch (e) {
            console.error("Failed to load settings", e);
            return defaultSettings;
        }
    },

    save: (data: SettingsData) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
    },
};

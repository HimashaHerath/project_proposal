"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { settingsStore, SettingsData } from "@/lib/settingsStore";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";

const settingsSchema = z.object({
    authorName: z.string().min(1, "Name is required"),
    authorRole: z.string().min(1, "Role is required"),
    authorContact: z.string().min(1, "Contact is required"),
    authorEmail: z.string().email("Invalid email"),
    brandName: z.string().min(1, "Brand Name is required"),
    brandDescription: z.string().optional(),
});

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SettingsData>({
        resolver: zodResolver(settingsSchema),
    });

    useEffect(() => {
        const data = settingsStore.get();
        setValue("authorName", data.authorName);
        setValue("authorRole", data.authorRole);
        setValue("authorContact", data.authorContact);
        setValue("authorEmail", data.authorEmail);
        setValue("brandName", data.brandName);
        setValue("brandDescription", data.brandDescription);
    }, [setValue]);

    const onSubmit = (data: SettingsData) => {
        setIsLoading(true);
        // Simulate a small delay for better UX
        setTimeout(() => {
            settingsStore.save(data);
            setIsLoading(false);
            alert("Settings saved!");
        }, 500);
    };

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your default preferences for new proposals.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Brand Identity</CardTitle>
                        <CardDescription>
                            Customize the branding that appears on your proposals and dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="brandName">Brand Name</Label>
                            <Input id="brandName" {...register("brandName")} placeholder="e.g. Acme Corp" />
                            {errors.brandName && <p className="text-destructive text-sm">{errors.brandName.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="brandDescription">Brand Tagline</Label>
                            <Input id="brandDescription" {...register("brandDescription")} placeholder="e.g. Premium Solutions" />
                            {errors.brandDescription && <p className="text-destructive text-sm">{errors.brandDescription.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Author Profile</CardTitle>
                        <CardDescription>
                            These details will be automatically pre-filled when you create a new proposal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="authorName">Full Name</Label>
                            <Input id="authorName" {...register("authorName")} placeholder="e.g. John Doe" />
                            {errors.authorName && <p className="text-destructive text-sm">{errors.authorName.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="authorRole">Role / Title</Label>
                            <Input id="authorRole" {...register("authorRole")} placeholder="e.g. Lead Developer" />
                            {errors.authorRole && <p className="text-destructive text-sm">{errors.authorRole.message}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="authorEmail">Email Address</Label>
                                <Input id="authorEmail" type="email" {...register("authorEmail")} placeholder="john@example.com" />
                                {errors.authorEmail && <p className="text-destructive text-sm">{errors.authorEmail.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="authorContact">Contact Info (Phone/Link)</Label>
                                <Input id="authorContact" {...register("authorContact")} placeholder="+1 (555) 000-0000" />
                                {errors.authorContact && <p className="text-destructive text-sm">{errors.authorContact.message}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}

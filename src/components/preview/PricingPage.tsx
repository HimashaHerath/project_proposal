import React from "react";
import { A4Page } from "./A4Page";

interface PricingItem {
    description: string;
    price: number;
}

interface Milestone {
    phase: string;
    duration: string;
}

interface PricingPageProps {
    items?: PricingItem[];
    milestones?: Milestone[];
    paymentSchedule?: string;
    revisions?: string;
    startCondition?: string;
    feedbackDependency?: string;
    authorName?: string;
    authorContact?: string;
    authorEmail?: string;
}

export const PricingPage: React.FC<PricingPageProps> = ({
    items = [
        { description: "Item 1", price: 2000 },
        { description: "Item 2", price: 3500 },
    ],
    milestones = [
        { phase: "UX Research", duration: "X days" },
        { phase: "Wireframing", duration: "XX days" },
        { phase: "High Fidelity Design", duration: "XX days" },
    ],
    paymentSchedule = "50% kickoff / 50% pre-launch",
    revisions = "2 rounds per milestone",
    startCondition = "Timeline starts after contract + deposit + onboarding",
    feedbackDependency = "Delays in feedback extend timeline",
    authorName = "Provider Name",
    authorContact = "+1 (555) 000-0000",
    authorEmail = "hello@example.com",
}) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <A4Page className="p-16 flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex justify-between items-baseline border-b-4 border-black pb-4 mb-16">
                    <h2 className="text-4xl font-bold">Pricing & Deadline</h2>
                    <span className="text-xl font-medium text-gray-500">02</span>
                </div>

                {/* Fees Section */}
                <div className="grid grid-cols-12 gap-8 mb-16">
                    <div className="col-span-3">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                            Investment
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <p className="mb-8 text-gray-800">
                            Commercial breakdown of the deliverables.
                        </p>

                        <div className="space-y-4 border-t-2 border-black pt-4 mb-4">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <span>{item.description}</span>
                                    <span className="font-mono">$ {item.price.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between font-bold text-xl border-t-2 border-black pt-4 mb-8">
                            <span>Grand Total</span>
                            <span>$ {total.toLocaleString()}</span>
                        </div>

                        {/* Price-Stop Lines */}
                        <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-md">
                            <div>
                                <p className="font-bold text-gray-500 uppercase text-xs mb-1">Payment Schedule</p>
                                <p className="font-medium">{paymentSchedule}</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-500 uppercase text-xs mb-1">Revisions Included</p>
                                <p className="font-medium">{revisions}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deadline Section */}
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                            Timeline
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <div className="space-y-4 border-t-2 border-black pt-4 mb-8">
                            {milestones.map((milestone, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <span>{milestone.phase}</span>
                                    <span className="font-mono">{milestone.duration}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm text-gray-500 italic border-l-2 border-gray-300 pl-4">
                            <p>• {startCondition}</p>
                            <p>• {feedbackDependency}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t-4 border-black pt-4 flex justify-between text-xs text-gray-500">
                <div>
                    <p className="font-bold text-black mb-1">Prepared By</p>
                    <p>{authorName}</p>
                </div>
                <div>
                    <p className="font-bold text-black mb-1">Contact</p>
                    <p>{authorContact}</p>
                </div>
                <div>
                    <p className="font-bold text-black mb-1">Email</p>
                    <p>{authorEmail}</p>
                </div>
            </div>
        </A4Page>
    );
};

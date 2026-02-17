import React from "react";
import { A4Page } from "./A4Page";

interface ProjectBriefPageProps {
    overview?: string;
    successCriteria?: string;
    includedScope?: string[];
    excludedScope?: string[];
    assumptions?: string[];
    authorName?: string;
    authorContact?: string;
    authorEmail?: string;
}

export const ProjectBriefPage: React.FC<ProjectBriefPageProps> = ({
    overview = "I will transform the company's vision into engaging mobile app that makes your customers fall in love with your company.",
    successCriteria = "Success = site shipped + analytics installed + conversion-ready structure",
    includedScope = [
        "High-fidelity UI design for Mobile App",
        "Interactive Prototypes",
        "Design System & Style Guide",
        "Developer Handoff via Figma",
    ],
    excludedScope = [
        "Logo Design / Branding",
        "Copywriting",
        "Coding / Development",
    ],
    assumptions = [
        "Client will provide all brand assets (logo, fonts, colors).",
        "Weekly feedback loops will be maintained.",
        "Text content will be provided before design starts.",
    ],
    authorName = "Provider Name",
    authorContact = "+1 (555) 000-0000",
    authorEmail = "hello@example.com",
}) => {
    return (
        <A4Page className="p-16 flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex justify-between items-baseline border-b-4 border-black pb-4 mb-12">
                    <h2 className="text-4xl font-bold">Project Scope</h2>
                    <span className="text-xl font-medium text-gray-500">01</span>
                </div>

                {/* Overview Section */}
                <div className="grid grid-cols-12 gap-8 mb-12">
                    <div className="col-span-3">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                            Overview
                        </h3>
                    </div>
                    <div className="col-span-9 space-y-4">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {overview}
                        </p>
                        {successCriteria && (
                            <div className="flex items-center gap-2 p-3 bg-gray-50 border-l-2 border-black rounded-r-md">
                                <span className="text-sm font-bold">🎯 Goal:</span>
                                <p className="text-sm font-medium text-gray-700">{successCriteria}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scope Section */}
                <div className="grid grid-cols-12 gap-8 mb-12">
                    <div className="col-span-3">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                            Deliverables
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <p className="mb-4 text-sm font-medium text-gray-500">What is included in this commercial offer:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-800">
                            {includedScope.map((point, idx) => (
                                <li key={idx} className="pl-2">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Out of Scope Section */}
                <div className="grid grid-cols-12 gap-8 mb-12">
                    <div className="col-span-3">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400">
                            Out of Scope
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <ul className="list-disc pl-5 space-y-2 text-gray-500">
                            {excludedScope.map((point, idx) => (
                                <li key={idx} className="pl-2">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Assumptions */}
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                            Assumptions
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                            {assumptions.map((point, idx) => (
                                <li key={idx} className="pl-2">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <Footer name={authorName} contact={authorContact} email={authorEmail} />
        </A4Page>
    );
};

const Footer = ({ name, contact, email }: { name?: string, contact?: string, email?: string }) => (
    <div className="border-t-4 border-black pt-4 flex justify-between text-xs text-gray-500 mt-8">
        <div>
            <p className="font-bold text-black mb-1">Prepared By</p>
            <p>{name}</p>
        </div>
        <div>
            <p className="font-bold text-black mb-1">Contact</p>
            <p>{contact}</p>
        </div>
        <div>
            <p className="font-bold text-black mb-1">Email</p>
            <p>{email}</p>
        </div>
    </div>
)

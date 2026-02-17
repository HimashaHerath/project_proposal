import React from "react";
import { A4Page } from "./A4Page";

interface CoverPageProps {
    clientName?: string;
    projectName?: string;
    projectType?: string;
    authorName?: string;
    authorRole?: string;
    date?: string;
    brandName?: string;
    brandDescription?: string;
}

export const CoverPage: React.FC<CoverPageProps> = ({
    clientName = "Client Name",
    projectName = "Project Name",
    projectType = "Project type",
    authorName = "John Doe",
    authorRole = "Freelance Developer",
    date = new Date().toISOString().split('T')[0],
    brandName = "Agency Name",
    brandDescription = "Digital Solutions",
}) => {
    return (
        <A4Page className="flex flex-col justify-between p-16 relative bg-white">
            {/* Top Section */}
            <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-tight text-black mb-2">{brandName}.</h1>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">{brandDescription}</span>
                </div>
                <span className="text-xl font-medium text-gray-500">00</span>
            </div>

            {/* Middle Section - Title */}
            <div className="z-10 mt-20">
                <h2 className="text-6xl font-bold text-black mb-6 leading-tight">
                    {projectName}
                </h2>
                <p className="text-2xl text-gray-500 font-light">{projectType}</p>
            </div>

            {/* Bottom Section - Details */}
            <div className="mt-auto z-10 grid grid-cols-2 gap-12 border-t-2 border-black pt-8">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Prepared For</p>
                    <p className="text-lg font-medium">{clientName}</p>
                </div>

                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Prepared By</p>
                    <p className="text-lg font-medium">{authorName}</p>
                    <p className="text-sm text-gray-500">{authorRole}</p>
                </div>

                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date & Version</p>
                    <p className="text-sm">{date} • v1.0</p>
                </div>

                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Valid Until</p>
                    <p className="text-sm">7 days from date</p>
                </div>
            </div>

            {/* Ethereal Gradient Orb - Subtle */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-blue-100 via-purple-100 to-transparent blur-[80px] opacity-50 pointer-events-none" />
        </A4Page>
    );
};

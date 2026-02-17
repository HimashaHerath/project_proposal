import React from "react";
import { A4Page } from "./A4Page";

interface TermsPageProps {
    terms?: string[];
    authorName?: string;
    authorContact?: string;
    authorEmail?: string;
}

export const TermsPage: React.FC<TermsPageProps> = ({
    terms = [
        "Payment structure: As defined in the Pricing section (e.g. 50/50).",
        "Revisions: 2 rounds of revisions per milestone are included. Additional revisions charged hourly.",
        "Change Requests: Any work outside the defined scope will be estimated separately as a Change Order.",
        "Third-Party Costs: Fonts, stock assets, plugins, and hosting are client costs.",
        "IP Transfer: Upon full payment, all final design/code rights transfer to the client.",
        "Cancellation: If cancelled, client pays for all work completed up to that date.",
        "Confidentiality: Both parties agree to keep all project data confidential."
    ],
    authorName = "Provider Name",
    authorContact = "+1 (555) 000-0000",
    authorEmail = "hello@example.com",
}) => {
    return (
        <A4Page className="p-16 flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex justify-between items-baseline border-b-4 border-black pb-4 mb-16">
                    <h2 className="text-4xl font-bold">T&C</h2>
                    <span className="text-xl font-medium text-gray-500">03</span>
                </div>

                {/* Terms Section */}
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 leading-relaxed">
                            Standard<br /> Terms
                        </h3>
                    </div>
                    <div className="col-span-9">
                        <ul className="list-disc pl-5 space-y-6 text-gray-800 text-sm leading-relaxed">
                            {terms.map((term, idx) => (
                                <li key={idx} className="pl-2">
                                    <span className="font-medium text-black mr-1">{term.split(':')[0]}:</span>
                                    {term.split(':')[1] || ""} {term.split(':').slice(2).join(':')}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-12 text-xs text-gray-400 italic">
                            * Note: Comprehensive legal terms regarding liability, warranties, and dispute resolution will be provided in the final contract.
                        </p>
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

import React from "react";
import { A4Page } from "@/components/preview/A4Page";
import { ContractData } from "@/lib/contractSchema";
import { CoverPage } from "@/components/preview/CoverPage";

interface ContractPreviewProps {
    data: ContractData;
}

export const ContractPreview: React.FC<ContractPreviewProps> = ({ data }) => {
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-8 print:space-y-0">
            {/* Page 1: Cover Page */}
            <CoverPage
                clientName={data.clientName}
                projectName="Contract Agreement"
                projectType="Master Services Agreement"
                authorName={data.providerName}
                authorRole="Service Provider"
                date={data.effectiveDate}
                brandName={data.brandName}
                brandDescription="Legal Binding Document"
            />

            {/* Page 2: Contract Content */}
            <A4Page className="p-16 flex flex-col justify-between text-sm leading-relaxed text-gray-800">
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-baseline border-b-4 border-black pb-4 mb-12">
                        <div>
                            <h2 className="text-4xl font-bold">Agreement Terms</h2>
                            <p className="text-gray-500 mt-1 text-xs">Page 1 of 1</p>
                        </div>
                        <span className="text-xl font-medium text-gray-500">01</span>
                    </div>

                    {/* Parties */}
                    <div className="mb-8">
                        <h3 className="font-bold uppercase tracking-widest text-gray-500 text-xs mb-4">1. Parties</h3>
                        <p>
                            This Master Services Agreement ("Agreement") is entered into by and between <strong>{data.providerName}</strong> ("Provider"), located at {data.providerAddress}, and <strong>{data.clientName}</strong> ("Client"), located at {data.clientAddress}, collectively referred to as the "Parties".
                        </p>
                    </div>

                    {/* Services & Fees */}
                    <div className="mb-8">
                        <h3 className="font-bold uppercase tracking-widest text-gray-500 text-xs mb-4">2. Services & Fees</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <span className="font-bold">Scope of Services:</span>
                                <p className="mt-1 whitespace-pre-wrap text-gray-600">{data.servicesDescription}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 mt-2 bg-gray-50 p-4 rounded text-xs">
                                <div>
                                    <span className="font-bold uppercase text-gray-400">Total Fee</span>
                                    <p className="font-mono text-lg">${data.totalFee.toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className="font-bold uppercase text-gray-400">Payment Terms</span>
                                    <p>{data.paymentTerms}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legal Clauses */}
                    <div className="mb-8">
                        <h3 className="font-bold uppercase tracking-widest text-gray-500 text-xs mb-4">3. Legal Provisions</h3>
                        <div className="space-y-3 text-xs text-gray-600">
                            <p><span className="font-bold text-black">Confidentiality:</span> {data.confidentialityClause}</p>
                            <p><span className="font-bold text-black">Intellectual Property:</span> {data.ipRightsClause}</p>
                            <p><span className="font-bold text-black">Termination:</span> {data.terminationClause}</p>
                            <p><span className="font-bold text-black">Governing Law:</span> This Agreement shall be governed by the laws of {data.governingLaw}.</p>
                        </div>
                    </div>
                </div>

                {/* Signatures */}
                <div className="mt-4 border-t-2 border-dashed border-gray-300 pt-8">
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <p className="font-bold mb-8">{data.clientName}</p>
                            <div className="border-b border-black pt-8 mb-2"></div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Authorized Signature</p>
                        </div>
                        <div>
                            <p className="font-bold mb-8">{data.providerName}</p>
                            <div className="border-b border-black pt-8 mb-2"></div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Authorized Signature</p>
                        </div>
                    </div>
                </div>
            </A4Page>
        </div>
    );
};

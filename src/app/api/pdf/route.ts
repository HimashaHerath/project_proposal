import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { proposalSchema } from "@/lib/schema";
import { contractSchema } from "@/lib/contractSchema";
import { ProposalDocument } from "@/lib/pdf/proposal-template";
import { ContractDocument } from "@/lib/pdf/contract-template";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isContract = body.type === "contract";

    if (isContract) {
      const { type, ...contractBody } = body;
      const result = contractSchema.safeParse(contractBody);

      if (!result.success) {
        return NextResponse.json(
          { error: "Invalid contract data", details: result.error.flatten() },
          { status: 400 }
        );
      }

      const data = result.data;
      const buffer = await renderToBuffer(ContractDocument({ data }));

      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${data.clientName.replace(/[^a-zA-Z0-9-_]/g, "_")}_Contract.pdf"`,
        },
      });
    } else {
      const { type, ...proposalBody } = body;
      const result = proposalSchema.safeParse(proposalBody);

      if (!result.success) {
        return NextResponse.json(
          { error: "Invalid proposal data", details: result.error.flatten() },
          { status: 400 }
        );
      }

      const data = result.data;
      const buffer = await renderToBuffer(ProposalDocument({ data }));

      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${data.projectName.replace(/[^a-zA-Z0-9-_]/g, "_")}_Proposal.pdf"`,
        },
      });
    }
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

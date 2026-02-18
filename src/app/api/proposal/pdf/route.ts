import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { proposalSchema } from "@/lib/schema";
import { ProposalDocument } from "@/lib/pdf/proposal-template";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = proposalSchema.safeParse(body);

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
  } catch (error) {
    console.error("Proposal PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate proposal PDF" },
      { status: 500 }
    );
  }
}

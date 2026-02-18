import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { contractSchema } from "@/lib/contractSchema";
import { ContractDocument } from "@/lib/pdf/contract-template";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contractSchema.safeParse(body);

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
  } catch (error) {
    console.error("Contract PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate contract PDF" },
      { status: 500 }
    );
  }
}

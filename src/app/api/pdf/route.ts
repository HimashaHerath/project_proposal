import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const payload = btoa(JSON.stringify(data));

        // Basic validation/logging if needed
        console.log(`Generating PDF for project: ${data.projectName}`);

        // Determine base URL
        // In production, this should be your deployed URL.
        // For local dev, we assume localhost:3000
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const host = req.headers.get("host") || "localhost:3000";
        const baseUrl = `${protocol}://${host}`;

        const browser = await chromium.launch({
            headless: true,
        });
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to the preview page with data
        const previewUrl = `${baseUrl}/proposal/preview?data=${payload}`;
        await page.goto(previewUrl, { waitUntil: "networkidle" });

        // Generate PDF
        // We print the whole scrollable area. 
        // Since our PreviewPage renders multiple A4 divs, we want to print them as pages.
        // CSS @page { size: A4 } and print styles should handle the breaks if set up correctly.
        // However, Playwright's page.pdf() with format 'A4' usually works best if the content is continuous
        // or if we rely on CSS break-after: always.

        // Our A4Page component has specific dimensions.
        // To get perfect print, we might need to tell Playwright to print background graphics.
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "0px",
                bottom: "0px",
                left: "0px",
                right: "0px",
            },
        });

        await browser.close();

        return new NextResponse(pdfBuffer as any, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${data.projectName}_Proposal.pdf"`,
            },
        });
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}

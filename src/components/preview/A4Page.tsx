import React from "react";
import { cn } from "@/lib/utils";

interface A4PageProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const A4Page = React.forwardRef<HTMLDivElement, A4PageProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "a4-page mx-auto bg-white relative overflow-hidden",
                    "print:shadow-none print:m-0 print:w-[210mm] print:h-[297mm]",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
A4Page.displayName = "A4Page";

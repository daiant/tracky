import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent px-2.5 bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent px-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent text-[#e76e50] hover:text-[#e76e50]/80",
        outline: "text-foreground",
        positive: "border-transparent text-green-600 hover:text-green-600/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

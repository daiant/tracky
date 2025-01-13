import { ReactNode } from "react";

type VariantProps = "h1" | "h2" | "p";

export default function Text({
  children,
  variant,
}: {
  children: ReactNode;
  variant: VariantProps;
}) {
  if (variant === "h1") {
    return <h1 className="text-3xl font-bold">{children}</h1>;
  }

  if (variant === "h2") {
    return <h2 className="text-sm text-secondary-foreground ">{children}</h2>;
  }
}

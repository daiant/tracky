import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number) => {
  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (isNaN(value)) return intl.format(0);

  return intl.format(value);
};

export const formatCrypto = (value: number) => {
  const intl = new Intl.NumberFormat("es", {
    style: "currency",
    currency: "ETH",
  });

  if (isNaN(value)) return intl.format(0);

  return intl.format(value).replace(",", ".");
};

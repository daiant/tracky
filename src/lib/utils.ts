import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const intl = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});

export const formatNumber = (value: number) => {
  if (isNaN(value)) return intl.format(0);

  return intl.format(value);
};

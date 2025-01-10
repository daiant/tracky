import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const intl = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});

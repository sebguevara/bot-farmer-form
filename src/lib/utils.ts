import { GroupNumber } from "@/components/core/form";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const splitToArray = (value: string): string[] =>
  value
    .split(/[\n,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);

export const groups: GroupNumber[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
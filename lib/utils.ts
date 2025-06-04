import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toArray(value: any | any[]): any[] {
  return Array.isArray(value) ? value : [value];
}
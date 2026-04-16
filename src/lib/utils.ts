import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskColor(riskClass: string) {
  switch (riskClass) {
    case "LOW": return "badge-green";
    case "MEDIUM": return "badge-yellow";
    case "HIGH": return "badge-red";
    case "CRITICAL": return "badge-red";
    default: return "badge-gray";
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#16a34a";
  if (score >= 60) return "#d97706";
  return "#dc2626";
}

export function getCapacityColor(load: number): string {
  if (load <= 60) return "#16a34a";
  if (load <= 80) return "#d97706";
  return "#dc2626";
}

export function getCapacityLabel(load: number): string {
  if (load <= 60) return "Available";
  if (load <= 80) return "Limited";
  return "Near Full";
}

export function formatRevenue(amount: number, currency: string): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B ${currency}`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)}M ${currency}`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K ${currency}`;
  return `${amount} ${currency}`;
}

export function getSeverityColor(severity: string) {
  switch (severity) {
    case "CRITICAL": return { bg: "#fee2e2", text: "#991b1b", dot: "#dc2626" };
    case "WARNING": return { bg: "#fef9c3", text: "#854d0e", dot: "#d97706" };
    default: return { bg: "#dbeafe", text: "#1e40af", dot: "#2563eb" };
  }
}

export const COUNTRY_NAMES: Record<string, string> = {
  SE: "Sweden", PL: "Poland", CZ: "Czech Republic", DE: "Germany",
  NO: "Norway", FI: "Finland", DK: "Denmark", NL: "Netherlands",
  FR: "France", IT: "Italy", ES: "Spain", PT: "Portugal",
  GB: "United Kingdom", IN: "India", CN: "China", VN: "Vietnam",
  TR: "Turkey", US: "United States", KR: "South Korea", JP: "Japan",
};

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" },
  { code: "fi", label: "Suomi" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "pl", label: "Polski" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "nl", label: "Nederlands" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
];

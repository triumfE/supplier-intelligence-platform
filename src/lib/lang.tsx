"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "sv" | "de";
interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; }

const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.discovery": "Discovery", "nav.risk": "Risk & Resilience", "nav.market": "Market Intelligence",
    "nav.docs": "Document Hub", "nav.rfq": "RFQ Engine", "nav.naval": "Naval & Defence",
    "hero.tagline": "The world's smartest industrial supplier platform",
    "hero.title1": "Find, evaluate and contract", "hero.title2": "the right suppliers", "hero.title3": "— globally",
    "market.title": "Market Intelligence", "market.desc": "Real-time pricing, forecasts and trends for metals, steel, materials, energy, freight and currencies.",
    "market.live": "Live data",
  },
  sv: {
    "nav.discovery": "Sök leverantörer", "nav.risk": "Risk & Resiliens", "nav.market": "Marknadsintelligens",
    "nav.docs": "Dokumentcenter", "nav.rfq": "RFQ-motor", "nav.naval": "Marin & Försvar",
    "hero.tagline": "Världens smartaste industriella leverantörsplattform",
    "hero.title1": "Hitta, utvärdera och kontraktera", "hero.title2": "rätt leverantörer", "hero.title3": "— globalt",
    "market.title": "Marknadsintelligens", "market.desc": "Realtidspriser, prognoser och trender för metaller, stål, material, energi, frakt och valutor.",
    "market.live": "Livedata",
  },
  de: {
    "nav.discovery": "Entdeckung", "nav.risk": "Risiko & Resilienz", "nav.market": "Marktintelligenz",
    "nav.docs": "Dokumentencenter", "nav.rfq": "RFQ-Engine", "nav.naval": "Marine & Verteidigung",
    "hero.tagline": "Die intelligenteste industrielle Lieferantenplattform der Welt",
    "hero.title1": "Finden, bewerten und beauftragen", "hero.title2": "die richtigen Lieferanten", "hero.title3": "— weltweit",
    "market.title": "Marktintelligenz", "market.desc": "Echtzeitpreise, Prognosen und Trends für Metalle, Stahl, Materialien, Energie, Fracht und Währungen.",
    "market.live": "Livedaten",
  },
};

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[lang][key] || translations.en[key] || key;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
export type { Lang };

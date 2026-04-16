"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "sv" | "de";
interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; }

const T: Record<Lang, Record<string, string>> = {
  en: {
    "nav.discovery":"Discovery","nav.risk":"Risk & Resilience","nav.market":"Market Intelligence",
    "nav.docs":"Document Hub","nav.rfq":"RFQ Engine","nav.naval":"Naval & Defence",
    "hero.badge":"The world's smartest industrial supplier platform",
    "hero.h1a":"Grow globally.","hero.h1b":"Source smarter.","hero.h1c":"",
    "hero.p":"Whether you buy or supply, this is where better business starts. AI-powered discovery, 360° supplier profiles, financial risk scoring, and document generation — all in one platform.",
    "hero.placeholder":'Try: "CNC 5-axis, duplex steel, marine certified, Scandinavia"',
    "hero.search":"Search","hero.hint":"Search by process, material, certification, country, or describe your need in plain language",
    "stat.suppliers":"Suppliers indexed","stat.countries":"Countries covered","stat.industries":"Industries","stat.docs":"Documents generated",
    "feat.title":"Everything procurement needs","feat.sub":"Built by procurement professionals, for procurement professionals. Enterprise-grade features accessible to every organisation size.",
    "feat.discovery":"AI-Powered Discovery","feat.discovery.d":"Natural language search. Find the right supplier in seconds — from global Tier-1 to the local workshop 30 km away.",
    "feat.risk":"Risk & Resilience","feat.risk.d":"Concentration risk, financial distress signals, geopolitical alerts. Make sourcing decisions with full visibility.",
    "feat.docs":"Document Hub","feat.docs.d":"Generate NDA, Supply Agreement, and TCA reports in any language. Upload your own templates. Adobe Sign integration.",
    "feat.rfq":"RFQ Engine","feat.rfq.d":"Send RFQs to multiple suppliers simultaneously. AI compares responses and calculates Total Cost of Acquisition.",
    "feat.naval":"Naval & Defence","feat.naval.d":"ITAR-safe handling, AQAP-certified suppliers, dual-use screening. Built for defence-grade procurement sensitivity.",
    "feat.market":"Market Intelligence","feat.market.d":"Real-time LME metals, MEPS steel, energy & freight indices. Forecasts up to 12 months ahead.",
    "feat.hyperlocal":"Hyperlocal Discovery","feat.hyperlocal.d":"The local machining shop with 6 employees is now visible. QR-code onboarding for suppliers without a web presence.",
    "feat.explore":"Explore",
    "cta.h":"Ready to transform your supplier management?","cta.p":"Free for small suppliers. Enterprise plans for large procurement teams.",
    "cta.search":"Start searching suppliers","cta.nda":"Generate your first NDA",
  },
  sv: {
    "nav.discovery":"Sök leverantörer","nav.risk":"Risk & Resiliens","nav.market":"Marknadsintelligens",
    "nav.docs":"Dokumentcenter","nav.rfq":"RFQ-motor","nav.naval":"Marin & Försvar",
    "hero.badge":"Världens smartaste industriella leverantörsplattform",
    "hero.h1a":"Väx globalt.","hero.h1b":"Köp smartare.","hero.h1c":"",
    "hero.p":"Oavsett om du köper eller levererar — här börjar bättre affärer. AI-driven sökning, 360° leverantörsprofiler, finansiell riskbedömning och dokumentgenerering — allt i en plattform.",
    "hero.placeholder":'Prova: "CNC 5-axlig, duplexstål, marinklassad, Skandinavien"',
    "hero.search":"Sök","hero.hint":"Sök efter process, material, certifiering, land eller beskriv ditt behov i fritext",
    "stat.suppliers":"Leverantörer indexerade","stat.countries":"Länder täckta","stat.industries":"Branscher","stat.docs":"Dokument genererade",
    "feat.title":"Allt inköp behöver","feat.sub":"Byggt av inköpare, för inköpare. Enterprise-funktioner tillgängliga för alla organisationsstorlekar.",
    "feat.discovery":"AI-driven sökning","feat.discovery.d":"Naturligt språk. Hitta rätt leverantör på sekunder — från globala Tier-1 till den lokala verkstaden 30 km bort.",
    "feat.risk":"Risk & Resiliens","feat.risk.d":"Koncentrationsrisk, finansiella varningssignaler, geopolitiska larm. Fatta inköpsbeslut med full synlighet.",
    "feat.docs":"Dokumentcenter","feat.docs.d":"Generera NDA, leverantörsavtal och TCA-rapporter på valfritt språk. Ladda upp egna mallar. Adobe Sign-integration.",
    "feat.rfq":"RFQ-motor","feat.rfq.d":"Skicka RFQ:er till flera leverantörer samtidigt. AI jämför svar och beräknar Total Cost of Acquisition.",
    "feat.naval":"Marin & Försvar","feat.naval.d":"ITAR-säker hantering, AQAP-certifierade leverantörer, dual-use-screening. Byggt för försvarsgradig inköpskänslighet.",
    "feat.market":"Marknadsintelligens","feat.market.d":"Realtids LME-metaller, MEPS-stål, energi- och fraktindex. Prognoser upp till 12 månader framåt.",
    "feat.hyperlocal":"Hyperlokal sökning","feat.hyperlocal.d":"Den lokala verkstaden med 6 anställda syns nu. QR-kod för onboarding av leverantörer utan webbnärvaro.",
    "feat.explore":"Utforska",
    "cta.h":"Redo att transformera din leverantörshantering?","cta.p":"Gratis för små leverantörer. Enterprise-planer för stora inköpsteam.",
    "cta.search":"Börja söka leverantörer","cta.nda":"Generera ditt första NDA",
  },
  de: {
    "nav.discovery":"Entdeckung","nav.risk":"Risiko & Resilienz","nav.market":"Marktintelligenz",
    "nav.docs":"Dokumentencenter","nav.rfq":"RFQ-Engine","nav.naval":"Marine & Verteidigung",
    "hero.badge":"Die intelligenteste industrielle Lieferantenplattform der Welt",
    "hero.h1a":"Global wachsen.","hero.h1b":"Smarter beschaffen.","hero.h1c":"",
    "hero.p":"Ob Sie einkaufen oder liefern — hier beginnen bessere Geschäfte. KI-gestützte Suche, 360°-Lieferantenprofile, finanzielle Risikobewertung und Dokumentenerstellung — alles auf einer Plattform.",
    "hero.placeholder":'Versuchen: "CNC 5-Achsen, Duplexstahl, marinezertifiziert, Skandinavien"',
    "hero.search":"Suchen","hero.hint":"Suche nach Prozess, Material, Zertifizierung, Land oder beschreibe deinen Bedarf",
    "stat.suppliers":"Indexierte Lieferanten","stat.countries":"Abgedeckte Länder","stat.industries":"Branchen","stat.docs":"Generierte Dokumente",
    "feat.title":"Alles, was der Einkauf braucht","feat.sub":"Von Einkäufern für Einkäufer. Enterprise-Funktionen für jede Organisationsgröße.",
    "feat.discovery":"KI-gestützte Suche","feat.discovery.d":"Natürliche Sprache. Den richtigen Lieferanten in Sekunden finden — vom globalen Tier-1 bis zur lokalen Werkstatt.",
    "feat.risk":"Risiko & Resilienz","feat.risk.d":"Konzentrationsrisiko, finanzielle Warnsignale, geopolitische Alarme. Beschaffungsentscheidungen mit voller Transparenz.",
    "feat.docs":"Dokumentencenter","feat.docs.d":"NDA, Lieferverträge und TCA-Berichte generieren. Eigene Vorlagen hochladen. Adobe Sign Integration.",
    "feat.rfq":"RFQ-Engine","feat.rfq.d":"RFQs an mehrere Lieferanten gleichzeitig senden. KI vergleicht Antworten und berechnet Gesamtkosten.",
    "feat.naval":"Marine & Verteidigung","feat.naval.d":"ITAR-sichere Handhabung, AQAP-zertifizierte Lieferanten, Dual-Use-Screening.",
    "feat.market":"Marktintelligenz","feat.market.d":"Echtzeit-LME-Metalle, MEPS-Stahl, Energie- und Frachtindizes. Prognosen bis 12 Monate.",
    "feat.hyperlocal":"Hyperlokale Suche","feat.hyperlocal.d":"Die lokale Werkstatt mit 6 Mitarbeitern ist jetzt sichtbar. QR-Code-Onboarding.",
    "feat.explore":"Erkunden",
    "cta.h":"Bereit, Ihr Lieferantenmanagement zu transformieren?","cta.p":"Kostenlos für kleine Lieferanten. Enterprise-Pläne für große Einkaufsteams.",
    "cta.search":"Lieferanten suchen","cta.nda":"Erstes NDA generieren",
  },
};

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => T[lang][key] || T.en[key] || key;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
export type { Lang };

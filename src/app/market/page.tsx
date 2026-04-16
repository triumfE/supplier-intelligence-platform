"use client";

import { useState } from "react";
import {
  TrendingUp, BarChart2, Factory, Layers,
  Zap, Ship, TrendingDown, DollarSign
} from "lucide-react";
import MetalsTab   from "./MetalsTab";
import SteelTab    from "./SteelTab";
import MaterialTab from "./MaterialTab";
import EnergyTab   from "./EnergyTab";
import FreightTab  from "./FreightTab";
import ForecastTab from "./ForecastTab";
import CurrencyTab from "./CurrencyTab";

const tabs = [
  {
    id: "metals",
    label: "Metaller LME",
    icon: BarChart2,
    desc: "Aluminium · Cobalt · Copper · Nickel · Tin · Zinc · Molybdenum · USD",
    source: "London Metal Exchange",
  },
  {
    id: "steel",
    label: "Stål MEPS",
    icon: Factory,
    desc: "Hot Rolled · Cold Rolled · Galvanised · Stainless · Rebar · EUR",
    source: "Metal Bulletin MEPS",
  },
  {
    id: "material",
    label: "Material Index",
    icon: Layers,
    desc: "Bronze · Gjutjärn · Iron Index · Stainless Index · EUR/tonne",
    source: "FEAF · CAEF · LME",
  },
  {
    id: "energy",
    label: "Energi",
    icon: Zap,
    desc: "El per land · Gas TTF · Energiindex · EUR/MWh",
    source: "Nord Pool · Trading Economics · ECB",
  },
  {
    id: "freight",
    label: "Frakt",
    icon: Ship,
    desc: "Lastbil · Sjöfrakt · Flyg · Container · BDI",
    source: "Baltic Exchange · Freightos · Statista",
  },
  {
    id: "forecast",
    label: "Prognos",
    icon: TrendingDown,
    desc: "Prismodeller · Trender · Signaler · 6–12 mån",
    source: "MEPS Forecast · LME Forwards",
  },
  {
    id: "currency",
    label: "Valuta & CO₂",
    icon: DollarSign,
    desc: "EUR/USD · EUR/NOK · EUR/CNY · EU ETS Carbon",
    source: "ECB · EU ETS · World Bank",
  },
];

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState("metals");
  const active = tabs.find(t => t.id === activeTab)!;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>

      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <TrendingUp size={22} style={{ color: "#0070f3" }} />
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0c2340", margin: 0 }}>
            Market Intelligence
          </h1>
          <span style={{
            background: "#f0fdf4", border: "1px solid #86efac",
            color: "#166534", fontSize: 11, fontWeight: 600,
            padding: "2px 10px", borderRadius: 999, display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
            Live data
          </span>
        </div>
        <p style={{ color: "#64748b", fontSize: 14, margin: 0, maxWidth: 700 }}>
          Realtidspriser och trender för metaller, stål, material, energi, frakt och valuta.
          Data hämtas direkt från LME, MEPS, Nord Pool, Baltic Exchange och ECB.
        </p>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 0, flexWrap: "wrap",
        borderBottom: "2px solid #e2e8f0", marginBottom: 0,
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "11px 18px",
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                color: isActive ? "#0070f3" : "#64748b",
                background: isActive ? "#f0f9ff" : "transparent",
                border: "none", cursor: "pointer",
                borderBottom: isActive ? "2px solid #0070f3" : "2px solid transparent",
                marginBottom: -2,
                whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Source + description bar */}
      <div style={{
        background: "#f8fafc", borderLeft: "3px solid #0070f3",
        padding: "10px 16px", marginBottom: 28,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8,
      }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{active.label}</span>
          <span style={{ fontSize: 13, color: "#64748b" }}> — {active.desc}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>Källa:</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#475569",
            background: "white", border: "1px solid #e2e8f0",
            padding: "2px 8px", borderRadius: 4 }}>
            {active.source}
          </span>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "metals"   && <MetalsTab />}
      {activeTab === "steel"    && <SteelTab />}
      {activeTab === "material" && <MaterialTab />}
      {activeTab === "energy"   && <EnergyTab />}
      {activeTab === "freight"  && <FreightTab />}
      {activeTab === "forecast" && <ForecastTab />}
      {activeTab === "currency" && <CurrencyTab />}

    </div>
  );
}

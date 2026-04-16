"use client";

import { useState } from "react";
import { AlertTriangle, TrendingDown, Globe, Shield, CheckCircle, Download, RefreshCw, X } from "lucide-react";
import { mockResilienceAlerts } from "@/lib/mock-data";
import { getSeverityColor } from "@/lib/utils";

const ALERT_ICONS: Record<string, typeof AlertTriangle> = {
  CONCENTRATION_RISK: TrendingDown,
  FINANCIAL_DISTRESS: TrendingDown,
  GEOPOLITICAL_RISK: Globe,
  SANCTIONS_HIT: Shield,
  CERTIFICATION_EXPIRY: AlertTriangle,
};

const ALERT_TYPE_LABELS: Record<string, string> = {
  CONCENTRATION_RISK: "Concentration Risk",
  FINANCIAL_DISTRESS: "Financial Distress",
  GEOPOLITICAL_RISK: "Geopolitical Risk",
  SANCTIONS_HIT: "Sanctions",
  CERTIFICATION_EXPIRY: "Cert Expiry",
};

const concentrationData = [
  { category: "Machining", countries: [{ name: "Poland", pct: 74, flag: "🇵🇱" }, { name: "Czech Rep.", pct: 18, flag: "🇨🇿" }, { name: "Sweden", pct: 8, flag: "🇸🇪" }] },
  { category: "Casting", countries: [{ name: "Sweden", pct: 55, flag: "🇸🇪" }, { name: "Germany", pct: 30, flag: "🇩🇪" }, { name: "India", pct: 15, flag: "🇮🇳" }] },
  { category: "Fabrication", countries: [{ name: "Norway", pct: 45, flag: "🇳🇴" }, { name: "Sweden", pct: 40, flag: "🇸🇪" }, { name: "Poland", pct: 15, flag: "🇵🇱" }] },
  { category: "Hydraulics", countries: [{ name: "Germany", pct: 62, flag: "🇩🇪" }, { name: "Netherlands", pct: 28, flag: "🇳🇱" }, { name: "Denmark", pct: 10, flag: "🇩🇰" }] },
];

function SummaryCard({ label, count, color, icon: Icon }: { label: string; count: number; color: string; icon: typeof AlertTriangle }) {
  return (
    <div style={{ background: "white", border: `1px solid ${color}30`, borderRadius: 12,
      padding: "18px 20px", borderLeft: `4px solid ${color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{count}</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{label}</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

export default function ResiliencePage() {
  const [alerts, setAlerts] = useState(mockResilienceAlerts);
  const [filter, setFilter] = useState("ALL");

  const resolve = (id: string) => setAlerts(a => a.map(x => x.id === id ? { ...x, resolved: true } : x));

  const active = alerts.filter(a => !a.resolved);
  const critical = active.filter(a => a.severity === "CRITICAL");
  const warnings = active.filter(a => a.severity === "WARNING");
  const infos = active.filter(a => a.severity === "INFO");

  const filtered = filter === "ALL" ? active
    : active.filter(a => a.alertType === filter || a.severity === filter);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>

      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0c2340", margin: 0 }}>Risk & Resilience</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
            Supply chain risk monitoring — concentration, financial distress, geopolitical exposure
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
            fontSize: 13, fontWeight: 600, color: "#475569", cursor: "pointer" }}>
            <RefreshCw size={13} /> Refresh
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
            background: "#0c2340", color: "white", border: "none", borderRadius: 8,
            fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <Download size={13} /> Export Report
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
        <SummaryCard label="Critical Alerts" count={critical.length} color="#dc2626" icon={AlertTriangle} />
        <SummaryCard label="Warnings" count={warnings.length} color="#d97706" icon={AlertTriangle} />
        <SummaryCard label="Informational" count={infos.length} color="#2563eb" icon={AlertTriangle} />
        <SummaryCard label="Resolved (30d)" count={alerts.filter(a => a.resolved).length} color="#16a34a" icon={CheckCircle} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, alignItems: "start" }}>

        {/* Alerts list */}
        <div>
          {/* Filter bar */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {["ALL", "CRITICAL", "WARNING", "CONCENTRATION_RISK", "FINANCIAL_DISTRESS", "GEOPOLITICAL_RISK"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: "pointer",
                  background: filter === f ? "#0c2340" : "white",
                  color: filter === f ? "white" : "#475569",
                  border: "1px solid #e2e8f0" }}>
                {f === "ALL" ? "All Active" : f.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(alert => {
              const colors = getSeverityColor(alert.severity);
              const Icon = ALERT_ICONS[alert.alertType] ?? AlertTriangle;
              return (
                <div key={alert.id} style={{ background: "white", border: `1px solid ${colors.dot}25`,
                  borderRadius: 12, padding: 20, borderLeft: `4px solid ${colors.dot}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flex: 1 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: colors.bg,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <Icon size={16} style={{ color: colors.dot }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{alert.title}</span>
                          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999,
                            background: colors.bg, color: colors.dot, fontWeight: 600 }}>
                            {alert.severity}
                          </span>
                          <span style={{ fontSize: 11, color: "#94a3b8" }}>
                            {ALERT_TYPE_LABELS[alert.alertType]}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0, marginBottom: 10 }}>
                          {alert.description}
                        </p>
                        {alert.metric && (
                          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#64748b" }}>
                            {Object.entries(alert.metric).map(([k, v]) => (
                              <span key={k}><strong style={{ color: "#0f172a" }}>{k}:</strong> {String(v)}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <button onClick={() => resolve(alert.id)}
                      style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px",
                        background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6,
                        fontSize: 12, color: "#64748b", cursor: "pointer", flexShrink: 0, marginLeft: 12 }}>
                      <X size={11} /> Resolve
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 20px", background: "white",
                border: "1px solid #e2e8f0", borderRadius: 12 }}>
                <CheckCircle size={40} style={{ color: "#16a34a", margin: "0 auto 12px" }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>No active alerts</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>Your supply chain looks healthy in this category</div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Concentration heatmap */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0c2340", marginBottom: 16 }}>
              Spend Concentration by Category
            </h3>
            {concentrationData.map(({ category, countries }) => (
              <div key={category} style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>{category}</div>
                {countries.map(({ name, pct, flag }) => {
                  const risk = pct > 70 ? "#dc2626" : pct > 50 ? "#d97706" : "#16a34a";
                  return (
                    <div key={name} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 3 }}>
                        <span>{flag} {name}</span>
                        <span style={{ fontWeight: 600, color: risk }}>{pct}%</span>
                      </div>
                      <div className="score-bar">
                        <div className="score-bar-fill" style={{ width: `${pct}%`, background: risk }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#854d0e", marginBottom: 8 }}>
              💡 Recommendation
            </div>
            <p style={{ fontSize: 13, color: "#92400e", lineHeight: 1.6, margin: 0 }}>
              74% of machining spend in Poland exceeds the recommended 70% threshold.
              Consider pre-qualifying 2 suppliers in Czech Republic or Baltics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

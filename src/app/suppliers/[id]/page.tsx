"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Globe, CheckCircle, AlertTriangle, Shield, Star,
  FileText, Send, MessageSquare, TrendingDown, ExternalLink, Download } from "lucide-react";
import { mockSuppliers } from "@/lib/mock-data";
import { getScoreColor, getCapacityColor, getCapacityLabel, formatRevenue, COUNTRY_NAMES } from "@/lib/utils";

function ScoreRing({ score, size = 64 }: { score: number; size?: number }) {
  const color = getScoreColor(score);
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={5} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.28, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 18px" }}>
      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: color ?? "#0f172a", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

const TABS = ["Overview", "Financial", "QA & Audits", "TCA Calculator", "Documents", "Team Notes"];

export default function SupplierProfilePage({ params }: { params: { id: string } }) {
  const supplier = mockSuppliers.find(s => s.id === params.id) ?? mockSuppliers[0];
  const [tab, setTab] = useState("Overview");
  const [qty, setQty] = useState(200);

  const capColor = getCapacityColor(supplier.capacity?.currentLoad ?? 50);
  const capLabel = getCapacityLabel(supplier.capacity?.currentLoad ?? 50);

  // TCA calculation
  const freight = 18, inspection = 12, storage = 9;
  const tca = (supplier.financial.creditRating === "A" ? 850 : 730) + freight + inspection + storage;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>

      {/* Back */}
      <Link href="/suppliers" style={{ display: "inline-flex", alignItems: "center", gap: 6,
        color: "#64748b", textDecoration: "none", fontSize: 13, marginBottom: 20 }}>
        <ArrowLeft size={14} /> Back to Discovery
      </Link>

      {/* Header card */}
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14,
        padding: "28px 32px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div style={{ width: 60, height: 60, borderRadius: 12, background: "#0c2340",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: 18 }}>
                {supplier.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </span>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0c2340", margin: 0 }}>{supplier.name}</h1>
                {supplier.isHyperlocal && <span className="badge badge-blue">Hyperlocal</span>}
                {supplier.navalCertified && <span className="badge badge-navy"><Shield size={10} /> Naval</span>}
                <span className={`badge ${supplier.financial.riskClass === "LOW" ? "badge-green" : "badge-yellow"}`}>
                  {supplier.financial.riskClass} RISK
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#64748b", fontSize: 14, flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={13} /> {supplier.city}, {COUNTRY_NAMES[supplier.country]}
                </span>
                <span>· Founded {supplier.founded}</span>
                <span>· {supplier.employees} employees</span>
                {supplier.website && (
                  <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 4, color: "#0070f3", textDecoration: "none" }}>
                    <Globe size={12} /> {supplier.website} <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/documents?type=NDA"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
                textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#475569" }}>
              <FileText size={14} /> Generate NDA
            </Link>
            <Link href="/rfq"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                background: "#0c2340", color: "white", borderRadius: 8,
                textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
              <Send size={14} /> Send RFQ
            </Link>
          </div>
        </div>

        {/* Quick scores */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: 16, marginTop: 24, paddingTop: 24, borderTop: "1px solid #f1f5f9" }}>
          {[
            { label: "Match Score", val: supplier.matchScore },
            { label: "Financial", val: supplier.financial.creditScore ?? 78 },
            { label: "QA Score", val: supplier.qa.overallScore ?? 87 },
            { label: "ESG Score", val: supplier.esg?.esgScore ?? 74 },
          ].map(({ label, val }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <ScoreRing score={val} size={56} />
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: capColor, marginBottom: 4 }}>{capLabel}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>Capacity</div>
            <div className="score-bar" style={{ marginTop: 8, maxWidth: 80, margin: "8px auto 0" }}>
              <div className="score-bar-fill" style={{ width: `${supplier.capacity?.currentLoad ?? 50}%`, background: capColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, background: "white", border: "1px solid #e2e8f0",
        borderRadius: 10, padding: 4, marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: "8px 12px", border: "none", borderRadius: 7, cursor: "pointer",
              fontSize: 13, fontWeight: tab === t ? 600 : 400,
              background: tab === t ? "#0c2340" : "transparent",
              color: tab === t ? "white" : "#64748b",
              transition: "all 0.15s ease", whiteSpace: "nowrap" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "Overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Capabilities */}
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", marginBottom: 16 }}>Capabilities</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Processes", items: supplier.capabilities.processes },
                  { label: "Materials", items: supplier.capabilities.materials },
                  { label: "Industries", items: supplier.capabilities.industries },
                ].map(({ label, items }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {items.map(i => <span key={i} className="badge badge-gray">{i}</span>)}
                    </div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Tolerances</div>
                  <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 600 }}>{supplier.capabilities.tolerances}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", marginBottom: 16 }}>Certifications</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {supplier.certifications.map(c => (
                  <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {c.verified ? <CheckCircle size={15} style={{ color: "#16a34a" }} />
                        : <AlertTriangle size={15} style={{ color: "#d97706" }} />}
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{c.name}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                      {c.expiresAt ? `Expires ${c.expiresAt}` : "No expiry"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <MetricCard label="Lead Time" value={`${supplier.capabilities.leadTimeMin}–${supplier.capabilities.leadTimeMax} weeks`} />
            <MetricCard label="Batch Range" value={`${supplier.capabilities.batchMin}–${supplier.capabilities.batchMax} pcs`} />
            <MetricCard label="Monthly Capacity" value={`${supplier.capacity?.monthlyHours?.toLocaleString()} hrs`}
              sub={supplier.capacity?.availableSlots} color="#0070f3" />
            <MetricCard label="Revenue (2024)" value={formatRevenue(supplier.financial.revenue!, supplier.financial.revenueCurrency!)} />
            <MetricCard label="Ownership" value={supplier.financial.ownershipType === "family" ? "Family-owned" : "PE-backed"}
              sub={`UBO: ${supplier.financial.ubo?.country ?? "N/A"}`} />
          </div>
        </div>
      )}

      {tab === "Financial" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <MetricCard label="Credit Rating" value={supplier.financial.creditRating!}
            color={supplier.financial.creditRating?.startsWith("A") ? "#16a34a" : "#d97706"} />
          <MetricCard label="Credit Score" value={`${supplier.financial.creditScore}/100`}
            sub="DNB source" color={getScoreColor(supplier.financial.creditScore!)} />
          <MetricCard label="Payment Score" value={`${supplier.financial.paymentScore}/100`}
            sub="Avg 23 days" color={getScoreColor(supplier.financial.paymentScore!)} />
          <MetricCard label="Equity Ratio" value={`${supplier.financial.equityRatio}%`} />
          <MetricCard label="Bankruptcy" value={supplier.financial.bankruptcyFlag ? "⚠ FLAG" : "✓ Clear"}
            color={supplier.financial.bankruptcyFlag ? "#dc2626" : "#16a34a"} />
          <MetricCard label="Sanctions" value={supplier.financial.sanctionFlag ? "⚠ FLAG" : "✓ Clear"}
            color={supplier.financial.sanctionFlag ? "#dc2626" : "#16a34a"} />
          <div style={{ gridColumn: "1 / -1", background: "white", border: "1px solid #e2e8f0",
            borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0c2340", marginBottom: 8 }}>Ownership Structure</h3>
            <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
              <div><strong>Type:</strong> {supplier.financial.ownershipType}</div>
              <div><strong>UBO:</strong> {supplier.financial.ubo?.name ?? "N/A"} ({supplier.financial.ubo?.country ?? "N/A"})</div>
              <div><strong>Parent:</strong> None identified</div>
            </div>
          </div>
        </div>
      )}

      {tab === "QA & Audits" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <MetricCard label="Delivery Precision" value={`${supplier.qa.deliveryPrecision}%`}
            color={getScoreColor(supplier.qa.deliveryPrecision!)} />
          <MetricCard label="Non-Conformance" value={`${supplier.qa.nonConformance}%`}
            color={supplier.qa.nonConformance! < 1 ? "#16a34a" : "#d97706"} />
          <MetricCard label="Open Deviations" value={`${supplier.qa.openDeviations}`}
            color={supplier.qa.openDeviations === 0 ? "#16a34a" : "#d97706"} />
          <MetricCard label="QA Score" value={`${supplier.qa.overallScore}/100`}
            color={getScoreColor(supplier.qa.overallScore!)} />
          <MetricCard label="Last Audit" value={supplier.qa.lastAudit ?? "Never"}
            sub={supplier.qa.lastAuditType ?? ""} />
        </div>
      )}

      {tab === "TCA Calculator" && (
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0c2340", marginBottom: 6 }}>
            Total Cost of Acquisition Calculator
          </h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
            Real landed cost — beyond just the list price.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", display: "block", marginBottom: 6 }}>
                Quantity (pcs)
              </label>
              <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8,
                  fontSize: 14, outline: "none", color: "#0f172a" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", display: "block", marginBottom: 6 }}>
                Incoterms
              </label>
              <select style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8,
                fontSize: 14, outline: "none", color: "#0f172a", background: "white" }}>
                <option>DAP — Delivered At Place</option>
                <option>EXW — Ex Works</option>
                <option>FCA — Free Carrier</option>
                <option>CIF — Cost Insurance Freight</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: 24, border: "1px solid #f1f5f9", borderRadius: 10, overflow: "hidden" }}>
            {[
              { label: "Unit price (list)", value: 850, currency: "SEK" },
              { label: "Freight & logistics", value: freight, currency: "SEK" },
              { label: "Customs & duties", value: 0, currency: "SEK", note: "EU supplier" },
              { label: "Inspection & QC", value: inspection, currency: "SEK" },
              { label: "Storage (lead time ×)", value: storage, currency: "SEK" },
              { label: "Currency risk", value: 0, currency: "SEK", note: "Same currency" },
              { label: "Geopolitical risk premium", value: 0, currency: "SEK", note: "Low risk" },
            ].map(({ label, value, currency, note }, i) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 16px", background: i % 2 === 0 ? "#f8fafc" : "white",
                borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 14, color: "#475569" }}>
                  {label} {note && <span style={{ fontSize: 12, color: "#94a3b8" }}>({note})</span>}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
                  {value} {currency}
                </span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px", background: "#0c2340" }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>TCA per unit</span>
              <span style={{ color: "white", fontWeight: 800, fontSize: 20 }}>{tca} SEK</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 16px", background: "#1a3a5c" }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Total for {qty} pcs</span>
              <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>{(tca * qty).toLocaleString()} SEK</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
              background: "#0c2340", color: "white", border: "none", borderRadius: 8,
              cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              <Download size={14} /> Export as PDF
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
              background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 8,
              cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              <Download size={14} /> Export to Excel
            </button>
          </div>
        </div>
      )}

      {tab === "Documents" && (
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", marginBottom: 20 }}>Document History</h2>
          <div style={{ color: "#94a3b8", fontSize: 14, textAlign: "center", padding: "40px 0" }}>
            No documents yet. <Link href="/documents" style={{ color: "#0070f3" }}>Generate your first NDA →</Link>
          </div>
        </div>
      )}

      {tab === "Team Notes" && (
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", marginBottom: 16 }}>Internal Team Notes</h2>
          <textarea placeholder="Add internal note about this supplier..."
            style={{ width: "100%", minHeight: 120, padding: 12, border: "1px solid #e2e8f0",
              borderRadius: 8, fontSize: 14, outline: "none", color: "#0f172a", resize: "vertical" }} />
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {["Engineering approved", "QA concern", "Good backup option", "Price negotiation needed"].map(tag => (
              <button key={tag} style={{ padding: "5px 12px", background: "#f1f5f9",
                border: "1px solid #e2e8f0", borderRadius: 999, fontSize: 12, color: "#475569",
                cursor: "pointer", fontWeight: 500 }}>
                + {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Send, Upload, Plus, Trash2, BarChart3, CheckCircle, Clock, Lock } from "lucide-react";
import { mockTcaComparison } from "@/lib/mock-data";
import { getScoreColor, COUNTRY_NAMES } from "@/lib/utils";

export default function RfqPage() {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([{ id: 1, desc: "", qty: 1, unit: "pcs", spec: "" }]);
  const [drawingLevel, setDrawingLevel] = useState<"FULL" | "MASKED" | "CONTOUR_ONLY">("MASKED");
  const [showResults, setShowResults] = useState(false);

  const addItem = () => setItems(p => [...p, { id: Date.now(), desc: "", qty: 1, unit: "pcs", spec: "" }]);
  const removeItem = (id: number) => setItems(p => p.filter(i => i.id !== id));

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0c2340", marginBottom: 6 }}>RFQ Engine</h1>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28 }}>
        Send requests to multiple suppliers simultaneously. AI analyses responses and calculates TCA.
      </p>

      {!showResults ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Items */}
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", marginBottom: 16 }}>Line Items</h2>
              {items.map((item, idx) => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "2fr 80px 80px auto",
                  gap: 8, marginBottom: 10, alignItems: "center" }}>
                  <input placeholder={`Item ${idx + 1} description`}
                    style={{ padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 7,
                      fontSize: 13, outline: "none", color: "#0f172a" }} />
                  <input type="number" defaultValue={item.qty} min={1}
                    style={{ padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 7,
                      fontSize: 13, outline: "none", color: "#0f172a", textAlign: "center" }} />
                  <select style={{ padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 7,
                    fontSize: 13, outline: "none", color: "#0f172a", background: "white" }}>
                    <option>pcs</option><option>kg</option><option>m</option><option>set</option>
                  </select>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(item.id)}
                      style={{ border: "none", background: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addItem}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
                  background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 7,
                  fontSize: 13, color: "#64748b", cursor: "pointer" }}>
                <Plus size={13} /> Add line item
              </button>
            </div>

            {/* Drawing Intelligence */}
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", marginBottom: 6 }}>
                Drawing Intelligence
              </h2>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                AI analyses your drawing and matches supplier capabilities. Choose your secrecy level.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {([
                  { id: "FULL", label: "Full drawing", desc: "All dimensions shared with AI only — never with suppliers", color: "#0070f3" },
                  { id: "MASKED", label: "Masked drawing", desc: "Sensitive dimensions removed. ~75-85% match accuracy.", color: "#7c3aed" },
                  { id: "CONTOUR_ONLY", label: "Contour sketch only", desc: "Shape + text description. Zero proprietary data leaves org.", color: "#16a34a" },
                ] as const).map(opt => (
                  <label key={opt.id} onClick={() => setDrawingLevel(opt.id)}
                    style={{ display: "flex", gap: 10, padding: 14, borderRadius: 8, cursor: "pointer",
                      border: `2px solid ${drawingLevel === opt.id ? opt.color : "#e2e8f0"}`,
                      background: drawingLevel === opt.id ? `${opt.color}08` : "white",
                      transition: "all 0.15s ease" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${opt.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      {drawingLevel === opt.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: opt.color }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div style={{ border: "2px dashed #e2e8f0", borderRadius: 10, padding: "28px 20px",
                textAlign: "center", cursor: "pointer", background: "#f8fafc" }}>
                <Upload size={24} style={{ color: "#94a3b8", margin: "0 auto 8px" }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Upload drawing</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>PDF · STEP · DWG · Sketch image</div>
                {drawingLevel === "CONTOUR_ONLY" && (
                  <div style={{ marginTop: 10, padding: 10, background: "#f0fdf4", borderRadius: 6, textAlign: "left" }}>
                    <div style={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>
                      <Lock size={10} style={{ display: "inline", marginRight: 4 }} />
                      Maximum secrecy — only shape geometry is processed
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Suppliers to invite */}
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", marginBottom: 14 }}>
                Invite Suppliers
              </h2>
              {["Kristinehamn Mekaniska AB — Sweden", "PrecyzjaPlus Sp. z o.o. — Poland", "MachTech s.r.o. — Czech Republic"].map(s => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
                  fontSize: 13, color: "#475569", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: "#0c2340" }} />
                  {s}
                </label>
              ))}
              <button style={{ marginTop: 8, fontSize: 13, color: "#0070f3", background: "none",
                border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}>
                + Add supplier from Discovery
              </button>
            </div>

            <button onClick={() => setShowResults(true)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "13px", background: "#0c2340", color: "white", border: "none",
                borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              <Send size={16} /> Send RFQ to 3 suppliers
            </button>
          </div>

          {/* Right: settings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0c2340", marginBottom: 14 }}>RFQ Settings</h3>
              {[
                { label: "Currency", type: "select", opts: ["EUR", "SEK", "NOK", "USD", "GBP", "PLN"] },
                { label: "Response deadline", type: "date" },
              ].map(({ label, type, opts }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 5 }}>{label}</div>
                  {type === "select" ? (
                    <select style={{ width: "100%", padding: "7px 10px", border: "1px solid #e2e8f0",
                      borderRadius: 7, fontSize: 13, outline: "none", background: "white" }}>
                      {opts!.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type="date" style={{ width: "100%", padding: "7px 10px", border: "1px solid #e2e8f0",
                      borderRadius: 7, fontSize: 13, outline: "none", color: "#0f172a" }} />
                  )}
                </div>
              ))}
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "#0c2340" }} />
                Require NDA before viewing spec
              </label>
            </div>
          </div>
        </div>
      ) : (
        /* TCA comparison results */
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
            padding: "12px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10 }}>
            <CheckCircle size={16} style={{ color: "#16a34a" }} />
            <span style={{ fontSize: 14, color: "#166534", fontWeight: 500 }}>
              RFQ sent to 3 suppliers · 3 responses received · AI analysis complete
            </span>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0c2340", marginBottom: 16 }}>
            TCA Comparison — AI Analysis
          </h2>

          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#0c2340", color: "white" }}>
                  {["Rank", "Supplier", "Country", "List Price", "Freight", "Inspection", "Storage", "TCA/unit", "AI Score"].map(h => (
                    <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontWeight: 600, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockTcaComparison.map((s, i) => (
                  <tr key={s.supplierId} style={{ borderBottom: "1px solid #f1f5f9",
                    background: i === 0 ? "#f0fdf4" : "white" }}>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%",
                        background: i === 0 ? "#16a34a" : "#f1f5f9",
                        color: i === 0 ? "white" : "#64748b",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: "#0f172a" }}>{s.name}</td>
                    <td style={{ padding: "12px 14px", color: "#64748b" }}>{COUNTRY_NAMES[s.country]}</td>
                    <td style={{ padding: "12px 14px" }}>{s.listPrice} {s.currency}</td>
                    <td style={{ padding: "12px 14px", color: "#64748b" }}>+{s.freight}</td>
                    <td style={{ padding: "12px 14px", color: "#64748b" }}>+{s.inspection}</td>
                    <td style={{ padding: "12px 14px", color: "#64748b" }}>+{s.storage}</td>
                    <td style={{ padding: "12px 14px", fontWeight: 700 }}>
                      {s.tcaSek ?? s.tca} SEK
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: getScoreColor(s.score) }}>{s.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: 18, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>🤖 AI Insight</div>
            <p style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.6, margin: 0 }}>
              Despite a 18% lower list price, PrecyzjaPlus TCA is virtually identical to Kristinehamn Mekaniska (889 vs 891 SEK).
              Recommend Kristinehamn Mekaniska for lower logistical complexity, shorter lead time, and lower geopolitical risk.
              PrecyzjaPlus is an excellent backup option.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
              background: "#0c2340", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              <BarChart3 size={14} /> Export TCA Report (PDF)
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
              background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              Export to Excel
            </button>
            <button onClick={() => setShowResults(false)}
              style={{ padding: "9px 16px", background: "#f8fafc", color: "#475569",
                border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
              New RFQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

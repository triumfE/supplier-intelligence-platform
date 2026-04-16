"use client";
import { X, Check, Building2, CreditCard, Zap } from "lucide-react";
import { useAuth } from "@/lib/auth";

const plans = [
  {
    id: "pro" as const,
    name: "Professional",
    price: "$199",
    period: "/month",
    desc: "Full market data for procurement teams",
    features: [
      "All metals, steel & material indices",
      "Energy & electricity per country",
      "Freight tracking — all modes",
      "12-month forecast & signals",
      "Currency & carbon prices",
      "Daily data updates",
      "Export to Excel / PDF",
      "Email alerts on price movements",
    ],
    cta: "Start 14-day free trial",
    popular: true,
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    price: "$499",
    period: "/month",
    desc: "For large procurement organizations",
    features: [
      "Everything in Professional",
      "API access (REST + webhooks)",
      "Custom material tracking",
      "Multi-user team access (up to 25)",
      "Invoice billing to company",
      "Custom dashboards & reports",
      "Dedicated account manager",
      "SSO / SAML integration",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

const payMethods = [
  { icon: CreditCard, label: "Credit / Debit card" },
  { icon: Zap, label: "PayPal" },
  { icon: Building2, label: "Invoice to company" },
];

export default function PricingModal({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();

  return (
    <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }} />

      {/* Modal */}
      <div style={{ position:"relative", background:"white", borderRadius:16, maxWidth:880, width:"90%",
        maxHeight:"90vh", overflow:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.25)" }}>

        <button onClick={onClose} style={{ position:"absolute", top:16, right:16, background:"none",
          border:"none", cursor:"pointer", color:"#94a3b8", padding:4 }}>
          <X size={20} />
        </button>

        <div style={{ padding:"40px 40px 16px", textAlign:"center" }}>
          <h2 style={{ fontSize:28, fontWeight:800, color:"#0c2340", margin:"0 0 8px" }}>
            Unlock Full Market Intelligence
          </h2>
          <p style={{ fontSize:15, color:"#64748b", margin:"0 0 8px", maxWidth:500, marginLeft:"auto", marginRight:"auto" }}>
            Real-time pricing data, forecasts and alerts trusted by procurement teams at leading industrial companies worldwide.
          </p>
          <p style={{ fontSize:13, color:"#94a3b8", margin:0 }}>
            Cancel anytime · 14-day free trial · No credit card required to start
          </p>
        </div>

        {/* Plans */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, padding:"24px 40px" }}>
          {plans.map(p => (
            <div key={p.id} style={{
              border: p.popular ? "2px solid #0070f3" : "1px solid #e2e8f0",
              borderRadius:12, padding:28, position:"relative",
              background: p.popular ? "#f0f9ff" : "white",
            }}>
              {p.popular && (
                <span style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)",
                  background:"#0070f3", color:"white", fontSize:11, fontWeight:700,
                  padding:"3px 14px", borderRadius:999 }}>Most popular</span>
              )}
              <h3 style={{ fontSize:20, fontWeight:800, color:"#0c2340", margin:"0 0 4px" }}>{p.name}</h3>
              <div style={{ display:"flex", alignItems:"baseline", gap:2, marginBottom:4 }}>
                <span style={{ fontSize:36, fontWeight:800, color:"#0f172a" }}>{p.price}</span>
                <span style={{ fontSize:14, color:"#94a3b8" }}>{p.period}</span>
              </div>
              <p style={{ fontSize:13, color:"#64748b", margin:"0 0 20px" }}>{p.desc}</p>

              <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px" }}>
                {p.features.map(f => (
                  <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:8, fontSize:13, color:"#334155" }}>
                    <Check size={14} style={{ color:"#16a34a", flexShrink:0, marginTop:2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { login(p.id); onClose(); }}
                style={{
                  width:"100%", padding:"12px 0", borderRadius:8, border:"none", cursor:"pointer",
                  fontSize:14, fontWeight:700,
                  background: p.popular ? "#0070f3" : "#0c2340",
                  color: "white",
                }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Annual discount */}
        <div style={{ textAlign:"center", padding:"0 40px 16px" }}>
          <span style={{ fontSize:13, color:"#16a34a", fontWeight:600, background:"#f0fdf4",
            padding:"4px 14px", borderRadius:999, border:"1px solid #86efac" }}>
            Save 20% with annual billing
          </span>
        </div>

        {/* Payment methods */}
        <div style={{ borderTop:"1px solid #f1f5f9", padding:"20px 40px", display:"flex",
          justifyContent:"center", gap:24, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, color:"#94a3b8", alignSelf:"center" }}>Payment methods:</span>
          {payMethods.map(m => (
            <div key={m.label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#64748b" }}>
              <m.icon size={14} /> {m.label}
            </div>
          ))}
        </div>

        {/* Enterprise note */}
        <div style={{ background:"#f8fafc", borderTop:"1px solid #f1f5f9", padding:"16px 40px",
          borderRadius:"0 0 16px 16px", textAlign:"center" }}>
          <p style={{ fontSize:12, color:"#64748b", margin:0 }}>
            <strong>Enterprise invoicing:</strong> We can invoice your company directly for easy internal approval.
            Contact <strong>sales@supplierintelligence.io</strong> for custom agreements, volume pricing or multi-year contracts.
          </p>
        </div>
      </div>
    </div>
  );
}

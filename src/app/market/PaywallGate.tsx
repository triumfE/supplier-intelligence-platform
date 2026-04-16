"use client";
import { useState } from "react";
import { Lock, TrendingUp, BarChart2, Zap, Globe2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import PricingModal from "./PricingModal";

const teaserStats = [
  { label: "Commodities tracked", value: "120+" },
  { label: "Countries covered", value: "85" },
  { label: "Data sources", value: "LME · MEPS · Nord Pool · ECB" },
  { label: "Update frequency", value: "Real-time" },
];

const highlights = [
  { icon: BarChart2, title: "11 LME Metals", desc: "Aluminium, Copper, Nickel, Cobalt, Zinc and more — live pricing with full history." },
  { icon: TrendingUp, title: "20+ Steel Types", desc: "Carbon & stainless steel. Hot rolled, cold rolled, galvanised, rebar, wire rod." },
  { icon: Zap, title: "Energy & Carbon", desc: "Electricity per country, TTF gas, EU ETS carbon prices. Critical for cost models." },
  { icon: Globe2, title: "Global Freight", desc: "Container, bulk, RoRo, air and road freight. All major routes and vessel types." },
];

export default function PaywallGate({ children }: { children: React.ReactNode }) {
  const { loggedIn } = useAuth();
  const [showPricing, setShowPricing] = useState(false);

  if (loggedIn) return <>{children}</>;

  return (
    <>
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}

      {/* Blurred preview — show a glimpse of the real content */}
      <div style={{ position:"relative" }}>
        <div style={{ filter:"blur(6px)", pointerEvents:"none", userSelect:"none", maxHeight:400, overflow:"hidden" }}>
          {children}
        </div>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(248,250,252,0) 0%, rgba(248,250,252,0.95) 60%, rgba(248,250,252,1) 100%)" }} />
      </div>

      {/* CTA Section */}
      <div style={{ textAlign:"center", padding:"40px 24px 20px", maxWidth:700, margin:"0 auto" }}>
        <div style={{ width:56, height:56, borderRadius:16, background:"#0c2340",
          display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
          <Lock size={24} style={{ color:"white" }} />
        </div>
        <h2 style={{ fontSize:28, fontWeight:800, color:"#0c2340", margin:"0 0 10px" }}>
          Market Intelligence — Premium Access
        </h2>
        <p style={{ fontSize:16, color:"#64748b", lineHeight:1.7, margin:"0 0 28px" }}>
          Get real-time commodity prices, energy indices, freight rates, forecasts and
          currency data — all in one platform. Trusted by procurement professionals worldwide.
        </p>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))",
          gap:12, marginBottom:32 }}>
          {teaserStats.map(s => (
            <div key={s.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 12px" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#0c2340" }}>{s.value}</div>
              <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
          <button onClick={() => setShowPricing(true)} style={{
            display:"flex", alignItems:"center", gap:8,
            background:"#0070f3", color:"white", padding:"14px 32px", borderRadius:10,
            border:"none", cursor:"pointer", fontSize:15, fontWeight:700,
          }}>
            View pricing & start free trial <ArrowRight size={16} />
          </button>
          <button onClick={() => setShowPricing(true)} style={{
            background:"white", color:"#0c2340", padding:"14px 32px", borderRadius:10,
            border:"1px solid #e2e8f0", cursor:"pointer", fontSize:15, fontWeight:600,
          }}>
            Request a demo
          </button>
        </div>

        {/* Feature highlights */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",
          gap:16, marginBottom:32, textAlign:"left" }}>
          {highlights.map(h => (
            <div key={h.title} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"16px 18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <h.icon size={16} style={{ color:"#0070f3" }} />
                <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{h.title}</span>
              </div>
              <p style={{ fontSize:13, color:"#64748b", lineHeight:1.5, margin:0 }}>{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust / social proof */}
        <p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>
          14-day free trial · No credit card required · Cancel anytime ·
          Invoice billing available for enterprise
        </p>
      </div>
    </>
  );
}

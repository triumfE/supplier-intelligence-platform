"use client";
import { TrendingUp, TrendingDown, Newspaper, BarChart2, Bell, Calendar, ArrowRight, Globe, Factory, Zap } from "lucide-react";

const weeklyHighlights = [
  { icon: TrendingUp, color: "#dc2626", title: "Casting prices in Germany up +7% this quarter", desc: "FEAF pig iron index +3.2%, energy surcharges driving additional margin. German foundries citing 15-20% electricity cost increase.", category: "Pricing" },
  { icon: Factory, color: "#16a34a", title: "5 new suppliers added in Sweden this week", desc: "New CNC shop in Värmland, 2 welding companies in VGR, laser cutting in Halland, and a precision grinding specialist in Örebro.", category: "Suppliers" },
  { icon: BarChart2, color: "#0070f3", title: "Benchmark: CNC hourly rates Q1 vs Q2 2026", desc: "Sweden: 650→680 SEK/hr (+4.6%). Poland: 320→335 SEK/hr (+4.7%). Turkey: 220→225 SEK/hr (+2.3%). Germany: 750→780 SEK/hr (+4.0%).", category: "Benchmark" },
  { icon: Zap, color: "#d97706", title: "Nickel LME breaks $16,000 — impact on stainless steel", desc: "Nickel surged 3.8% this week to $16,200/t. MEPS stainless surcharges expected to rise 2-3% in May. Affects CrNi alloys, propeller grades.", category: "Commodities" },
];

const articles = [
  { date: "Apr 22, 2026", title: "EU CBAM Phase 2: What procurement teams need to know", desc: "Carbon border adjustment mechanism enters reporting phase for steel and aluminium imports. Estimated 3-8% cost impact on Asian sourcing.", category: "Regulation", readTime: "5 min" },
  { date: "Apr 21, 2026", title: "Swedish manufacturing confidence index rises to 58.2", desc: "PMI data shows continued expansion. New orders sub-index at 61.4. Capacity utilization improving across metalworking sector.", category: "Economy", readTime: "3 min" },
  { date: "Apr 20, 2026", title: "Red Sea disruption: container rates stabilize at new normal", desc: "Shanghai-Europe container rates plateau at $2,600/FEU. Cape of Good Hope routing now standard. Add 12-15 days to Asia-Europe transit.", category: "Logistics", readTime: "4 min" },
  { date: "Apr 19, 2026", title: "Duplex 2205 price forecast: stable through H2 2026", desc: "MEPS analysis suggests duplex pricing will remain within ±3% band through year end. Nickel volatility is the main risk factor.", category: "Forecast", readTime: "3 min" },
  { date: "Apr 18, 2026", title: "3 Swedish foundries enter restructuring in Q1 2026", desc: "Ongoing consolidation in Swedish casting industry. Smaller foundries struggling with energy costs and competition from Baltic states.", category: "Industry", readTime: "4 min" },
  { date: "Apr 17, 2026", title: "How AI is changing procurement negotiations", desc: "New tools validate supplier price increases against market data in real-time. Early adopters report 15-25% better outcomes on cost claims.", category: "Technology", readTime: "6 min" },
];

const benchmarks = [
  { metric: "CNC Turning (Sweden)", q1: "650 SEK/hr", q2: "680 SEK/hr", change: "+4.6%", trend: "up" },
  { metric: "CNC 5-Axis (Sweden)", q1: "950 SEK/hr", q2: "980 SEK/hr", change: "+3.2%", trend: "up" },
  { metric: "Welding TIG (Sweden)", q1: "600 SEK/hr", q2: "620 SEK/hr", change: "+3.3%", trend: "up" },
  { metric: "Laser Cutting 6mm CS", q1: "12 SEK/m", q2: "12.5 SEK/m", change: "+4.2%", trend: "up" },
  { metric: "Sand Casting (Sweden)", q1: "28 SEK/kg", q2: "29 SEK/kg", change: "+3.6%", trend: "up" },
  { metric: "CNC Turning (Poland)", q1: "320 SEK/hr", q2: "335 SEK/hr", change: "+4.7%", trend: "up" },
  { metric: "CNC Turning (Turkey)", q1: "220 SEK/hr", q2: "225 SEK/hr", change: "+2.3%", trend: "up" },
  { metric: "Casting (Germany)", q1: "35 EUR/kg", q2: "37.5 EUR/kg", change: "+7.1%", trend: "up" },
];

const catColors: Record<string,string> = { Pricing:"#dc2626", Suppliers:"#16a34a", Benchmark:"#0070f3", Commodities:"#d97706", Regulation:"#7c3aed", Economy:"#0891b2", Logistics:"#92400e", Forecast:"#6366f1", Industry:"#0c2340", Technology:"#16a34a" };

export default function NewsPage() {
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <Newspaper size={22} style={{ color:"#0070f3" }} />
            <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>Industry News & Benchmarks</h1>
          </div>
          <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Weekly pricing trends, supplier updates, market benchmarks and procurement intelligence.</p>
        </div>
        <button style={{ display:"flex", alignItems:"center", gap:6, background:"#0070f3", color:"white", padding:"10px 20px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:700 }}>
          <Bell size={14} /> Subscribe to Weekly Digest
        </button>
      </div>

      {/* This week's highlights */}
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:17, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>This Week&apos;s Highlights</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {weeklyHighlights.map(h => (
            <div key={h.title} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:"18px 20px", cursor:"pointer" }}>
              <div style={{ display:"flex", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${h.color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <h.icon size={18} style={{ color:h.color }} />
                </div>
                <div>
                  <span style={{ fontSize:10, fontWeight:600, color:catColors[h.category], background:`${catColors[h.category]}12`, padding:"2px 8px", borderRadius:4 }}>{h.category}</span>
                  <h3 style={{ fontSize:14, fontWeight:700, color:"#0f172a", margin:"6px 0 4px" }}>{h.title}</h3>
                  <p style={{ fontSize:13, color:"#64748b", lineHeight:1.5, margin:0 }}>{h.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:20 }}>
        {/* Articles */}
        <div>
          <h2 style={{ fontSize:17, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Latest Articles</h2>
          {articles.map(a => (
            <div key={a.title} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"16px 20px", marginBottom:10, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <span style={{ fontSize:10, fontWeight:600, color:catColors[a.category] || "#64748b", background:`${catColors[a.category] || "#64748b"}12`, padding:"2px 8px", borderRadius:4 }}>{a.category}</span>
                <span style={{ fontSize:11, color:"#94a3b8" }}>{a.date} · {a.readTime}</span>
              </div>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#0f172a", margin:"0 0 4px" }}>{a.title}</h3>
              <p style={{ fontSize:13, color:"#64748b", lineHeight:1.5, margin:0 }}>{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Benchmarks */}
        <div>
          <h2 style={{ fontSize:17, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Price Benchmarks Q1→Q2 2026</h2>
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead><tr style={{ background:"#f8fafc" }}>
                <th style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontWeight:600 }}>Metric</th>
                <th style={{ padding:"10px 8px", textAlign:"right", color:"#64748b", fontWeight:600 }}>Q1</th>
                <th style={{ padding:"10px 8px", textAlign:"right", color:"#64748b", fontWeight:600 }}>Q2</th>
                <th style={{ padding:"10px 14px", textAlign:"right", color:"#64748b", fontWeight:600 }}>Δ</th>
              </tr></thead>
              <tbody>{benchmarks.map((b,i) => (
                <tr key={b.metric} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"white":"#fafbfc" }}>
                  <td style={{ padding:"8px 14px", fontWeight:500, color:"#0f172a", fontSize:12 }}>{b.metric}</td>
                  <td style={{ padding:"8px 8px", textAlign:"right", color:"#94a3b8" }}>{b.q1}</td>
                  <td style={{ padding:"8px 8px", textAlign:"right", fontWeight:600 }}>{b.q2}</td>
                  <td style={{ padding:"8px 14px", textAlign:"right" }}>
                    <span style={{ color: b.trend==="up"?"#dc2626":"#16a34a", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:2 }}>
                      {b.trend==="up"?<TrendingUp size={11} />:<TrendingDown size={11} />}{b.change}
                    </span>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>

          {/* Email signup */}
          <div style={{ background:"#0c2340", borderRadius:12, padding:24, marginTop:16, textAlign:"center" }}>
            <Bell size={24} style={{ color:"#60a5fa", marginBottom:8 }} />
            <h3 style={{ color:"white", fontSize:15, fontWeight:700, margin:"0 0 6px" }}>Weekly Procurement Digest</h3>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, margin:"0 0 14px" }}>Price movements, new suppliers, benchmarks — every Monday at 07:00</p>
            <div style={{ display:"flex", gap:6 }}>
              <input placeholder="your@email.com" style={{ flex:1, padding:"8px 12px", borderRadius:6, border:"none", fontSize:13, outline:"none" }} />
              <button style={{ background:"#0070f3", color:"white", padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer", fontSize:12, fontWeight:700 }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

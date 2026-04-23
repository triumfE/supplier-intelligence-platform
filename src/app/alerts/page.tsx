"use client";
import { useState } from "react";
import { Bell, Star, AlertTriangle, Shield, TrendingDown, TrendingUp, Package, Globe, CheckCircle, X, Settings, Filter } from "lucide-react";

const watchlist = [
  { id:1, name:"Bjorneborg Steel AB", status:"active", alerts:2 },
  { id:2, name:"T-Marine (Nantong)", status:"active", alerts:1 },
  { id:3, name:"Promeco OY", status:"active", alerts:0 },
  { id:4, name:"Kaiping Yuanhang", status:"active", alerts:1 },
  { id:5, name:"Hallands Plåt & Laser AB", status:"active", alerts:0 },
  { id:6, name:"SKF Marine GmbH", status:"active", alerts:0 },
  { id:7, name:"Skaraborgs Mekaniska AB", status:"active", alerts:1 },
  { id:8, name:"Osterbergs Industrihandel", status:"paused", alerts:3 },
];

const alertsFeed = [
  { id:1, supplier:"Bjorneborg Steel AB", type:"financial", severity:"medium", title:"Financial score downgrade", desc:"Credit rating changed from A to B+. Revenue declined 8% YoY. Monitor liquidity position.", time:"2h ago", icon:TrendingDown, color:"#d97706" },
  { id:2, supplier:"Bjorneborg Steel AB", type:"price", severity:"info", title:"Price increase request submitted", desc:"Requested +8.5% on duplex castings. AI analysis: 5.2% justified. See Cost Analysis for details.", time:"6h ago", icon:TrendingUp, color:"#0070f3" },
  { id:3, supplier:"T-Marine (Nantong)", type:"certification", severity:"low", title:"New certification: ISO 45001", desc:"Health & Safety certification ISO 45001:2018 obtained. Valid until 2028-02-24.", time:"1d ago", icon:Shield, color:"#16a34a" },
  { id:4, supplier:"Kaiping Yuanhang", type:"geopolitical", severity:"medium", title:"CBAM impact assessment updated", desc:"Estimated carbon border adjustment cost: +4.8% on NiAlBronze imports from 2027. Review TCA.", time:"2d ago", icon:Globe, color:"#d97706" },
  { id:5, supplier:"Skaraborgs Mekaniska AB", type:"capacity", severity:"info", title:"Capacity status changed: Available → Limited", desc:"Moving from 2-shift to full utilization. Lead times extended to 8-12 weeks. Plan orders ahead.", time:"3d ago", icon:Package, color:"#0070f3" },
  { id:6, supplier:"Osterbergs Industrihandel", type:"financial", severity:"high", title:"Financial distress warning", desc:"Payment delays reported by 3 other customers. Cash flow issues suspected. SQ score dropped to 77.7%.", time:"4d ago", icon:AlertTriangle, color:"#dc2626" },
  { id:7, supplier:"Osterbergs Industrihandel", type:"quality", severity:"high", title:"Quality score below threshold", desc:"OTD dropped to 82%. Two late deliveries this month. Corrective action required.", time:"5d ago", icon:AlertTriangle, color:"#dc2626" },
  { id:8, supplier:"Osterbergs Industrihandel", type:"price", severity:"high", title:"Unjustified price increase flagged", desc:"+15% increase requested. AI validates only 3.5%. Consider alternative sourcing.", time:"5d ago", icon:TrendingUp, color:"#dc2626" },
];

const sevColors: Record<string,string> = { high:"#dc2626", medium:"#d97706", low:"#16a34a", info:"#0070f3" };

const alertSettings = [
  { label:"Financial score changes", enabled:true },
  { label:"New certifications", enabled:true },
  { label:"Capacity status changes", enabled:true },
  { label:"Price increase requests", enabled:true },
  { label:"Sanctions / compliance flags", enabled:true },
  { label:"News mentions", enabled:false },
  { label:"Quality score drops", enabled:true },
  { label:"Delivery performance alerts", enabled:true },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState<"all"|"high"|"medium"|"low"|"info">("all");
  const [showSettings, setShowSettings] = useState(false);

  const filtered = alertsFeed.filter(a => filter === "all" || a.severity === filter);

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <Bell size={22} style={{ color:"#0070f3" }} />
            <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>Supplier Alerts</h1>
          </div>
          <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Real-time notifications for your saved suppliers — financial, quality, capacity, certifications and compliance.</p>
        </div>
        <button onClick={()=>setShowSettings(!showSettings)} style={{ display:"flex", alignItems:"center", gap:6, background:"white", color:"#64748b", padding:"8px 16px", borderRadius:8, border:"1px solid #e2e8f0", cursor:"pointer", fontSize:13, fontWeight:600 }}>
          <Settings size={14} /> Alert Settings
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Notification Preferences</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {alertSettings.map(s => (
              <label key={s.label} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:8, background:"#f8fafc", cursor:"pointer", fontSize:13 }}>
                <input type="checkbox" defaultChecked={s.enabled} style={{ accentColor:"#0070f3" }} />
                {s.label}
              </label>
            ))}
          </div>
          <div style={{ marginTop:14, display:"flex", gap:8 }}>
            <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#64748b" }}>
              <input type="checkbox" defaultChecked style={{ accentColor:"#0070f3" }} /> Email notifications
            </label>
            <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#64748b" }}>
              <input type="checkbox" defaultChecked style={{ accentColor:"#0070f3" }} /> Push notifications
            </label>
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:20 }}>
        {/* Watchlist */}
        <div>
          <h2 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 12px" }}>My Watchlist ({watchlist.length})</h2>
          {watchlist.map(w => (
            <div key={w.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"white", border:"1px solid #e2e8f0", borderRadius:8, marginBottom:6, opacity: w.status==="paused" ? 0.5 : 1 }}>
              <Star size={14} style={{ color:"#d97706" }} fill="#d97706" />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#0f172a", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{w.name}</div>
              </div>
              {w.alerts > 0 && (
                <span style={{ fontSize:11, fontWeight:700, color:"white", background:"#dc2626", borderRadius:999, width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center" }}>{w.alerts}</span>
              )}
            </div>
          ))}
          <button style={{ width:"100%", padding:"8px", borderRadius:8, border:"1px dashed #e2e8f0", background:"transparent", cursor:"pointer", fontSize:12, color:"#94a3b8", marginTop:4 }}>
            + Add supplier to watchlist
          </button>
        </div>

        {/* Alert feed */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <h2 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:0 }}>Alert Feed</h2>
            <div style={{ display:"flex", gap:4 }}>
              {(["all","high","medium","info"] as const).map(f => (
                <button key={f} onClick={()=>setFilter(f)} style={{
                  padding:"4px 12px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer",
                  border: filter===f ? "1px solid #0070f3" : "1px solid #e2e8f0",
                  background: filter===f ? "#0070f3" : "white",
                  color: filter===f ? "white" : "#64748b",
                }}>{f === "all" ? "All" : f}</button>
              ))}
            </div>
          </div>

          {filtered.map(a => (
            <div key={a.id} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 18px", marginBottom:8, borderLeft:`4px solid ${sevColors[a.severity]}` }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:36, height:36, borderRadius:8, background:`${a.color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <a.icon size={16} style={{ color:a.color }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{a.supplier}</span>
                    <span style={{ fontSize:10, fontWeight:600, color:sevColors[a.severity], background:`${sevColors[a.severity]}18`, padding:"1px 6px", borderRadius:999 }}>{a.severity}</span>
                    <span style={{ fontSize:10, color:"#94a3b8", background:"#f1f5f9", padding:"1px 6px", borderRadius:4 }}>{a.type}</span>
                    <span style={{ fontSize:11, color:"#94a3b8", marginLeft:"auto" }}>{a.time}</span>
                  </div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#334155", marginBottom:2 }}>{a.title}</div>
                  <div style={{ fontSize:13, color:"#64748b", lineHeight:1.5 }}>{a.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

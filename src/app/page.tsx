"use client";

import Link from "next/link";
import { Search, ArrowRight, TrendingUp, TrendingDown, Factory, Wrench, Zap, Shield, Globe2, Users, Award, BarChart2, Star, ChevronRight, Package, Layers } from "lucide-react";
import { useLang } from "@/lib/lang";

// Live market ticker data
const ticker = [
  { label:"Aluminium LME", value:"$2,680/t", change:"+3.2%", up:true },
  { label:"Copper LME", value:"$10,500/t", change:"+5.1%", up:true },
  { label:"Nickel LME", value:"$15,420/t", change:"-1.8%", up:false },
  { label:"HR Plate EU", value:"€724/t", change:"+2.0%", up:true },
  { label:"EUR/USD", value:"1.08", change:"+0.4%", up:true },
  { label:"TTF Gas", value:"€42/MWh", change:"+6.5%", up:true },
  { label:"El Sweden", value:"€85/MWh", change:"-2.1%", up:false },
  { label:"Cobalt LME", value:"$33,200/t", change:"-4.1%", up:false },
  { label:"Zinc LME", value:"$2,970/t", change:"+1.2%", up:true },
  { label:"EU ETS Carbon", value:"€75/tCO₂", change:"+4.2%", up:true },
  { label:"BDI Freight", value:"1,500", change:"-3.5%", up:false },
  { label:"Tin LME", value:"$40,500/t", change:"+8.3%", up:true },
];

const categories = [
  { icon:Wrench, label:"CNC Machining", count:"2,340", color:"#0070f3", sub:"Turning · Milling · 5-Axis · EDM" },
  { icon:Zap, label:"Welding", count:"1,890", color:"#dc2626", sub:"TIG · MIG/MAG · Robot · Laser" },
  { icon:Layers, label:"Sheet Metal", count:"1,650", color:"#16a34a", sub:"Laser Cutting · Bending · Stamping" },
  { icon:Factory, label:"Casting", count:"890", color:"#d97706", sub:"Sand · Investment · Die · Centrifugal" },
  { icon:Package, label:"Forging", count:"620", color:"#7c3aed", sub:"Open Die · Closed Die · Ring Rolling" },
  { icon:Shield, label:"Surface Treatment", count:"1,120", color:"#0891b2", sub:"Coating · Anodizing · Plating · Blasting" },
];

const stats = [
  { value:"94,000+", label:"Suppliers Indexed" },
  { value:"62", label:"Countries" },
  { value:"850+", label:"Capabilities Tracked" },
  { value:"12,400+", label:"Certifications Verified" },
];

const featuredSuppliers = [
  { name:"Nordic Castings Group AB", location:"Jönköping, Sweden", tags:["Sand Casting","Ductile Iron","DNV Approved"], rating:4.8 },
  { name:"Hallands Plåt & Laser AB", location:"Halmstad, Sweden", tags:["Laser Cutting","Sheet Metal","IATF 16949"], rating:4.6 },
  { name:"Skaraborgs Mekaniska AB", location:"Skövde, Sweden", tags:["5-Axis CNC","Precision","Defence"], rating:4.9 },
];

export default function HomePage() {
  const { t } = useLang();

  return (
    <div style={{ background:"#f8fafc" }}>
      {/* ── LIVE MARKET TICKER ── */}
      <div style={{ background:"#071628", overflow:"hidden", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="animate-ticker" style={{ display:"flex", gap:0, whiteSpace:"nowrap", width:"max-content" }}>
          {[...ticker, ...ticker].map((t, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 24px", borderRight:"1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{t.label}</span>
              <span style={{ fontSize:12, fontWeight:700, color:"white" }}>{t.value}</span>
              <span style={{ fontSize:11, fontWeight:600, color: t.up ? "#4ade80" : "#f87171", display:"flex", alignItems:"center", gap:2 }}>
                {t.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #0c2340 0%, #1a3a5c 30%, #0c2340 60%, #0a1f38 100%)",
        backgroundSize: "400% 400%",
        animation: "heroGradient 15s ease infinite",
        position: "relative", overflow: "hidden", padding: "100px 24px 80px",
      }}>
        {/* Floating data elements */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
          {/* Floating graph lines */}
          <svg className="animate-float" style={{ position:"absolute", top:"10%", left:"5%", opacity:0.08 }} width="200" height="100" viewBox="0 0 200 100">
            <polyline points="0,80 30,60 60,70 90,30 120,45 150,20 180,35 200,10" fill="none" stroke="#60a5fa" strokeWidth="2" />
          </svg>
          <svg className="animate-floatSlow" style={{ position:"absolute", top:"20%", right:"8%", opacity:0.06 }} width="250" height="120" viewBox="0 0 250 120">
            <polyline points="0,100 40,80 80,90 120,40 160,60 200,20 250,30" fill="none" stroke="#4ade80" strokeWidth="2" />
          </svg>
          <svg className="animate-float delay-300" style={{ position:"absolute", bottom:"15%", left:"15%", opacity:0.05 }} width="180" height="80" viewBox="0 0 180 80">
            <polyline points="0,60 30,40 60,50 90,20 120,35 150,10 180,25" fill="none" stroke="#f59e0b" strokeWidth="2" />
          </svg>

          {/* Floating data cards */}
          <div className="animate-float delay-200" style={{ position:"absolute", top:"15%", right:"12%", background:"rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", borderRadius:12, padding:"12px 16px", border:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>Copper LME</div>
            <div style={{ fontSize:16, fontWeight:800, color:"white" }}>$10,500</div>
            <div style={{ fontSize:11, color:"#4ade80" }}>▲ +5.1%</div>
          </div>
          <div className="animate-floatSlow delay-500" style={{ position:"absolute", bottom:"20%", right:"20%", background:"rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", borderRadius:12, padding:"12px 16px", border:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>EU ETS Carbon</div>
            <div style={{ fontSize:16, fontWeight:800, color:"white" }}>€75/t</div>
            <div style={{ fontSize:11, color:"#f59e0b" }}>▲ +4.2%</div>
          </div>
          <div className="animate-float delay-700" style={{ position:"absolute", top:"30%", left:"8%", background:"rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", borderRadius:12, padding:"12px 16px", border:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>HR Plate EU</div>
            <div style={{ fontSize:16, fontWeight:800, color:"white" }}>€724/t</div>
            <div style={{ fontSize:11, color:"#4ade80" }}>▲ +2.0%</div>
          </div>

          {/* Decorative circles */}
          <div className="animate-pulse" style={{ position:"absolute", top:"40%", right:"35%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,112,243,0.08) 0%, transparent 70%)" }} />
          <div className="animate-pulse delay-500" style={{ position:"absolute", bottom:"10%", left:"30%", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)" }} />
        </div>

        {/* Hero content */}
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <div className="animate-fadeInUp" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,112,243,0.15)", border:"1px solid rgba(0,112,243,0.25)", borderRadius:999, padding:"6px 18px", color:"#60a5fa", fontSize:13, fontWeight:500, marginBottom:28 }}>
            <span className="animate-pulse" style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80" }} />
            Live market data · 94,000+ suppliers indexed
          </div>

          <h1 className="animate-fadeInUp delay-100" style={{ color:"white", fontSize:"clamp(36px, 5vw, 58px)", fontWeight:800, lineHeight:1.08, marginBottom:20, letterSpacing:"-0.03em", opacity:0 }}>
            {t("hero.h1a")}<br />
            <span style={{ background:"linear-gradient(135deg, #60a5fa, #4ade80)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              {t("hero.h1b")}
            </span>
          </h1>

          <p className="animate-fadeInUp delay-200" style={{ color:"rgba(255,255,255,0.6)", fontSize:18, lineHeight:1.7, maxWidth:580, margin:"0 auto 36px", opacity:0 }}>
            {t("hero.p")}
          </p>

          {/* Search bar */}
          <div className="animate-fadeInUp delay-300 animate-glow" style={{ display:"flex", gap:0, maxWidth:640, margin:"0 auto 16px", background:"white", borderRadius:14, padding:6, opacity:0 }}>
            <input type="text" placeholder={t("hero.placeholder")} style={{ flex:1, border:"none", outline:"none", padding:"12px 16px", fontSize:15, background:"transparent", color:"#0f172a" }} />
            <Link href="/suppliers" style={{ display:"flex", alignItems:"center", gap:8, background:"#0070f3", color:"white", padding:"12px 24px", borderRadius:10, textDecoration:"none", fontSize:15, fontWeight:700, whiteSpace:"nowrap" }}>
              <Search size={18} /> {t("hero.search")}
            </Link>
          </div>

          <p className="animate-fadeInUp delay-500" style={{ color:"rgba(255,255,255,0.35)", fontSize:12, opacity:0 }}>
            {t("hero.hint")}
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background:"white", borderBottom:"1px solid #e2e8f0", padding:"24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:24, textAlign:"center" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="animate-fadeInUp" style={{ opacity:0, animationDelay:`${i*0.1+0.3}s` }}>
              <div style={{ fontSize:28, fontWeight:800, color:"#0c2340" }}>{s.value}</div>
              <div style={{ fontSize:13, color:"#94a3b8", marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BROWSE BY CATEGORY ── */}
      <section style={{ padding:"72px 24px 60px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h2 style={{ fontSize:32, fontWeight:800, color:"#0c2340", marginBottom:10 }}>Browse by Capability</h2>
          <p style={{ color:"#64748b", fontSize:16, maxWidth:500, margin:"0 auto" }}>
            Find suppliers by manufacturing process. From CNC machining to casting — all verified and rated.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16 }}>
          {categories.map((c, i) => (
            <Link key={c.label} href={`/suppliers?capability=${encodeURIComponent(c.label)}`} style={{ textDecoration:"none" }}>
              <div className="card animate-fadeInUp" style={{ padding:28, cursor:"pointer", opacity:0, animationDelay:`${i*0.1}s` }}>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:`${c.color}10`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <c.icon size={24} style={{ color:c.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize:17, fontWeight:700, color:"#0f172a", margin:0 }}>{c.label}</h3>
                    <span style={{ fontSize:13, color:"#94a3b8" }}>{c.count} suppliers</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:"#64748b", margin:"0 0 14px" }}>{c.sub}</p>
                <div style={{ display:"flex", alignItems:"center", gap:4, color:c.color, fontSize:13, fontWeight:600 }}>
                  Browse suppliers <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED SUPPLIERS ── */}
      <section style={{ background:"white", padding:"60px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
            <div>
              <h2 style={{ fontSize:28, fontWeight:800, color:"#0c2340", margin:"0 0 6px" }}>Featured Suppliers</h2>
              <p style={{ fontSize:15, color:"#64748b", margin:0 }}>Verified and rated by the procurement community</p>
            </div>
            <Link href="/suppliers" style={{ display:"flex", alignItems:"center", gap:6, color:"#0070f3", textDecoration:"none", fontSize:14, fontWeight:600 }}>
              View all <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16 }}>
            {featuredSuppliers.map(s => (
              <Link key={s.name} href={`/suppliers/${s.name.toLowerCase().replace(/\s+/g,"-").replace(/[åä]/g,"a").replace(/ö/g,"o")}`} style={{ textDecoration:"none" }}>
                <div className="card" style={{ padding:24, cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:10 }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} style={{ color: i <= Math.floor(s.rating) ? "#f59e0b" : "#e2e8f0" }} fill={i <= Math.floor(s.rating) ? "#f59e0b" : "none"} />)}
                    <span style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginLeft:4 }}>{s.rating}</span>
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:"#0f172a", margin:"0 0 4px" }}>{s.name}</h3>
                  <p style={{ fontSize:13, color:"#94a3b8", margin:"0 0 12px" }}>{s.location}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{ fontSize:11, color:"#475569", background:"#f1f5f9", padding:"3px 8px", borderRadius:6 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET INTELLIGENCE PREVIEW ── */}
      <section style={{ padding:"60px 24px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <h2 style={{ fontSize:28, fontWeight:800, color:"#0c2340", margin:"0 0 6px" }}>Live Market Intelligence</h2>
          <p style={{ fontSize:15, color:"#64748b" }}>Real-time commodity prices, energy costs and currency rates — updated daily</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12 }}>
          {ticker.slice(0,8).map(t => (
            <div key={t.label} className="card" style={{ padding:18, textAlign:"center" }}>
              <div style={{ fontSize:12, color:"#94a3b8", marginBottom:4 }}>{t.label}</div>
              <div style={{ fontSize:20, fontWeight:800, color:"#0f172a" }}>{t.value}</div>
              <div style={{ fontSize:12, fontWeight:600, color: t.up ? "#16a34a" : "#dc2626", display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginTop:4 }}>
                {t.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{t.change}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:20 }}>
          <Link href="/market" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"#0070f3", textDecoration:"none", fontSize:14, fontWeight:600 }}>
            View full market data <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:"linear-gradient(135deg, #0c2340, #1a3a5c)", padding:"80px 24px", textAlign:"center" }}>
        <h2 style={{ color:"white", fontSize:32, fontWeight:800, marginBottom:12 }}>
          Start finding better suppliers today
        </h2>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:16, marginBottom:36, maxWidth:500, margin:"0 auto 36px" }}>
          Free for procurement teams. Enterprise plans for advanced sourcing control.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/suppliers" style={{ background:"#0070f3", color:"white", padding:"14px 32px", borderRadius:10, textDecoration:"none", fontWeight:700, fontSize:15 }}>
            Search Suppliers
          </Link>
          <Link href="/news" style={{ background:"rgba(255,255,255,0.1)", color:"white", padding:"14px 32px", borderRadius:10, textDecoration:"none", fontWeight:600, fontSize:15, border:"1px solid rgba(255,255,255,0.2)" }}>
            Read Industry News
          </Link>
        </div>
      </section>
    </div>
  );
}

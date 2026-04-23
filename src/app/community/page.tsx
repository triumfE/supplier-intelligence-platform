"use client";
import { useState } from "react";
import { MessageCircle, ThumbsUp, Eye, Clock, Search, Plus, Filter, TrendingUp, Star, Shield, ChevronRight, User } from "lucide-react";

type Category = "all"|"sourcing"|"reviews"|"pricing"|"quality"|"logistics"|"general";

const categories: {id:Category,label:string,color:string}[] = [
  {id:"all",label:"All Topics",color:"#0070f3"},
  {id:"sourcing",label:"Sourcing Help",color:"#16a34a"},
  {id:"reviews",label:"Supplier Reviews",color:"#d97706"},
  {id:"pricing",label:"Pricing & Benchmarks",color:"#7c3aed"},
  {id:"quality",label:"Quality Issues",color:"#dc2626"},
  {id:"logistics",label:"Logistics",color:"#0891b2"},
  {id:"general",label:"General",color:"#64748b"},
];

const threads = [
  { id:1, cat:"sourcing", title:"Looking for CNC 5-axis supplier in Turkey — anyone with experience?", author:"Anonymous Buyer", role:"Procurement Manager, Automotive OEM", time:"2h ago", replies:12, views:340, likes:8, pinned:true,
    preview:"We need a supplier for complex aluminium housings, 5-axis required. Tolerances ±0.02mm. Series of 500 pcs/month. Budget around €45-55/pc. Anyone worked with Turkish CNC shops?",
    tags:["CNC","Turkey","Aluminium","5-axis"] },
  { id:2, cat:"reviews", title:"⭐ Review: Bjorneborg Steel AB — Duplex castings", author:"Anonymous", role:"Supply Chain Lead, Marine", time:"5h ago", replies:4, views:189, likes:15, pinned:false,
    preview:"We've been sourcing duplex castings from Bjorneborg for 3 years. Quality: 9/10. Delivery: 7/10 (sometimes 2-3 weeks late on large orders). Communication: 8/10. Price: competitive for Scandinavian market but 15-20% above Eastern European alternatives. Would recommend for critical marine applications where quality traceability matters.",
    tags:["Casting","Duplex","Sweden","Review"], rating:4 },
  { id:3, cat:"pricing", title:"Casting prices in Germany up +7% this quarter — anyone else seeing this?", author:"Anonymous", role:"Category Manager, Industrial", time:"1d ago", replies:23, views:780, likes:31, pinned:false,
    preview:"Our German casting suppliers have all pushed through 6-8% increases citing energy costs and raw material surcharges. FEAF index only shows +3.2% for pig iron EU. Are they padding margins? What are others experiencing?",
    tags:["Casting","Germany","Price Increase","Benchmarking"] },
  { id:4, cat:"sourcing", title:"Laser cutting large format (3m x 1.5m) — Nordic suppliers?", author:"Anonymous Buyer", role:"Project Engineer", time:"1d ago", replies:8, views:220, likes:5, pinned:false,
    preview:"Need large format laser cutting in 8mm and 12mm carbon steel. Volumes: ~200 sheets/month. Located in southern Sweden, prefer supplier within 300km. Halland, Småland, Skåne area.",
    tags:["Laser Cutting","Sweden","Sheet Metal","Large Format"] },
  { id:5, cat:"quality", title:"How do you handle supplier quality when they refuse PPAP?", author:"Anonymous", role:"SQE, Aerospace", time:"2d ago", replies:17, views:450, likes:22, pinned:false,
    preview:"We have a critical casting supplier in Poland who delivers good quality but categorically refuses to do PPAP documentation. They say 'we do our own QC'. How have others handled this? Switch supplier or find a compromise?",
    tags:["Quality","PPAP","Casting","Poland"] },
  { id:6, cat:"reviews", title:"⭐ Review: Kaiping Yuanhang Propeller Manufacturing (China)", author:"Anonymous", role:"Procurement Director, Marine", time:"3d ago", replies:6, views:320, likes:11, pinned:false,
    preview:"Used them for NiAlBronze propeller castings. Quality: 10/10 — zero defects in 2 years. Price: 30-40% below European alternatives. Delivery: 8/10 (ocean freight adds 6 weeks). Communication: requires patience but responsive on WeChat. Risk: CBAM will add ~5% from 2027.",
    tags:["Propeller","China","NiAlBronze","Review"], rating:5 },
  { id:7, cat:"pricing", title:"Benchmark request: CNC turning prices SEK/hour — Sweden 2026", author:"Anonymous", role:"Buyer", time:"3d ago", replies:34, views:1200, likes:45, pinned:false,
    preview:"What hourly rates are you paying for standard CNC turning in Sweden right now? We're paying 650 SEK/hr for simple turning and 850 SEK/hr for multi-axis. Are we in line with market? Looking for benchmarks.",
    tags:["CNC","Pricing","Sweden","Benchmark"] },
  { id:8, cat:"logistics", title:"Red Sea situation — how are you handling container delays from Asia?", author:"Anonymous", role:"Supply Chain Manager", time:"4d ago", replies:19, views:560, likes:14, pinned:false,
    preview:"Our containers from China are now taking 45-50 days instead of 30-35 via Suez. Extra cost ~$800/TEU. How are others adapting? Air freight for critical? Buffer stock increase? Nearshoring?",
    tags:["Logistics","Shipping","China","Supply Chain"] },
];

const stats = [
  { label:"Active Members", value:"2,840" },
  { label:"Discussions", value:"1,245" },
  { label:"Supplier Reviews", value:"387" },
  { label:"This Week", value:"+43 posts" },
];

export default function CommunityPage() {
  const [cat, setCat] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);

  const filtered = threads.filter(t => {
    if (cat !== "all" && t.cat !== cat) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.preview.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <MessageCircle size={22} style={{ color:"#0070f3" }} />
            <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>Community</h1>
          </div>
          <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Procurement forum — sourcing help, anonymous supplier reviews, pricing benchmarks and industry discussions.</p>
        </div>
        <button onClick={()=>setShowNew(!showNew)} style={{ display:"flex", alignItems:"center", gap:6, background:"#0070f3", color:"white", padding:"10px 20px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:700 }}>
          <Plus size={14} /> New Discussion
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px", textAlign:"center" }}>
            <div style={{ fontSize:22, fontWeight:800, color:"#0c2340" }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#94a3b8" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* New post form */}
      {showNew && (
        <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Start a Discussion</h3>
          <input placeholder="Title — e.g. 'Looking for CNC supplier in Poland'" style={{ width:"100%", padding:"10px 14px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:14, marginBottom:10, outline:"none" }} />
          <textarea placeholder="Describe what you're looking for, your requirements, or share your experience..." rows={4} style={{ width:"100%", padding:"10px 14px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:14, marginBottom:10, resize:"vertical", outline:"none" }} />
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <select style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:13, cursor:"pointer" }}>
              {categories.filter(c=>c.id!=="all").map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <div style={{ flex:1 }} />
            <span style={{ fontSize:12, color:"#94a3b8" }}>Posts are anonymous by default</span>
            <button style={{ background:"#0070f3", color:"white", padding:"8px 20px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:600 }}>Post</button>
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:16 }}>
        {/* Sidebar — categories */}
        <div style={{ width:200, flexShrink:0 }}>
          {categories.map(c => (
            <button key={c.id} onClick={()=>setCat(c.id)} style={{
              display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 12px", marginBottom:4,
              borderRadius:8, border:"none", cursor:"pointer", textAlign:"left", fontSize:13,
              background: cat===c.id ? "#f0f9ff" : "transparent",
              color: cat===c.id ? "#0070f3" : "#64748b",
              fontWeight: cat===c.id ? 600 : 400,
            }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:c.color }} />
              {c.label}
            </button>
          ))}
        </div>

        {/* Thread list */}
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", gap:8, marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, background:"white", border:"1px solid #e2e8f0", borderRadius:8, padding:"6px 12px", flex:1 }}>
              <Search size={14} style={{ color:"#94a3b8" }} />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search discussions..." style={{ border:"none", outline:"none", background:"transparent", fontSize:13, flex:1 }} />
            </div>
          </div>

          {filtered.map(t => (
            <div key={t.id} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"16px 20px", marginBottom:10, cursor:"pointer" }}>
              <div style={{ display:"flex", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <User size={18} style={{ color:"#94a3b8" }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    {t.pinned && <span style={{ fontSize:10, fontWeight:700, color:"#0070f3", background:"#f0f9ff", padding:"1px 6px", borderRadius:4 }}>PINNED</span>}
                    <span style={{ fontSize:15, fontWeight:700, color:"#0f172a" }}>{t.title}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginBottom:6 }}>
                    {t.author} · {t.role} · {t.time}
                  </div>
                  {(t as {rating?:number}).rating && (
                    <div style={{ display:"flex", gap:2, marginBottom:6 }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} style={{ color: i <= ((t as {rating?:number}).rating ?? 0) ? "#f59e0b" : "#e2e8f0" }} fill={i <= ((t as {rating?:number}).rating ?? 0) ? "#f59e0b" : "none"} />)}
                    </div>
                  )}
                  <p style={{ fontSize:13, color:"#64748b", lineHeight:1.6, margin:"0 0 8px" }}>{t.preview.slice(0,200)}...</p>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                    {t.tags.map(tag => <span key={tag} style={{ fontSize:11, color:"#475569", background:"#f1f5f9", padding:"2px 8px", borderRadius:4 }}>{tag}</span>)}
                  </div>
                  <div style={{ display:"flex", gap:16, fontSize:12, color:"#94a3b8" }}>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}><MessageCircle size={12} /> {t.replies} replies</span>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}><Eye size={12} /> {t.views} views</span>
                    <span style={{ display:"flex", alignItems:"center", gap:4 }}><ThumbsUp size={12} /> {t.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { bronzeData, ironIndexData } from "./data";

const bronzeS = [
  { key:"niAlBronze", label:"NiAlBronze CuAl10Ni5Fe5", color:"#b45309" },
  { key:"cuNi30",     label:"CuNi 70/30",              color:"#0070f3" },
  { key:"tinBronze",  label:"Tin Bronze CuSn12",       color:"#7c3aed" },
  { key:"cuAl",       label:"Aluminium Bronze CuAl10", color:"#16a34a" },
];
const ironS = [
  { key:"castEU",  label:"Cast Iron Europa",  color:"#0c2340" },
  { key:"pigEU",   label:"Pig Iron Europa",   color:"#0070f3" },
  { key:"scrapEU", label:"Steel Scrap Europa",color:"#16a34a" },
  { key:"castCN",  label:"Cast Iron Kina",    color:"#dc2626", dash:"5 3" },
  { key:"pigCN",   label:"Pig Iron Kina",     color:"#f59e0b", dash:"5 3" },
];

function Kpi({data,series}:{data:Record<string,string|number|undefined>[],series:{key:string,label:string,color:string}[]}) {
  const l=data[data.length-1]; const p=data[data.length-2];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10, marginBottom:20 }}>
      {series.map(s=>{
        const c=l[s.key] as number; const pr=p[s.key] as number;
        const pct=pr?((c-pr)/pr*100).toFixed(1):"–";
        return (
          <div key={s.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />
              <span style={{ fontSize:11, color:"#64748b", lineHeight:1.3 }}>{s.label}</span>
            </div>
            <div style={{ fontSize:20, fontWeight:800, color:"#0f172a" }}>{c?.toLocaleString()}</div>
            <div style={{ fontSize:10, color:"#94a3b8" }}>EUR/tonne</div>
            <div style={{ fontSize:11, fontWeight:600, color:Number(pct)>=0?"#d97706":"#16a34a", marginTop:2 }}>
              {Number(pct)>=0?"+":""}{pct}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Chart({title,sub,data,series,height=260}:{title:string,sub:string,data:Record<string,string|number|undefined>[],series:{key:string,label:string,color:string,dash?:string}[],height?:number}) {
  return (
    <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>{title}</h3>
      <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 14px" }}>{sub}</p>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top:4, right:16, bottom:4, left:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
          <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={50} />
          <Tooltip formatter={(v,n)=>[`${Number(v).toLocaleString()} EUR/t`,n]} />
          <Legend wrapperStyle={{ fontSize:11 }} />
          {series.map(s=><Line key={s.key} type="monotone" dataKey={s.key} name={s.label}
            stroke={s.color} dot={false} strokeWidth={2} strokeDasharray={s.dash} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function MaterialTab() {
  return (
    <div>
      <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8, padding:"10px 16px", marginBottom:20, fontSize:13, color:"#92400e" }}>
        <strong>Källor:</strong> FEAF, CAEF, LME. Priser i EUR/tonne. Bronze-priser baserade på LME-koppar + legeringstillägg.
      </div>

      <h2 style={{ fontSize:17, fontWeight:800, color:"#0c2340", margin:"0 0 14px" }}>Bronze &amp; Koppar-legeringar</h2>
      <Kpi data={bronzeData} series={bronzeS} />
      <Chart title="Bronze Index (EUR/tonne)" sub="NiAlBronze = standard för marina propellrar. CuNi30 för sjövattenssystem." data={bronzeData} series={bronzeS} />

      <h2 style={{ fontSize:17, fontWeight:800, color:"#0c2340", margin:"24px 0 14px" }}>Iron &amp; Raw Material Index</h2>
      <Kpi data={ironIndexData} series={ironS} />
      <Chart title="Iron Index — Europa vs Kina (EUR/tonne)" sub="FEAF & CAEF. Cast iron, pig iron, steel scrap." data={ironIndexData} series={ironS} />
    </div>
  );
}

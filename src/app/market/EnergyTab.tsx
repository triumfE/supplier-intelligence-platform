"use client";
import { useState } from "react";
import { ComposedChart, Area, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { energyData, elCountryData } from "./data";

const regions: Record<string,{key:string,label:string,color:string}[]> = {
  "Norden":     [{ key:"no",label:"Norge",color:"#0070f3" },{ key:"se",label:"Sverige",color:"#fbbf24" },{ key:"fi",label:"Finland",color:"#16a34a" },{ key:"uk",label:"UK",color:"#7c3aed" }],
  "Europa":     [{ key:"de",label:"Tyskland",color:"#0c2340" },{ key:"fr",label:"Frankrike",color:"#dc2626" },{ key:"uk",label:"UK",color:"#7c3aed" }],
  "Asien":      [{ key:"jp",label:"Japan",color:"#b45309" },{ key:"kr",label:"Sydkorea",color:"#6366f1" },{ key:"cn",label:"Kina",color:"#dc2626" }],
  "Övriga":     [{ key:"us",label:"USA",color:"#0070f3" },{ key:"au",label:"Australien",color:"#16a34a" }],
};
const allC = Object.values(regions).flat().filter((c,i,a)=>a.findIndex(x=>x.key===c.key)===i);
const latE = energyData[energyData.length-1]; const prvE = energyData[energyData.length-2];

export default function EnergyTab() {
  const [region, setRegion] = useState("Norden");
  const series = regions[region];

  return (
    <div>
      {/* OMIE + TTF KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12, marginBottom:20 }}>
        {([{k:"omie",l:"OMIE El-index"},{k:"ttf",l:"TTF Gas Index"}] as const).map(e=>{
          const c=latE[e.k] as number; const p=prvE[e.k] as number;
          const pct=((c-p)/p*100).toFixed(1);
          return (
            <div key={e.k} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
              <div style={{ fontSize:12, color:"#64748b", marginBottom:4 }}>{e.l}</div>
              <div style={{ fontSize:24, fontWeight:800, color:"#0f172a" }}>{c}</div>
              <div style={{ fontSize:11, color:"#94a3b8" }}>EUR/MWh · {latE.m as string}</div>
              <div style={{ fontSize:12, fontWeight:600, color:Number(pct)>=0?"#dc2626":"#16a34a", marginTop:4 }}>
                {Number(pct)>=0?"+":""}{pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Combined OMIE + TTF */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>Power Supply — OMIE El &amp; TTF Gas (EUR/MWh)</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 14px" }}>Källa: FEAF. Energikrisen 2022 synlig som topp.</p>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={energyData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={42} />
            <Tooltip formatter={(v,n)=>[`${v} EUR/MWh`,n]} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            <Area type="monotone" dataKey="omie" name="OMIE El" fill="#eff6ff" stroke="#0070f3" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ttf" name="TTF Gas" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Electricity by country — region selector */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8, marginBottom:16 }}>
          <div>
            <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>El-pris per land (EUR/MWh)</h3>
            <p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>Nord Pool · Trading Economics</p>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {Object.keys(regions).map(r=>(
              <button key={r} onClick={()=>setRegion(r)} style={{
                padding:"6px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer",
                border: region===r?"1px solid #0070f3":"1px solid #e2e8f0",
                background: region===r?"#0070f3":"white",
                color: region===r?"white":"#64748b",
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* Country KPI */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:8, marginBottom:16 }}>
          {series.map(c=>{
            const l = elCountryData[elCountryData.length-1]; const p = elCountryData[elCountryData.length-2];
            const cv=l[c.key] as number; const pv=p[c.key] as number;
            return (
              <div key={c.key} style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, padding:"8px 12px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:2 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:c.color }} />
                  <span style={{ fontSize:11, color:"#64748b" }}>{c.label}</span>
                </div>
                <span style={{ fontSize:17, fontWeight:800, color:"#0f172a" }}>{cv}</span>
                <span style={{ fontSize:10, color:"#94a3b8", marginLeft:4 }}>EUR/MWh</span>
                <div style={{ fontSize:11, fontWeight:600, color:cv>pv?"#dc2626":"#16a34a" }}>
                  {cv>pv?"▲":"▼"} {(((cv-pv)/pv)*100).toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={elCountryData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={40} />
            <Tooltip formatter={(v,n)=>[`${v} EUR/MWh`,n]} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            {series.map(c=><Line key={c.key} type="monotone" dataKey={c.key} name={c.label} stroke={c.color} dot={false} strokeWidth={2} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

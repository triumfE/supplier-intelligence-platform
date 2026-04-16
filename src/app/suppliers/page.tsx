"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, SlidersHorizontal, MapPin, Users, Star, Zap,
  Shield, ChevronDown, X, Globe, CheckCircle, AlertTriangle
} from "lucide-react";
import { mockSuppliers } from "@/lib/mock-data";
import { getScoreColor, getCapacityColor, getCapacityLabel, COUNTRY_NAMES } from "@/lib/utils";

const PROCESSES = ["CNC 5-axis", "CNC Turning", "CNC Milling", "Grinding", "MIG/MAG Welding", "TIG Welding", "Casting", "Fabrication", "Assembly", "Injection Moulding"];
const MATERIALS = ["Duplex", "316L Stainless", "Carbon Steel", "Aluminium", "Bronze", "Titanium", "HDPE", "Cast Iron"];
const CERTIFICATIONS = ["ISO 9001:2015", "DNV-GL", "Bureau Veritas", "ISO 14001", "AQAP 2120", "AS9100D", "ISO 13485", "ISO 3834"];
const INDUSTRIES = ["Marine", "Offshore", "Defence/Naval", "Energy", "Automotive", "Aerospace", "Industrial", "MedTech"];
const COUNTRIES = ["SE", "NO", "FI", "DK", "DE", "PL", "CZ", "NL", "GB", "FR", "IT", "ES", "IN", "CN", "VN"];

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#dbeafe",
      color: "#1e40af", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>
      {label}
      <button onClick={onRemove} style={{ border: "none", background: "none", cursor: "pointer",
        display: "flex", alignItems: "center", color: "#1e40af", padding: 0 }}>
        <X size={11} />
      </button>
    </span>
  );
}

function SupplierCard({ supplier }: { supplier: typeof mockSuppliers[0] }) {
  const load = supplier.capacity?.currentLoad ?? 50;
  const capColor = getCapacityColor(load);
  const capLabel = getCapacityLabel(load);
  const scoreColor = getScoreColor(supplier.matchScore);

  return (
    <Link href={`/suppliers/${supplier.id}`} style={{ textDecoration: "none" }}>
      <div className="card" style={{ padding: 24, cursor: "pointer" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            {/* Logo placeholder */}
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#0c2340",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: 13 }}>
                {supplier.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </span>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  {supplier.name}
                </h3>
                {supplier.isHyperlocal && (
                  <span className="badge badge-blue" style={{ fontSize: 10 }}>Hyperlocal</span>
                )}
                {supplier.navalCertified && (
                  <span className="badge badge-navy" style={{ fontSize: 10 }}>
                    <Shield size={9} /> Naval
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748b", fontSize: 13, marginTop: 3 }}>
                <MapPin size={12} />
                {supplier.city}, {COUNTRY_NAMES[supplier.country] ?? supplier.country}
                <span style={{ color: "#cbd5e1", margin: "0 4px" }}>·</span>
                <Users size={12} />
                {supplier.employees} employees
              </div>
            </div>
          </div>

          {/* Match score */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
              {supplier.matchScore}
            </div>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>MATCH</div>
          </div>
        </div>

        {/* Capabilities */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {supplier.capabilities.processes.slice(0, 4).map(p => (
            <span key={p} className="badge badge-gray">{p}</span>
          ))}
          {supplier.capabilities.materials.slice(0, 3).map(m => (
            <span key={m} style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 999,
              fontSize: 12, background: "#f0fdf4", color: "#166534", fontWeight: 500 }}>{m}</span>
          ))}
        </div>

        {/* Metrics row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14,
          padding: "12px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
          {/* Financial */}
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 3 }}>FINANCIAL</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                {supplier.financial.creditRating}
              </span>
              <span className={`badge ${supplier.financial.riskClass === "LOW" ? "badge-green" : supplier.financial.riskClass === "MEDIUM" ? "badge-yellow" : "badge-red"}`}
                style={{ fontSize: 10 }}>
                {supplier.financial.riskClass}
              </span>
            </div>
          </div>

          {/* QA */}
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 3 }}>DELIVERY</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <CheckCircle size={14} style={{ color: "#16a34a" }} />
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                {supplier.qa.deliveryPrecision}%
              </span>
            </div>
          </div>

          {/* Capacity */}
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 3 }}>CAPACITY</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: capColor }}>{capLabel}</span>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{load}%</span>
              </div>
              <div className="score-bar">
                <div className="score-bar-fill" style={{ width: `${load}%`, background: capColor }} />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {supplier.certifications.map(c => (
            <span key={c.name} style={{ display: "flex", alignItems: "center", gap: 3,
              fontSize: 11, color: c.verified ? "#166534" : "#64748b",
              background: c.verified ? "#f0fdf4" : "#f8fafc",
              padding: "2px 7px", borderRadius: 4 }}>
              {c.verified && <CheckCircle size={9} />}
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function SuppliersPage() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    processes: [], materials: [], certifications: [], industries: [], countries: [],
  });

  const toggleFilter = (group: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter(v => v !== value)
        : [...prev[group], value],
    }));
  };

  const removeFilter = (group: string, value: string) => toggleFilter(group, value);

  const allActive = Object.values(activeFilters).flat();

  const filtered = mockSuppliers.filter(s => {
    if (query) {
      const q = query.toLowerCase();
      const matches = s.name.toLowerCase().includes(q) ||
        s.city?.toLowerCase().includes(q) ||
        s.capabilities.processes.some(p => p.toLowerCase().includes(q)) ||
        s.capabilities.materials.some(m => m.toLowerCase().includes(q)) ||
        s.capabilities.industries.some(i => i.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (activeFilters.processes.length > 0 &&
      !activeFilters.processes.some(p => s.capabilities.processes.includes(p))) return false;
    if (activeFilters.materials.length > 0 &&
      !activeFilters.materials.some(m => s.capabilities.materials.includes(m))) return false;
    if (activeFilters.countries.length > 0 &&
      !activeFilters.countries.includes(s.country)) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>

      {/* Sidebar Filters */}
      {showFilters && (
        <aside style={{ width: 260, flexShrink: 0, background: "white", borderRight: "1px solid #e2e8f0",
          overflowY: "auto", padding: "20px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0c2340", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Filters
          </div>

          {/* Level 1: Process */}
          <FilterGroup title="Process" items={PROCESSES} group="processes"
            active={activeFilters.processes} onToggle={toggleFilter} />
          <FilterGroup title="Material" items={MATERIALS} group="materials"
            active={activeFilters.materials} onToggle={toggleFilter} />
          <FilterGroup title="Certification" items={CERTIFICATIONS} group="certifications"
            active={activeFilters.certifications} onToggle={toggleFilter} />
          <FilterGroup title="Industry" items={INDUSTRIES} group="industries"
            active={activeFilters.industries} onToggle={toggleFilter} />
          <FilterGroup title="Country" items={COUNTRIES} group="countries"
            active={activeFilters.countries} onToggle={toggleFilter}
            renderLabel={c => COUNTRY_NAMES[c] ?? c} />

          {/* Level 4: Financial */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 8,
              textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Financial Risk
            </div>
            {["LOW", "MEDIUM", "HIGH"].map(r => (
              <label key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer", fontSize: 13, color: "#475569" }}>
                <input type="checkbox" style={{ accentColor: "#0c2340" }} />
                <span className={`badge ${r === "LOW" ? "badge-green" : r === "MEDIUM" ? "badge-yellow" : "badge-red"}`} style={{ fontSize: 11 }}>{r}</span>
              </label>
            ))}
          </div>

          {/* Naval only */}
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#475569", marginBottom: 20 }}>
            <input type="checkbox" style={{ accentColor: "#0c2340" }} />
            <Shield size={13} style={{ color: "#0c2340" }} />
            Naval/Defence certified only
          </label>

          {/* Hyperlocal */}
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#475569" }}>
            <input type="checkbox" style={{ accentColor: "#0070f3" }} />
            <Globe size={13} style={{ color: "#0070f3" }} />
            Include hyperlocal suppliers
          </label>
        </aside>
      )}

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>
        {/* Search + toolbar */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", gap: 0, background: "white", border: "1px solid #e2e8f0",
            borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <Search size={16} style={{ margin: "12px 12px 12px 14px", color: "#94a3b8", flexShrink: 0 }} />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder='Describe your need: "duplex CNC, marine certified, Scandinavia, 200 pcs/month"'
              style={{ flex: 1, border: "none", outline: "none", padding: "12px 0", fontSize: 14, color: "#0f172a", background: "transparent" }} />
            {query && (
              <button onClick={() => setQuery("")} style={{ border: "none", background: "none", padding: "0 12px", cursor: "pointer", color: "#94a3b8" }}>
                <X size={15} />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px",
              background: showFilters ? "#0c2340" : "white", color: showFilters ? "white" : "#475569",
              border: "1px solid #e2e8f0", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
            <SlidersHorizontal size={15} />
            Filters {allActive.length > 0 && `(${allActive.length})`}
          </button>
        </div>

        {/* Active filter chips */}
        {allActive.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {Object.entries(activeFilters).flatMap(([group, values]) =>
              values.map(v => (
                <FilterChip key={`${group}-${v}`} label={v} onRemove={() => removeFilter(group, v)} />
              ))
            )}
            <button onClick={() => setActiveFilters({ processes: [], materials: [], certifications: [], industries: [], countries: [] })}
              style={{ fontSize: 12, color: "#64748b", border: "none", background: "none", cursor: "pointer", padding: "3px 8px" }}>
              Clear all
            </button>
          </div>
        )}

        {/* Results header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: "#64748b" }}>
            <strong style={{ color: "#0f172a" }}>{filtered.length}</strong> suppliers found
          </div>
          <select style={{ fontSize: 13, padding: "6px 10px", border: "1px solid #e2e8f0",
            borderRadius: 8, color: "#475569", background: "white", outline: "none", cursor: "pointer" }}>
            <option>Sort: Best Match</option>
            <option>Sort: Financial Score</option>
            <option>Sort: Delivery Precision</option>
            <option>Sort: Capacity Available</option>
          </select>
        </div>

        {/* Supplier cards */}
        <div style={{ display: "grid", gap: 16 }}>
          {filtered.map(s => <SupplierCard key={s.id} supplier={s} />)}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
              <Search size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <div style={{ fontSize: 16, fontWeight: 600 }}>No suppliers match your criteria</div>
              <div style={{ fontSize: 14, marginTop: 8 }}>Try adjusting your filters or search terms</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, items, group, active, onToggle, renderLabel }:
  { title: string; items: string[]; group: string; active: string[];
    onToggle: (g: string, v: string) => void; renderLabel?: (v: string) => string }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={() => setOpen(!open)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          width: "100%", border: "none", background: "none", cursor: "pointer", padding: 0,
          fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: open ? 8 : 0 }}>
        {title}
        <ChevronDown size={12} style={{ transform: open ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }} />
      </button>
      {open && items.map(item => (
        <label key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5,
          cursor: "pointer", fontSize: 13, color: active.includes(item) ? "#0c2340" : "#475569", fontWeight: active.includes(item) ? 600 : 400 }}>
          <input type="checkbox" checked={active.includes(item)} onChange={() => onToggle(group, item)}
            style={{ accentColor: "#0c2340" }} />
          {renderLabel ? renderLabel(item) : item}
        </label>
      ))}
    </div>
  );
}

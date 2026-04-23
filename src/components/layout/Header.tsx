"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search, Bell, Globe, ChevronDown, Shield, BarChart3, FileText,
  Zap, Menu, X, TrendingUp, ClipboardCheck, DollarSign, AlertTriangle,
  FolderOpen, Gauge, ChevronRight, Newspaper, MessageSquare
} from "lucide-react";
import { useLang, type Lang } from "@/lib/lang";

const track1 = [
  { href: "/suppliers", label: "Supplier Discovery", icon: Search },
  { href: "/news", label: "News & Benchmarks", icon: Newspaper },
  { href: "/community", label: "Community", icon: MessageSquare },
  { href: "/alerts", label: "Supplier Alerts", icon: Bell },
  { href: "/market", label: "Market Data", icon: TrendingUp },
];

const track2 = [
  { href: "/performance", label: "Supplier Performance", icon: Gauge },
  { href: "/cost-analysis", label: "AI Cost Analysis", icon: DollarSign },
  { href: "/risk", label: "Risk Monitor", icon: AlertTriangle },
  { href: "/documents", label: "Document Hub", icon: FolderOpen },
  { href: "/rfq", label: "RFQ Engine", icon: Zap },
];

const languages: { id: Lang; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "EN" },
  { id: "sv", label: "Svenska", flag: "SV" },
  { id: "de", label: "Deutsch", flag: "DE" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState<1|2|null>(null);
  const { lang, setLang } = useLang();

  const isTrack2 = ["/performance","/cost-analysis","/risk","/documents","/rfq"].some(p => pathname.startsWith(p));
  const activeTrack = isTrack2 ? 2 : 1;

  return (
    <header style={{ background: "#0c2340" }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" style={{ textDecoration: "none" }}>
            <div style={{ background: "#0070f3", borderRadius: 8, width: 34, height: 34 }}
              className="flex items-center justify-center">
              <span style={{ color: "white", fontWeight: 800, fontSize: 15 }}>SI</span>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>SupplierIQ</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, lineHeight: 1.3 }}>PLATFORM</div>
            </div>
          </Link>

          {/* Track switcher + nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Track 1 */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setTrackOpen(trackOpen === 1 ? null : 1)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8,
                  fontSize: 12, fontWeight: activeTrack === 1 ? 700 : 500, cursor: "pointer",
                  color: activeTrack === 1 ? "white" : "rgba(255,255,255,0.5)",
                  background: activeTrack === 1 ? "rgba(0,112,243,0.25)" : "transparent",
                  border: "none",
                }}>
                <Search size={13} /> Supplier Discovery <ChevronDown size={11} />
              </button>
              {trackOpen === 1 && (
                <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, background: "white",
                  borderRadius: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.2)", overflow: "hidden", minWidth: 220, zIndex: 100 }}>
                  <div style={{ padding: "8px 14px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Track 1 — Discovery</span>
                  </div>
                  {track1.map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setTrackOpen(null)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                        textDecoration: "none", color: pathname === item.href ? "#0070f3" : "#334155",
                        fontSize: 13, fontWeight: pathname === item.href ? 600 : 400 }}>
                      <item.icon size={14} style={{ color: "#94a3b8" }} /> {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 4px" }} />

            {/* Track 2 */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setTrackOpen(trackOpen === 2 ? null : 2)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8,
                  fontSize: 12, fontWeight: activeTrack === 2 ? 700 : 500, cursor: "pointer",
                  color: activeTrack === 2 ? "white" : "rgba(255,255,255,0.5)",
                  background: activeTrack === 2 ? "rgba(0,112,243,0.25)" : "transparent",
                  border: "none",
                }}>
                <ClipboardCheck size={13} /> Sourcing & Procurement <ChevronDown size={11} />
              </button>
              {trackOpen === 2 && (
                <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, background: "white",
                  borderRadius: 10, boxShadow: "0 12px 40px rgba(0,0,0,0.2)", overflow: "hidden", minWidth: 240, zIndex: 100 }}>
                  <div style={{ padding: "8px 14px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Track 2 — Procurement</span>
                  </div>
                  {track2.map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setTrackOpen(null)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                        textDecoration: "none", color: pathname.startsWith(item.href.split("?")[0]) ? "#0070f3" : "#334155",
                        fontSize: 13, fontWeight: pathname.startsWith(item.href.split("?")[0]) ? 600 : 400 }}>
                      <item.icon size={14} style={{ color: "#94a3b8" }} /> {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setLangOpen(!langOpen)}
                style={{ color: "rgba(255,255,255,0.6)", padding: "5px 8px", borderRadius: 6,
                  background: langOpen ? "rgba(255,255,255,0.1)" : "transparent",
                  border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                <Globe size={13} /> {languages.find(l => l.id === lang)?.flag} <ChevronDown size={10} />
              </button>
              {langOpen && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4,
                  background: "white", borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  overflow: "hidden", minWidth: 130, zIndex: 100 }}>
                  {languages.map(l => (
                    <button key={l.id} onClick={() => { setLang(l.id); setLangOpen(false); }}
                      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%",
                        padding: "9px 14px", border: "none", cursor: "pointer",
                        background: lang === l.id ? "#f0f9ff" : "white",
                        color: lang === l.id ? "#0070f3" : "#334155",
                        fontSize: 12, fontWeight: lang === l.id ? 600 : 400, textAlign: "left" }}>
                      <span style={{ fontWeight: 700, fontSize: 10, color: "#94a3b8", width: 18 }}>{l.flag}</span>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button style={{ position: "relative", color: "rgba(255,255,255,0.6)", padding: 6,
              borderRadius: 6, background: "transparent", border: "none", cursor: "pointer" }}>
              <Bell size={16} />
              <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6,
                background: "#dc2626", borderRadius: "50%", border: "2px solid #0c2340" }} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 4,
              background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 10px", cursor: "pointer" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0070f3",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 11 }}>TE</div>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 500 }}>Triumf E.</span>
            </div>

            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "white", padding: 6, background: "transparent", border: "none", cursor: "pointer" }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
            <div style={{ padding: "8px 0 4px", fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Discovery</div>
            {track1.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px",
                  color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>
                <item.icon size={14} /> {item.label}
              </Link>
            ))}
            <div style={{ padding: "8px 0 4px", fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginTop: 8 }}>Procurement</div>
            {track2.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px",
                  color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>
                <item.icon size={14} /> {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Close dropdowns on click outside */}
      {(trackOpen || langOpen) && (
        <div onClick={() => { setTrackOpen(null); setLangOpen(false); }}
          style={{ position: "fixed", inset: 0, zIndex: 50 }} />
      )}
    </header>
  );
}

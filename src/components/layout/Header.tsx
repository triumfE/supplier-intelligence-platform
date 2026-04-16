"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search, Bell, Globe, ChevronDown, Shield, BarChart3,
  FileText, Zap, Menu, X, TrendingUp
} from "lucide-react";
import { useLang, type Lang } from "@/lib/lang";

const navItems = [
  { href: "/suppliers", key: "nav.discovery", icon: Search },
  { href: "/resilience", key: "nav.risk", icon: BarChart3 },
  { href: "/market", key: "nav.market", icon: TrendingUp },
  { href: "/documents", key: "nav.docs", icon: FileText },
  { href: "/rfq", key: "nav.rfq", icon: Zap },
  { href: "/suppliers?naval=true", key: "nav.naval", icon: Shield },
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
  const { lang, setLang, t } = useLang();

  return (
    <header style={{ background: "#0c2340", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div style={{ background: "#0070f3", borderRadius: 8, width: 36, height: 36 }}
              className="flex items-center justify-center">
              <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>SI</span>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 15, lineHeight: 1 }}>
                Supplier Intelligence
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, lineHeight: 1.4 }}>
                PLATFORM
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, key, icon: Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href.split("?")[0]));
              return (
                <Link key={href} href={href}
                  style={{
                    color: active ? "white" : "rgba(255,255,255,0.65)",
                    background: active ? "rgba(255,255,255,0.1)" : "transparent",
                    padding: "6px 12px", borderRadius: 8, fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    display: "flex", alignItems: "center", gap: 6,
                    textDecoration: "none",
                  }}>
                  <Icon size={14} />
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setLangOpen(!langOpen)}
                style={{ color: "rgba(255,255,255,0.7)", padding: "6px 10px", borderRadius: 8,
                  background: langOpen ? "rgba(255,255,255,0.1)" : "transparent",
                  border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
                <Globe size={14} />
                {languages.find(l => l.id === lang)?.flag}
                <ChevronDown size={12} />
              </button>
              {langOpen && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4,
                  background: "white", borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  overflow: "hidden", minWidth: 140, zIndex: 100 }}>
                  {languages.map(l => (
                    <button key={l.id}
                      onClick={() => { setLang(l.id); setLangOpen(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8, width: "100%",
                        padding: "10px 14px", border: "none", cursor: "pointer",
                        background: lang === l.id ? "#f0f9ff" : "white",
                        color: lang === l.id ? "#0070f3" : "#334155",
                        fontSize: 13, fontWeight: lang === l.id ? 600 : 400,
                        textAlign: "left",
                      }}>
                      <span style={{ fontWeight: 700, fontSize: 11, color: "#94a3b8", width: 20 }}>{l.flag}</span>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button style={{ position: "relative", color: "rgba(255,255,255,0.7)", padding: 8,
              borderRadius: 8, background: "transparent", border: "none", cursor: "pointer" }}>
              <Bell size={18} />
              <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8,
                background: "#dc2626", borderRadius: "50%", border: "2px solid #0c2340" }} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 4,
              background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0070f3",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 12 }}>TE</div>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>Triumf E.</span>
              <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
            </div>

            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "white", padding: 8, background: "transparent", border: "none", cursor: "pointer" }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
            {navItems.map(({ href, key, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px",
                  color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14 }}>
                <Icon size={16} />{t(key)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

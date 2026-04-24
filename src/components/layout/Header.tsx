"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Bell, Globe, ChevronDown, Menu, X, TrendingUp, Newspaper, MessageSquare } from "lucide-react";
import { useLang, type Lang } from "@/lib/lang";

const navItems = [
  { href: "/suppliers", label: "Discovery", icon: Search },
  { href: "/news", label: "News & Benchmarks", icon: Newspaper },
  { href: "/community", label: "Community", icon: MessageSquare },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/market", label: "Market Data", icon: TrendingUp },
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
  const { lang, setLang } = useLang();

  return (
    <header style={{ background: "#0c2340" }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3 shrink-0" style={{ textDecoration: "none" }}>
            <div style={{ background: "#0070f3", borderRadius: 8, width: 34, height: 34 }} className="flex items-center justify-center">
              <span style={{ color: "white", fontWeight: 800, fontSize: 15 }}>SI</span>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>SupplierIQ</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, lineHeight: 1.3 }}>PLATFORM</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href.split("?")[0]);
              return (
                <Link key={href} href={href} style={{
                  color: active ? "white" : "rgba(255,255,255,0.55)", background: active ? "rgba(255,255,255,0.1)" : "transparent",
                  padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: active ? 600 : 400,
                  display: "flex", alignItems: "center", gap: 6, textDecoration: "none",
                }}>
                  <Icon size={14} /> {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div style={{ position: "relative" }}>
              <button onClick={() => setLangOpen(!langOpen)} style={{ color: "rgba(255,255,255,0.6)", padding: "5px 8px", borderRadius: 6, background: langOpen ? "rgba(255,255,255,0.1)" : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                <Globe size={13} /> {languages.find(l => l.id === lang)?.flag} <ChevronDown size={10} />
              </button>
              {langOpen && (
                <>
                  <div onClick={() => setLangOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 50 }} />
                  <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, background: "white", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", overflow: "hidden", minWidth: 120, zIndex: 100 }}>
                    {languages.map(l => (
                      <button key={l.id} onClick={() => { setLang(l.id); setLangOpen(false); }} style={{ display: "block", width: "100%", padding: "9px 14px", border: "none", cursor: "pointer", background: lang === l.id ? "#f0f9ff" : "white", color: lang === l.id ? "#0070f3" : "#334155", fontSize: 12, fontWeight: lang === l.id ? 600 : 400, textAlign: "left" }}>
                        {l.flag} {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 4, background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 10px", cursor: "pointer" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0070f3", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 11 }}>TE</div>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 500 }}>Triumf E.</span>
            </div>

            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "white", padding: 6, background: "transparent", border: "none", cursor: "pointer" }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 13 }}>
                <Icon size={14} /> {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

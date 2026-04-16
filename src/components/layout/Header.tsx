"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search, Bell, Globe, ChevronDown, Shield, BarChart3,
  FileText, Zap, Users, Menu, X
} from "lucide-react";

const navItems = [
  { href: "/suppliers", label: "Discovery", icon: Search },
  { href: "/resilience", label: "Risk & Resilience", icon: BarChart3 },
  { href: "/documents", label: "Document Hub", icon: FileText },
  { href: "/rfq", label: "RFQ Engine", icon: Zap },
  { href: "/suppliers?naval=true", label: "Naval & Defence", icon: Shield },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  return (
    <header style={{ background: "#0c2340", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href.split("?")[0]));
              return (
                <Link key={href} href={href}
                  style={{
                    color: active ? "white" : "rgba(255,255,255,0.65)",
                    background: active ? "rgba(255,255,255,0.1)" : "transparent",
                    padding: "6px 12px", borderRadius: 8, fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.15s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = "white"; }}
                  onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <button style={{ color: "rgba(255,255,255,0.7)", padding: "6px 10px", borderRadius: 8,
              background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
              <Globe size={14} />
              {lang}
              <ChevronDown size={12} />
            </button>

            {/* Notifications */}
            <button style={{ position: "relative", color: "rgba(255,255,255,0.7)", padding: 8,
              borderRadius: 8, background: "transparent", border: "none", cursor: "pointer" }}>
              <Bell size={18} />
              <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8,
                background: "#dc2626", borderRadius: "50%", border: "2px solid #0c2340" }} />
            </button>

            {/* User */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 4,
              background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0070f3",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 12 }}>
                TE
              </div>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>
                Triumf E.
              </span>
              <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
            </div>

            {/* Mobile menu toggle */}
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "white", padding: 8, background: "transparent", border: "none", cursor: "pointer" }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 4px",
                  color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14 }}>
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

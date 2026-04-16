"use client";

import Link from "next/link";
import { Search, BarChart3, FileText, Zap, Shield, ArrowRight, Globe2, TrendingUp } from "lucide-react";
import { useLang } from "@/lib/lang";

const stats = [
  { key: "stat.suppliers", value: "94,000+" },
  { key: "stat.countries", value: "62" },
  { key: "stat.industries", value: "18" },
  { key: "stat.docs", value: "12,400+" },
];

const features = [
  { icon: Search,     titleKey: "feat.discovery",  descKey: "feat.discovery.d",  href: "/suppliers",             color: "#0070f3" },
  { icon: BarChart3,  titleKey: "feat.risk",       descKey: "feat.risk.d",       href: "/resilience",            color: "#d97706" },
  { icon: FileText,   titleKey: "feat.docs",       descKey: "feat.docs.d",       href: "/documents",             color: "#16a34a" },
  { icon: Zap,        titleKey: "feat.rfq",        descKey: "feat.rfq.d",        href: "/rfq",                   color: "#7c3aed" },
  { icon: Shield,     titleKey: "feat.naval",      descKey: "feat.naval.d",      href: "/suppliers?naval=true",  color: "#0c2340" },
  { icon: TrendingUp, titleKey: "feat.market",     descKey: "feat.market.d",     href: "/market",                color: "#0891b2" },
  { icon: Globe2,     titleKey: "feat.hyperlocal", descKey: "feat.hyperlocal.d", href: "/suppliers?hyperlocal=true", color: "#0891b2" },
];

export default function HomePage() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,112,243,0.2)",
            border: "1px solid rgba(0,112,243,0.3)", borderRadius: 999, padding: "6px 16px",
            color: "#60a5fa", fontSize: 13, fontWeight: 500, marginBottom: 24 }}>
            <TrendingUp size={14} />
            {t("hero.badge")}
          </div>

          <h1 style={{ color: "white", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800,
            lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" }}>
            {t("hero.h1a")}<br />
            <span style={{ color: "#60a5fa" }}>{t("hero.h1b")}</span> {t("hero.h1c")}
          </h1>

          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, lineHeight: 1.7,
            maxWidth: 620, margin: "0 auto 40px" }}>
            {t("hero.p")}
          </p>

          <div style={{ display: "flex", gap: 0, maxWidth: 640, margin: "0 auto 16px",
            background: "white", borderRadius: 12, padding: 6, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <input type="text" placeholder={t("hero.placeholder")}
              style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px",
                fontSize: 14, background: "transparent", color: "#0f172a" }} />
            <Link href="/suppliers" style={{ display: "flex", alignItems: "center", gap: 8,
              background: "#0c2340", color: "white", padding: "10px 20px", borderRadius: 8,
              textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              <Search size={16} />
              {t("hero.search")}
            </Link>
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
            {t("hero.hint")}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "20px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, textAlign: "center" }}>
          {stats.map(s => (
            <div key={s.key}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0c2340" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{t(s.key)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section style={{ padding: "72px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#0c2340", marginBottom: 12 }}>
            {t("feat.title")}
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, maxWidth: 540, margin: "0 auto" }}>
            {t("feat.sub")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {features.map(({ icon: Icon, titleKey, descKey, href, color }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="card" style={{ padding: 28, height: "100%", cursor: "pointer" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                  {t(titleKey)}
                </h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
                  {t(descKey)}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, color, fontSize: 13, fontWeight: 600 }}>
                  {t("feat.explore")} <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0c2340", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "white", fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
          {t("cta.h")}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginBottom: 32 }}>
          {t("cta.p")}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/suppliers" style={{ background: "#0070f3", color: "white", padding: "12px 28px",
            borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
            {t("cta.search")}
          </Link>
          <Link href="/documents" style={{ background: "rgba(255,255,255,0.1)", color: "white",
            padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 15,
            border: "1px solid rgba(255,255,255,0.2)" }}>
            {t("cta.nda")}
          </Link>
        </div>
      </section>
    </div>
  );
}

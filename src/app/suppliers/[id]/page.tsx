import { notFound } from "next/navigation";
import { getSupplierBySlug, getAllSlugs } from "@/lib/supplier-data";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Globe, Users, Calendar, Award, Wrench, Factory,
  Shield, Package, Clock, MessageCircle, Star, ChevronRight,
  CheckCircle, Mail, ArrowRight
} from "lucide-react";

export async function generateStaticParams() {
  return getAllSlugs().map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = getSupplierBySlug(id);
  if (!s) return { title: "Supplier Not Found" };
  return {
    title: s.meta.title,
    description: s.meta.description,
    keywords: s.meta.keywords,
    openGraph: { title: s.meta.title, description: s.meta.description, type: "website", siteName: "SupplierIQ" },
    alternates: { canonical: `https://supplieriq.com/suppliers/${s.slug}` },
  };
}

function Badge({ children, color = "#0070f3" }: { children: React.ReactNode; color?: string }) {
  return <span style={{ fontSize: 12, fontWeight: 600, color, background: `${color}12`, padding: "3px 10px", borderRadius: 6, display: "inline-block", margin: "0 6px 6px 0" }}>{children}</span>;
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Factory; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Icon size={16} style={{ color: "#0070f3" }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0c2340", margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default async function SupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = getSupplierBySlug(id);
  if (!s) notFound();

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Organization",
    name: s.name, url: s.website ? `https://${s.website}` : undefined,
    foundingDate: s.founded?.toString(),
    address: { "@type": "PostalAddress", addressLocality: s.hq.city, addressCountry: s.hq.country, addressRegion: s.hq.region },
    description: s.description,
    numberOfEmployees: { "@type": "QuantitativeValue", value: s.employees },
    knowsAbout: s.capabilities,
    hasCredential: s.certifications?.map(c => ({ "@type": "EducationalOccupationalCredential", name: c })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
          <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={12} />
          <Link href="/suppliers" style={{ color: "#94a3b8", textDecoration: "none" }}>Suppliers</Link>
          <ChevronRight size={12} />
          <span style={{ color: "#0f172a", fontWeight: 500 }}>{s.name}</span>
        </nav>

        {/* Header card */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: "32px 36px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0c2340", margin: "0 0 8px" }}>{s.name}</h1>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 14, color: "#64748b", marginBottom: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MapPin size={14} /> {s.hq.city}, {s.hq.country}</span>
                {s.founded && <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={14} /> Est. {s.founded}</span>}
                {s.employees && <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Users size={14} /> {s.employees} employees</span>}
                {s.revenue && <span>Revenue: {s.revenue}</span>}
              </div>
              <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.7, margin: "0 0 16px", maxWidth: 700 }}>{s.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap" }}>{s.categories.map(c => <Badge key={c}>{c}</Badge>)}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#0070f3", color: "white", padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                <Mail size={16} /> Request Quote
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: "#0c2340", padding: "12px 24px", borderRadius: 10, border: "1px solid #e2e8f0", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                <Star size={16} /> Save Supplier
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          {/* Left */}
          <div>
            <Section title="Capabilities & Processes" icon={Wrench}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>{s.capabilities.map(c => <Badge key={c} color="#16a34a">{c}</Badge>)}</div>
            </Section>
            <Section title="Materials" icon={Package}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>{s.materials.map(m => <Badge key={m} color="#7c3aed">{m}</Badge>)}</div>
            </Section>
            <Section title="Industries Served" icon={Factory}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>{s.industries.map(i => <Badge key={i} color="#d97706">{i}</Badge>)}</div>
            </Section>
            {s.equipment && (
              <Section title="Key Equipment" icon={Wrench}>
                <ul style={{ margin: 0, paddingLeft: 20 }}>{s.equipment.map(e => <li key={e} style={{ fontSize: 14, color: "#334155", marginBottom: 4 }}>{e}</li>)}</ul>
              </Section>
            )}
            <Section title="Why This Supplier" icon={Star}>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {s.strengths.map(str => (
                  <li key={str} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, fontSize: 14, color: "#334155" }}>
                    <CheckCircle size={16} style={{ color: "#16a34a", flexShrink: 0, marginTop: 2 }} />{str}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Right */}
          <div>
            <Section title="Certifications" icon={Award}>
              {s.certifications.map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                  <Shield size={14} style={{ color: "#16a34a" }} />
                  <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{c}</span>
                </div>
              ))}
            </Section>
            <Section title="Production Details" icon={Clock}>
              {[{ l: "Capacity", v: s.capacity }, { l: "Lead Time", v: s.leadTime }, { l: "Min Order", v: s.minOrder }].filter(d => d.v).map(d => (
                <div key={d.l} style={{ padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>{d.l}</div>
                  <div style={{ fontSize: 13, color: "#0f172a" }}>{d.v}</div>
                </div>
              ))}
            </Section>
            {s.exportMarkets && (
              <Section title="Export Markets" icon={Globe}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>{s.exportMarkets.map(m => <Badge key={m} color="#0891b2">{m}</Badge>)}</div>
              </Section>
            )}
            {s.languages && (
              <Section title="Languages" icon={MessageCircle}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>{s.languages.map(l => <Badge key={l} color="#64748b">{l}</Badge>)}</div>
              </Section>
            )}
            <div style={{ background: "#0c2340", borderRadius: 12, padding: 24, textAlign: "center" }}>
              <h3 style={{ color: "white", fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>Need a quote?</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "0 0 16px" }}>Send your requirements to {s.name}</p>
              <button style={{ background: "#0070f3", color: "white", padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, width: "100%" }}>
                Request Quote <ArrowRight size={14} style={{ verticalAlign: "middle", marginLeft: 4 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

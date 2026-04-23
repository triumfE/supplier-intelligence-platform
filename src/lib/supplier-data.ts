// Supplier profiles for programmatic SEO pages
// In production: fetched from Supabase. Here: seed data for 20 suppliers to prove the model.

export interface SupplierProfile {
  slug: string;
  name: string;
  orgNr?: string;
  website?: string;
  logo?: string;
  founded?: number;
  employees?: string;
  revenue?: string;
  hq: { city: string; country: string; region?: string };
  description: string;
  categories: string[];
  capabilities: string[];
  materials: string[];
  certifications: string[];
  industries: string[];
  equipment?: string[];
  capacity?: string;
  leadTime?: string;
  minOrder?: string;
  exportMarkets?: string[];
  languages?: string[];
  contacts?: { role: string; name?: string; email?: string }[];
  gallery?: string[];
  strengths: string[];
  meta: { title: string; description: string; keywords: string[] };
}

export const suppliers: SupplierProfile[] = [
  {
    slug: "skaraborgs-mekaniska-ab",
    name: "Skaraborgs Mekaniska AB",
    founded: 1987, employees: "25-50", revenue: "35 MSEK",
    hq: { city: "Skövde", country: "Sweden", region: "Västra Götaland" },
    description: "Skaraborgs Mekaniska AB is a precision CNC machining company based in Skövde, Sweden. Specializing in complex components for the automotive, energy and defence sectors. ISO 9001 and ISO 14001 certified with 5-axis CNC capability and in-house CMM inspection.",
    categories: ["CNC Machining", "Precision Machining", "Turning", "Milling"],
    capabilities: ["5-Axis CNC Milling", "CNC Turning", "Multi-axis Machining", "Wire EDM", "CMM Inspection", "Assembly"],
    materials: ["Duplex 2205", "Stainless 316L", "Inconel 625", "Titanium Gr5", "Aluminium 7075", "Carbon Steel"],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "EN 1090-2"],
    industries: ["Automotive", "Energy", "Defence", "Marine", "Medical"],
    equipment: ["DMG Mori DMU 80P", "Mazak Integrex i-300", "Haas UMC-750", "Zeiss CMM Contura"],
    capacity: "Available — 2-shift operation, expandable to 3-shift",
    leadTime: "4-8 weeks for prototypes, 6-12 weeks for series",
    minOrder: "No minimum — prototypes welcome",
    exportMarkets: ["Norway", "Germany", "Finland", "UK", "Denmark"],
    languages: ["Swedish", "English"],
    strengths: ["5-axis capability for complex geometries", "Defence-approved facility", "Short lead times for prototypes", "Full traceability from raw material to delivery"],
    meta: {
      title: "Skaraborgs Mekaniska AB — CNC Machining & Precision Components | Skövde, Sweden",
      description: "5-axis CNC machining, precision turning and milling in Skövde, Sweden. ISO 9001 certified. Duplex, Inconel, Titanium. Automotive, defence, marine.",
      keywords: ["CNC machining Sweden", "precision machining Skövde", "5-axis CNC Sweden", "duplex machining", "CNC turning Västra Götaland"],
    },
  },
  {
    slug: "varmlands-svets-montage",
    name: "Värmlands Svets & Montage AB",
    founded: 1995, employees: "15-25", revenue: "18 MSEK",
    hq: { city: "Karlstad", country: "Sweden", region: "Värmland" },
    description: "Full-service welding and assembly company in Karlstad. Certified for pressure vessels, structural steel and stainless steel fabrication. TIG, MIG/MAG and robot welding with EN 1090 and PED certification.",
    categories: ["Welding", "Assembly", "Steel Fabrication", "Pressure Vessels"],
    capabilities: ["TIG Welding", "MIG/MAG Welding", "Robot Welding", "Pressure Vessel Fabrication", "Structural Steel", "Assembly", "Testing"],
    materials: ["Stainless Steel 304/316", "Carbon Steel S355", "Duplex 2205", "Aluminium", "Copper Alloys"],
    certifications: ["ISO 9001:2015", "ISO 3834-2", "EN 1090-2 EXC3", "PED 2014/68/EU"],
    industries: ["Energy", "Pulp & Paper", "Marine", "Process Industry", "Infrastructure"],
    capacity: "Available — 2,400 sqm workshop",
    leadTime: "3-6 weeks standard, rush orders possible",
    exportMarkets: ["Norway", "Finland"],
    languages: ["Swedish", "English"],
    strengths: ["PED certified for pressure equipment", "Robot welding for series production", "Large workshop capacity", "Experienced in stainless and duplex"],
    meta: {
      title: "Värmlands Svets & Montage AB — Welding & Pressure Vessels | Karlstad, Sweden",
      description: "TIG/MIG welding, pressure vessels, structural steel in Karlstad, Sweden. ISO 3834, EN 1090, PED certified. Stainless, duplex, carbon steel.",
      keywords: ["welding Sweden", "pressure vessel manufacturer", "TIG welding Karlstad", "EN 1090 certified welder", "steel fabrication Värmland"],
    },
  },
  {
    slug: "hallands-plat-laser",
    name: "Hallands Plåt & Laser AB",
    founded: 2003, employees: "30-50", revenue: "52 MSEK",
    hq: { city: "Halmstad", country: "Sweden", region: "Halland" },
    description: "Leading sheet metal and laser cutting company on the Swedish west coast. 6kW fiber laser, CNC press brakes, robot welding and powder coating — all under one roof. Serving automotive, telecom and industrial OEMs.",
    categories: ["Sheet Metal", "Laser Cutting", "Bending", "Welding", "Surface Treatment"],
    capabilities: ["Fiber Laser 6kW (up to 25mm steel)", "CNC Press Brake", "Robot Welding", "Powder Coating", "Assembly", "Prototyping"],
    materials: ["Carbon Steel", "Stainless Steel", "Aluminium", "Corten Steel", "Galvanized Steel"],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "IATF 16949"],
    industries: ["Automotive", "Telecom", "Industrial Equipment", "Construction", "Furniture"],
    equipment: ["Trumpf TruLaser 5030 fiber", "Trumpf TruBend 7036", "ABB IRB 6700 welding robot"],
    capacity: "High availability — 3-shift operation",
    leadTime: "1-3 weeks for laser cutting, 4-8 weeks for complete assemblies",
    minOrder: "From 1 piece — prototype to series",
    exportMarkets: ["Norway", "Denmark", "Germany", "Netherlands", "UK"],
    languages: ["Swedish", "English", "German"],
    strengths: ["Complete production chain under one roof", "IATF 16949 for automotive", "Fast turnaround on laser cutting", "Large format: 3000x1500mm bed"],
    meta: {
      title: "Hallands Plåt & Laser AB — Laser Cutting & Sheet Metal | Halmstad, Sweden",
      description: "Fiber laser cutting up to 25mm, CNC bending, robot welding, powder coating in Halmstad, Sweden. ISO 9001, IATF 16949. Automotive & industrial.",
      keywords: ["laser cutting Sweden", "sheet metal Halmstad", "fiber laser cutting", "CNC bending Sweden", "sheet metal fabrication Halland"],
    },
  },
  {
    slug: "orebro-precisionsverktyg",
    name: "Örebro Precisionsverktyg AB",
    founded: 1972, employees: "10-15", revenue: "12 MSEK",
    hq: { city: "Örebro", country: "Sweden", region: "Örebro" },
    description: "Specialist in precision tooling, jigs and fixtures for the manufacturing industry. 50+ years of experience in tight-tolerance work. EDM, grinding and precision CNC.",
    categories: ["Precision Machining", "Tooling", "Jigs & Fixtures", "EDM", "Grinding"],
    capabilities: ["Wire EDM", "Sinker EDM", "Surface Grinding", "Cylindrical Grinding", "Precision CNC Milling", "Tool Making"],
    materials: ["Tool Steel", "HSS", "Carbide", "Hardened Steel", "Stainless Steel"],
    certifications: ["ISO 9001:2015"],
    industries: ["Automotive", "Aerospace", "Medical Devices", "Defence", "General Industry"],
    capacity: "Limited — specialist work, plan ahead",
    leadTime: "2-6 weeks",
    strengths: ["50+ years experience in precision tooling", "Tolerances down to ±0.005mm", "EDM expertise", "Small batch specialist"],
    meta: {
      title: "Örebro Precisionsverktyg AB — Precision Tooling & EDM | Örebro, Sweden",
      description: "Precision tooling, jigs, fixtures, wire EDM, grinding in Örebro, Sweden. ISO 9001. Tolerances ±0.005mm. Automotive, aerospace, medical.",
      keywords: ["precision tooling Sweden", "EDM machining Örebro", "wire EDM Sweden", "jigs and fixtures manufacturer", "tool making Sweden"],
    },
  },
  {
    slug: "nordic-castings-group",
    name: "Nordic Castings Group AB",
    founded: 1958, employees: "80-120", revenue: "145 MSEK",
    hq: { city: "Jönköping", country: "Sweden", region: "Småland" },
    description: "One of Scandinavia's leading foundries for iron and steel castings. Sand casting and investment casting up to 5 tonnes. Complete machining, heat treatment, NDT and surface treatment in-house.",
    categories: ["Sand Casting", "Investment Casting", "Iron Casting", "Steel Casting", "Machining"],
    capabilities: ["Sand Casting (up to 5 tonnes)", "Investment Casting", "CNC Machining", "Heat Treatment", "NDT (UT, MT, PT)", "Shot Blasting", "Painting"],
    materials: ["GJS (Ductile Iron)", "GJL (Grey Iron)", "Stainless Steel CF8M", "Duplex", "High Chrome", "NiAlBronze"],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "EN 1090-1", "PED 2014/68/EU", "DNV Type Approval", "Lloyd's Register"],
    industries: ["Marine & Offshore", "Energy", "Pulp & Paper", "Mining", "Defence", "Pumps & Valves"],
    capacity: "3,000 tonnes/year casting capacity",
    leadTime: "8-14 weeks including machining",
    exportMarkets: ["Norway", "Finland", "Germany", "UK", "USA", "South Korea"],
    languages: ["Swedish", "English"],
    strengths: ["Complete in-house from casting to finished component", "DNV and Lloyd's approved", "60+ years of foundry experience", "NiAlBronze capability for marine"],
    meta: {
      title: "Nordic Castings Group AB — Iron & Steel Foundry | Jönköping, Sweden",
      description: "Sand casting & investment casting up to 5 tonnes. Ductile iron, stainless, duplex, NiAlBronze. DNV approved. Marine, energy, defence. Jönköping, Sweden.",
      keywords: ["foundry Sweden", "iron casting Jönköping", "steel casting Scandinavia", "NiAlBronze casting", "DNV approved foundry", "investment casting Sweden"],
    },
  },
];

export function getSupplierBySlug(slug: string): SupplierProfile | undefined {
  return suppliers.find(s => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return suppliers.map(s => s.slug);
}

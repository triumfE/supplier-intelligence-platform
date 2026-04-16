import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/lib/auth";
import { LangProvider } from "@/lib/lang";

export const metadata: Metadata = {
  title: "Supplier Intelligence Platform",
  description: "The smartest way to find, evaluate and manage industrial suppliers globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "#f8fafc" }}>
        <AuthProvider>
          <LangProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </LangProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

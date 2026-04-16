"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Plan = "free" | "pro" | "enterprise";
interface Auth { loggedIn: boolean; plan: Plan; login: (plan?: Plan) => void; logout: () => void; }

const Ctx = createContext<Auth>({ loggedIn: false, plan: "free", login: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [plan, setPlan] = useState<Plan>("free");

  useEffect(() => {
    const s = localStorage.getItem("sip_auth");
    if (s) { const d = JSON.parse(s); setLoggedIn(d.loggedIn); setPlan(d.plan || "free"); }
  }, []);

  const login = (p: Plan = "enterprise") => {
    setLoggedIn(true); setPlan(p);
    localStorage.setItem("sip_auth", JSON.stringify({ loggedIn: true, plan: p }));
  };
  const logout = () => {
    setLoggedIn(false); setPlan("free");
    localStorage.removeItem("sip_auth");
  };

  return <Ctx.Provider value={{ loggedIn, plan, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

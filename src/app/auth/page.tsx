"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import CardNav from "../../components/CardNav";
import logo from "./logo.png";

export default function AuthPage() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-blue-950 text-slate-200 relative">
      {/* Navbar */}
      <header className="relative z-50">
        <CardNav
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </header>

      {/* Push rest of page down (match navbar height) */}
      <div className="pt-20"> 
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        {/* Grid Animation */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(200, 220, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(200, 220, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "grid-move 20s linear infinite",
          }}
        />

        {/* Floating Orbs */}
        <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 to-blue-500/25 blur-3xl animate-pulse" />
        <div
          className="pointer-events-none absolute -right-32 top-32 hidden h-72 w-72 rotate-12 rounded-full bg-gradient-to-tr from-primary/40 via-blue-500/25 to-transparent blur-2xl md:block animate-bounce"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-24 hidden h-48 w-48 -rotate-12 rounded-full bg-gradient-to-bl from-purple-500/25 to-transparent blur-2xl md:block animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        {/* Auth Form Section */}
        <section className="relative flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </section>
      </div>

      {/* Grid Animation Keyframes */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }
      `}</style>
    </main>
  );
}

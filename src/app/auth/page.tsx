"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/logo";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-foreground">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-100/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
      
      {/* Animated grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "grid-move 20s linear infinite",
        }}
      />
      
      {/* Floating orbs with enhanced animations */}
      <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 to-blue-400/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-32 top-32 hidden h-72 w-72 rotate-12 rounded-full bg-gradient-to-tr from-primary/30 via-blue-400/20 to-transparent blur-2xl md:block animate-bounce" style={{animationDuration: '6s'}} />
      <div className="pointer-events-none absolute -left-24 bottom-24 hidden h-48 w-48 -rotate-12 rounded-full bg-gradient-to-bl from-purple-400/20 to-transparent blur-2xl md:block animate-pulse" style={{animationDuration: '4s'}} />

      {/* Enhanced Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 backdrop-blur-sm bg-white/80 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Logo />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-lg blur opacity-75 animate-pulse"></div>
          </div>
          <span className="hidden text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent sm:inline">SkillSage</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="inline-flex h-10 items-center rounded-lg border border-primary/20 bg-white/50 px-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </a>
        </div>
      </nav>

      {/* Auth Form Section */}
      <section className="relative flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </main>
  );
} 
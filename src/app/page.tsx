"use client";
import * as React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
import BlurText from "../components/BlurText";
import Particles from "../components/Particles";
import SplashCursor from "../components/SplashCursor";
import MagicBento from "../components/MagicBento";
import ScrollFloat from "../components/ScrollFloat";

// ✅ Import CardNav and logo
import CardNav from "../components/CardNav";
import logo from "../components/logo.svg";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-foreground relative overflow-hidden">
      {/* 🔹 Particle Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#4B0082", "#3A0050"]}
          particleCount={2500}
          particleSpread={20}
          speed={0.3}
          particleBaseSize={140}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* 🔹 Navigation (replaced old nav with CardNav) */}
      <div className="relative z-20">
        
      </div>

      {/* Hero Section */}
      <section className="relative z-10">
        <SplashCursor />

        {/* Hero Content */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:gap-16 md:pb-20 md:pt-20">
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium shadow-sm">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>AI-powered career pathways</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              <BlurText
                text="Transform your career with"
                delay={220}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-7xl mb-8"
              />
              <span className="bg-gradient-to-r from-[#4E2BF5] to-[#5E3FF7] bg-clip-text text-transparent">
                INTELLIGENT Learning
              </span>
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed sm:text-xl max-w-2xl">
              Discover personalized pathways, master in-demand skills, and
              accelerate your career growth with AI-driven insights and
              industry-aligned training.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/auth"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#4E2BF5] px-8 text-base font-semibold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4E2BF5] to-[#5E3FF7] opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <a
                href="#features"
                className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-white/20 bg-white/10 px-8 text-base font-semibold text-white transition-all hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ScrollFloat */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="relative z-10 text-white"
      >
        <ScrollFloat
          animationDuration={4}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.1}
        >
          SKILL SAGE
        </ScrollFloat>
      </div>

      {/* MagicBento */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
    </main>
  );
}

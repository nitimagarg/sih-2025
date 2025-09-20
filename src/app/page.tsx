
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, ArrowRight, CheckCircle, Star, TrendingUp, Users, BookOpen, Target, Sparkles, Zap, Award, Globe } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
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
            <a href="/auth" className="inline-flex h-10 items-center rounded-lg border border-primary/20 bg-white/50 px-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md backdrop-blur-sm">Sign in</a>
            <a href="/auth" className="group relative inline-flex h-10 items-center overflow-hidden rounded-lg bg-gradient-to-r from-primary to-blue-600 px-4 text-sm font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25">
              <span className="relative z-10 flex items-center gap-2">
                  Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </nav>

        {/* Enhanced Hero Content */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:gap-16 md:pb-20 md:pt-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 to-blue-50/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm shadow-sm">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>AI-powered career pathways</span>
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_theme(colors.green.500)]" />
              </div>
            
            <h1 className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Transform your career with
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                intelligent learning
              </span>
              </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed sm:text-xl max-w-2xl">
              Discover personalized pathways, master in-demand skills, and accelerate your career growth with AI-driven insights and industry-aligned training.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="/auth" className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-600 px-8 text-base font-semibold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/25">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a href="#features" className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-primary/20 bg-white/80 px-8 text-base font-semibold text-slate-700 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg backdrop-blur-sm">
                  Explore Features
                </a>
              </div>
              
            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="group rounded-xl border border-primary/10 bg-white/60 p-6 text-center transition-all hover:-translate-y-2 hover:border-primary/20 hover:bg-white/80 hover:shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
                  <TrendingUp className="h-6 w-6" />
                  10k+
                </div>
                <div className="text-slate-600 text-sm font-medium mt-1">Learning Resources</div>
              </div>
              <div className="group rounded-xl border border-primary/10 bg-white/60 p-6 text-center transition-all hover:-translate-y-2 hover:border-primary/20 hover:bg-white/80 hover:shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
                  <BookOpen className="h-6 w-6" />
                  500+
                </div>
                <div className="text-slate-600 text-sm font-medium mt-1">Skills Mapped</div>
              </div>
              <div className="group rounded-xl border border-primary/10 bg-white/60 p-6 text-center transition-all hover:-translate-y-2 hover:border-primary/20 hover:bg-white/80 hover:shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
                  <Star className="h-6 w-6" />
                    4.9/5
                </div>
                <div className="text-slate-600 text-sm font-medium mt-1">User Rating</div>
                </div>
              </div>
            </div>

          {/* Enhanced Preview Card */}
            <div className="relative">
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-400/20 to-purple-400/20 blur-3xl animate-pulse" />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl transition-all hover:shadow-3xl hover:scale-[1.02]">
              <div className="border-b border-white/20 bg-gradient-to-r from-slate-50/80 to-white/80 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400 shadow-sm" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400 shadow-sm" />
                    <span className="h-3 w-3 rounded-full bg-green-400 shadow-sm" />
                  </div>
                  <span className="font-semibold text-slate-700">SkillSage Dashboard</span>
                  <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    Live
                  </div>
                </div>
              </div>
              
              <div className="grid gap-6 p-6 md:grid-cols-5">
                    <div className="md:col-span-3">
                  <div className="group rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Learning Progress</span>
                      <span className="text-xs text-slate-500">This week</span>
                        </div>
                    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-blue-50/50 to-transparent">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%),_radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.2),transparent_40%)]" />
                      
                      {/* Animated chart elements */}
                          <div className="absolute bottom-4 left-4 right-4 h-px bg-primary/20" />
                      <div className="absolute bottom-8 left-4 right-4 h-px bg-primary/10" />
                      <div className="absolute bottom-12 left-4 right-4 h-px bg-primary/10" />
                      
                      {/* Data bars */}
                      <div className="absolute bottom-4 left-6 h-8 w-2 bg-gradient-to-t from-primary to-primary/60 rounded-t animate-pulse" />
                      <div className="absolute bottom-8 left-16 h-12 w-2 bg-gradient-to-t from-primary to-primary/60 rounded-t animate-pulse" style={{animationDelay: '0.2s'}} />
                      <div className="absolute bottom-12 left-24 h-16 w-2 bg-gradient-to-t from-primary to-primary/60 rounded-t animate-pulse" style={{animationDelay: '0.4s'}} />
                      <div className="absolute bottom-6 left-32 h-10 w-2 bg-gradient-to-t from-primary to-primary/60 rounded-t animate-pulse" style={{animationDelay: '0.6s'}} />
                      <div className="absolute bottom-10 left-40 h-14 w-2 bg-gradient-to-t from-primary to-primary/60 rounded-t animate-pulse" style={{animationDelay: '0.8s'}} />
                      <div className="absolute bottom-4 left-48 h-8 w-2 bg-gradient-to-t from-primary to-primary/60 rounded-t animate-pulse" style={{animationDelay: '1s'}} />
                      <div className="absolute bottom-14 left-56 h-20 w-2 bg-gradient-to-t from-primary to-primary/60 rounded-t animate-pulse" style={{animationDelay: '1.2s'}} />
                        </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-lg border border-slate-200/50 bg-white/40 p-3 transition-all hover:bg-white/60 hover:shadow-md">
                        <div className="text-lg font-bold text-primary">+18%</div>
                        <div className="text-xs text-slate-600">Completion</div>
                          </div>
                      <div className="rounded-lg border border-slate-200/50 bg-white/40 p-3 transition-all hover:bg-white/60 hover:shadow-md">
                        <div className="text-lg font-bold text-primary">8h</div>
                        <div className="text-xs text-slate-600">Study time</div>
                          </div>
                      <div className="rounded-lg border border-slate-200/50 bg-white/40 p-3 transition-all hover:bg-white/60 hover:shadow-md">
                        <div className="text-lg font-bold text-primary">5</div>
                        <div className="text-xs text-slate-600">Milestones</div>
                      </div>
                    </div>
                          </div>
                        </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
                    <div className="mb-3 text-sm font-semibold text-slate-700">Upcoming Tasks</div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border border-slate-200/50 bg-white/40 p-3 transition-all hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-sm">
                        <span className="text-sm text-slate-700">Complete React module</span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Today</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-slate-200/50 bg-white/40 p-3 transition-all hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-sm">
                        <span className="text-sm text-slate-700">Technical interview</span>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">Tomorrow</span>
                        </div>
                      <div className="flex items-center justify-between rounded-lg border border-slate-200/50 bg-white/40 p-3 transition-all hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-sm">
                        <span className="text-sm text-slate-700">Portfolio project</span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">This week</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-slate-200/50 bg-white/60 p-4 backdrop-blur-sm">
                    <div className="mb-3 text-sm font-semibold text-slate-700">Key Features</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/10">AI Pathways</span>
                      <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/10">Skill Tracking</span>
                      <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/10">Job Insights</span>
                      <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/10">Progress</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced glow effects */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-blue-400/20 blur-2xl animate-pulse" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-purple-400/20 to-primary/20 blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
            </div>

            {/* Side decorative elements */}
            <div className="pointer-events-none absolute -right-12 top-1/2 hidden h-32 w-32 -translate-y-1/2 rotate-12 rounded-full bg-gradient-to-tr from-primary/25 to-transparent blur-2xl md:block animate-bounce" style={{animationDuration: '8s'}} />
            <div className="pointer-events-none absolute -left-12 top-1/4 hidden h-24 w-24 -rotate-12 rounded-full bg-gradient-to-bl from-blue-400/20 to-transparent blur-2xl md:block animate-pulse" style={{animationDuration: '6s'}} />
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative border-t bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 to-blue-50/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm mb-6">
              <Zap className="h-4 w-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Everything you need to
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                accelerate your career
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI-powered insights with industry expertise to create the most effective learning experience for your career goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-white/20 bg-white/80 p-8 transition-all hover:-translate-y-2 hover:border-primary/20 hover:bg-white/90 hover:shadow-2xl backdrop-blur-sm">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-400/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-blue-100/50">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">Smart Pathways</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Learning Plans</h3>
                <p className="text-slate-600 leading-relaxed">AI analyzes your profile, goals, and learning style to create customized, step-by-step career pathways that adapt as you grow.</p>
                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Adaptive recommendations
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-2xl border border-white/20 bg-white/80 p-8 transition-all hover:-translate-y-2 hover:border-primary/20 hover:bg-white/90 hover:shadow-2xl backdrop-blur-sm">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-400/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-blue-100/50">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">Real-time Insights</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Track Progress Effortlessly</h3>
                <p className="text-slate-600 leading-relaxed">Visualize your growth with detailed analytics, performance metrics, and actionable insights that guide your learning journey.</p>
                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Visual progress tracking
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-2xl border border-white/20 bg-white/80 p-8 transition-all hover:-translate-y-2 hover:border-primary/20 hover:bg-white/90 hover:shadow-2xl backdrop-blur-sm">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-400/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-blue-100/50">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">Career-Aligned</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Skills Employers Need</h3>
                <p className="text-slate-600 leading-relaxed">Access curated resources mapped to in-demand roles, industry certifications, and real job market requirements.</p>
                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Industry-relevant content
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <a href="/auth" className="group inline-flex h-12 items-center rounded-xl border-2 border-primary/20 bg-white/80 px-8 text-base font-semibold text-slate-700 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg backdrop-blur-sm">
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative border-t bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <Logo />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-lg blur opacity-75"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">SkillSage</span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed max-w-md mb-6">
                Transform your career with AI-powered learning pathways, personalized insights, and industry-aligned skills development.
              </p>
              <div className="flex items-center gap-4">
                <a href="/auth" className="group inline-flex h-10 items-center rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg backdrop-blur-sm">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                  Learn More
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="/auth" className="text-slate-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} SkillSage. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </main>
  );
}

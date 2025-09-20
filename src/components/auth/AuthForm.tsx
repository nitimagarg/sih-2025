"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { signIn, user, loading } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    // Only redirect if we have a user, with a small delay to allow the page to render
    if (!loading && user) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, loading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both your name and email.",
      });
      return;
    }
    signIn("credentials", { callbackUrl: "/dashboard" }, { displayName: name, email });
    toast({ title: "Login Successful", description: "Redirecting you to the dashboard..." });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
      });
    }
  };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600">Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Enhanced glow effect */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-400/20 to-purple-400/20 blur-3xl animate-pulse" />
      
      <Card className="relative w-full max-w-lg border border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center pb-8 pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 to-blue-50/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm shadow-sm mb-6">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Welcome to SkillSage</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_theme(colors.green.500)]" />
          </div>
          
          <CardTitle className="text-3xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-3">
            Start Your Journey
          </CardTitle>
          <CardDescription className="text-slate-600 text-lg">
            Enter your details to access your personalized learning dashboard and begin your career transformation.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Jane Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="h-12 text-base border-primary/20 bg-white/60 backdrop-blur-sm focus:border-primary/40 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="e.g. jane.doe@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="h-12 text-base border-primary/20 bg-white/60 backdrop-blur-sm focus:border-primary/40 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-4 pt-4">
              <Button 
                type="submit" 
                className="group relative w-full h-12 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-600 text-base font-semibold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/25"
                onClick={handleLogin}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 flex items-center gap-3 rounded-xl border-2 border-primary/20 bg-white/80 text-base font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg backdrop-blur-sm" 
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="w-6 h-6" />
                Sign in with Google
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">Privacy Policy</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter as FontSans } from "next/font/google";
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from '@/providers/auth-provider';

export const metadata: Metadata = {
  title: 'SkillSage',
  description: 'An AI-enabled personalized guidance system for vocational pathways.',
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <AuthProvider>
        {children}
        </AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

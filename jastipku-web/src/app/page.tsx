"use client";

import Link from "next/link";
import { ArrowRight, Plane, Globe, Shield, Zap, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans overflow-hidden selection:bg-primary/20">
      
      {/* Background Effects - Gradient Mesh */}
      <div className="absolute top-0 left-0 right-0 h-[600px] gradient-mesh -z-10" />

      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-[22px] font-medium tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            <span>Jastipku</span>
          </div>
          <div className="flex gap-6 items-center text-[15px] font-medium">
            <Link href="/login" className="text-ink/70 hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Content */}
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-soft border border-ink/10 text-primary text-[11px] font-medium tracking-wide uppercase w-fit"
            >
              <Zap className="w-3 h-3" />
              Financial-Grade Logistics
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[56px] leading-[1.03] font-light tracking-[-1.4px]"
            >
              Borderless delivery.<br />
              Absolute trust.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[18px] text-ink/70 max-w-xl leading-[1.4] font-light"
            >
              Connect with verified global travelers. We secure your funds in our financial-grade vault until your items arrive safely at your doorstep.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/explore"
                className="group flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full text-[16px] font-medium hover:bg-primary/90 transition-all shadow-level1"
              >
                Find a route <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="group flex items-center gap-2 px-5 py-3 rounded-full text-[16px] font-medium text-primary hover:bg-surface-soft transition-all border border-transparent hover:border-ink/10"
              >
                Become a traveler <Plane className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Product Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative lg:ml-auto w-full max-w-xl"
          >
            {/* Dark Mockup Container */}
            <div className="relative bg-[#0D253D] border border-white/10 p-6 rounded-[16px] shadow-level2 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-ruby opacity-80" />
              
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] text-white/50 font-medium tracking-wide uppercase">Escrow Vault</div>
                    <div className="text-[14px] text-white font-medium">Secured Payment</div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-teal/20 text-teal text-[10px] font-medium rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  ACTIVE
                </div>
              </div>

              <div className="space-y-3 bg-white rounded-[12px] p-4 shadow-sm">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[6px] bg-surface-soft flex items-center justify-center text-lg border border-ink/5">🇯🇵</div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-ink">Tokyo → Jakarta</div>
                    <div className="text-[13px] text-ink/60">Arriving in 3 days</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-medium text-ink tnum">IDR 4,250,000</div>
                    <div className="text-[11px] text-teal font-medium">Secured</div>
                  </div>
                </div>
                
                <div className="h-px bg-ink/10 my-2" />

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-[6px] bg-surface-soft flex items-center justify-center text-lg border border-ink/5">🇺🇸</div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-ink">New York → Bali</div>
                    <div className="text-[13px] text-ink/60">Boarding now</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-medium text-ink tnum">IDR 2,100,000</div>
                    <div className="text-[11px] text-teal font-medium">Secured</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center text-sm px-1">
                <span className="text-white/60 text-[13px]">Total Funds Secured</span>
                <span className="font-medium text-white text-[15px] tnum">IDR 6,350,000</span>
              </div>

            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

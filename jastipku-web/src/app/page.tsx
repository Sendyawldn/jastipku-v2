"use client";

import Link from "next/link";
import { ArrowRight, Plane, Globe, Shield, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <header className="relative z-10 border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <Globe className="w-6 h-6 text-cyan-400" />
            <span>Jastip<span className="text-cyan-400">ku</span></span>
          </div>
          <div className="flex gap-4 items-center text-sm font-medium">
            <Link href="/login" className="px-5 py-2 text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Content */}
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider w-fit"
            >
              <Zap className="w-3 h-3" />
              Secure Borderless Logistics
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              Borderless Delivery, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Absolute Trust.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Connect with verified global travelers. We secure your funds in an encrypted vault until your items arrive safely at your doorstep.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/explore"
                className="group flex items-center gap-2 bg-slate-50 text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/25"
              >
                Find a Route <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="group flex items-center gap-2 px-8 py-4 rounded-full font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all border border-slate-800"
              >
                Become a Traveler <Plane className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Premium Vault Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative lg:ml-auto w-full max-w-md perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl">
              
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                    <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Escrow Status</div>
                    <div className="text-sm font-bold text-slate-200">Secured Vault</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-full">
                  ACTIVE
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4 group hover:bg-slate-800 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center font-bold text-xl text-slate-300">🇯🇵</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-200">Tokyo to Jakarta</div>
                    <div className="text-xs text-slate-400">Arriving in 3 days</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-4 group hover:bg-slate-800 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center font-bold text-xl text-slate-300">🇺🇸</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-200">New York to Bali</div>
                    <div className="text-xs text-slate-400">Boarding now</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Funds Secured</span>
                  <span className="font-mono font-bold text-cyan-400">IDR 4,250,000</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

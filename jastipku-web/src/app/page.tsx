"use client";

import Link from "next/link";
import { ArrowRight, PlaneTakeoff, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col font-sans">
      <header className="border-b-2 border-black bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase font-display">
            Jastipku <span className="text-[var(--color-highlight)]">///</span>
          </div>
          <div className="flex gap-4 font-mono text-sm uppercase">
            <Link href="/login" className="px-4 py-2 hover:bg-black hover:text-white transition-colors border border-transparent">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 border-2 border-black hover:bg-[var(--color-highlight)] hover:border-[var(--color-highlight)] transition-colors font-bold">
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-12 gap-12">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)] flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
              Manifest // Global Routing System
            </div>
            <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight">
              Trust the <br />
              <span className="text-[var(--color-highlight)]">Delivery.</span>
            </h1>
            <p className="text-lg text-[var(--color-ink-muted)] max-w-md">
              Peer-to-peer purchase assistance. Entrust your items to verified travelers. Clear routing, official manifests, zero ambiguity.
            </p>
            <div className="pt-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-4 font-mono uppercase font-bold hover:bg-[var(--color-highlight)] transition-colors"
              >
                Explore Routes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Luggage Tag Mockup */}
          <motion.div 
            initial={{ rotate: -5, y: 20 }}
            animate={{ rotate: 2, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="relative p-8 bg-white border-2 border-black max-w-sm mx-auto shadow-[8px_8px_0_0_#000]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black bg-[var(--background)] flex items-center justify-center">
               <div className="w-4 h-4 rounded-full bg-black"></div>
            </div>
            <div className="flex justify-between items-start border-b-2 border-dashed border-black pb-4 mb-4 mt-4">
              <div className="font-mono text-sm">TAG NO: 4920-11</div>
              <PlaneTakeoff className="w-6 h-6" />
            </div>
            <div className="flex gap-4 items-end mb-6">
              <div className="flex-1">
                <div className="text-[10px] uppercase font-mono mb-1">Origin</div>
                <div className="text-4xl font-display uppercase">CGK</div>
              </div>
              <div className="pb-1 text-[var(--color-ink-muted)]">➔</div>
              <div className="flex-1 text-right">
                <div className="text-[10px] uppercase font-mono mb-1">Dest</div>
                <div className="text-4xl font-display uppercase">NRT</div>
              </div>
            </div>
            <div className="space-y-2 font-mono text-xs mb-8">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-500">TRAVELER</span>
                <span className="font-bold flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[var(--color-highlight)]"/> VERIFIED</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-500">CAPACITY</span>
                <span className="font-bold">15 KG</span>
              </div>
            </div>
            <div className="bg-[var(--color-highlight)] text-black text-center py-2 font-display uppercase tracking-widest text-sm border border-black">
              Status: Boarding
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

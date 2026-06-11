"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/axios";
import { Plane, Search, ArrowRight } from "lucide-react";

export default function ExploreTrips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get("/trips");
        setTrips(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b-2 border-black bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-black tracking-tighter uppercase font-display">
            Jastipku <span className="text-[var(--color-highlight)]">Explore</span>
          </Link>
          <Link href="/dashboard" className="font-mono text-xs uppercase px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
            My Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-black pb-4 gap-4">
          <div>
            <h1 className="text-4xl font-display uppercase tracking-tight">Available Routes</h1>
            <div className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Live Departure Board</div>
          </div>
          <div className="relative w-full md:w-auto">
             <input type="text" placeholder="SEARCH DESTINATION..." className="w-full md:w-64 border border-black p-3 font-mono text-xs pl-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]" />
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]" />
          </div>
        </div>

        {loading ? (
           <div className="font-mono uppercase animate-pulse">Loading Manifests...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {trips.map(trip => (
               <Link href={`/trips/${trip.id}`} key={trip.id} className="block tag-card hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-transform group">
                 <div className="p-4 border-b border-dashed border-gray-300 flex justify-between items-start">
                   <div>
                     <div className="font-mono text-[10px] uppercase text-gray-500 mb-1">Traveler</div>
                     <div className="font-bold uppercase text-sm font-mono">{trip.traveler.user.name}</div>
                   </div>
                   <Plane className="w-5 h-5 text-[var(--color-ink-muted)] group-hover:text-[var(--color-highlight)] transition-colors" />
                 </div>
                 
                 <div className="p-6">
                   <div className="flex justify-between items-end mb-6">
                      <div className="flex-1">
                        <div className="text-[10px] uppercase font-mono mb-1">From</div>
                        <div className="text-4xl font-display uppercase">{trip.originCity}</div>
                      </div>
                      <div className="pb-1 text-[var(--color-ink-muted)] px-2">➔</div>
                      <div className="flex-1 text-right">
                        <div className="text-[10px] uppercase font-mono mb-1">To</div>
                        <div className="text-4xl font-display uppercase">{trip.destinationCity}</div>
                      </div>
                   </div>
                   
                   <div className="bg-gray-100 p-3 font-mono text-xs space-y-1">
                     <div className="flex justify-between">
                       <span className="text-gray-500 uppercase">Depart</span>
                       <span className="font-bold">{new Date(trip.departureDate).toLocaleDateString()}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-500 uppercase">Return</span>
                       <span className="font-bold">{new Date(trip.arrivalDate).toLocaleDateString()}</span>
                     </div>
                     <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                       <span className="text-gray-500 uppercase">Capacity</span>
                       <span className="font-bold">{trip.maxCapacityKg} KG</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-black text-white text-center py-3 font-display uppercase tracking-widest text-sm group-hover:bg-[var(--color-highlight)] group-hover:text-black transition-colors">
                    Request Space
                 </div>
               </Link>
             ))}
          </div>
        )}
      </main>
    </div>
  );
}

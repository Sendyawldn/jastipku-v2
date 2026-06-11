"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios";
import { Plane } from "lucide-react";

export default function CreateTrip() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    originCity: "",
    destinationCity: "",
    departureDate: "",
    arrivalDate: "",
    maxCapacityKg: 10,
    pricePerKg: 150000,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/trips", formData);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to log trip. Ensure you are verified.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col py-12 px-4 items-center">
      <div className="w-full max-w-xl tag-card relative p-8">
        <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-8">
           <div>
              <h1 className="text-3xl font-display uppercase tracking-tight">Log New Trip</h1>
              <p className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Flight & Capacity Manifest</p>
           </div>
           <Plane className="w-8 h-8" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Origin (e.g., CGK)</label>
                 <input type="text" required className="w-full border border-black p-3 font-display text-2xl uppercase focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent" value={formData.originCity} onChange={e => setFormData({...formData, originCity: e.target.value.toUpperCase()})} />
              </div>
              <div className="space-y-2">
                 <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Destination (e.g., NRT)</label>
                 <input type="text" required className="w-full border border-black p-3 font-display text-2xl uppercase focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent" value={formData.destinationCity} onChange={e => setFormData({...formData, destinationCity: e.target.value.toUpperCase()})} />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Departure Date</label>
                 <input type="date" required className="w-full border border-black p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent" value={formData.departureDate} onChange={e => setFormData({...formData, departureDate: e.target.value})} />
              </div>
              <div className="space-y-2">
                 <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Return Date</label>
                 <input type="date" required className="w-full border border-black p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent" value={formData.arrivalDate} onChange={e => setFormData({...formData, arrivalDate: e.target.value})} />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Max Capacity (KG)</label>
                 <input type="number" required min="1" className="w-full border border-black p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent" value={formData.maxCapacityKg} onChange={e => setFormData({...formData, maxCapacityKg: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                 <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Price Per KG (Rp)</label>
                 <input type="number" required min="0" className="w-full border border-black p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent" value={formData.pricePerKg} onChange={e => setFormData({...formData, pricePerKg: Number(e.target.value)})} />
              </div>
           </div>

           <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-display uppercase tracking-widest py-4 mt-4 hover:bg-[var(--color-highlight)] hover:text-black transition-colors"
            >
              {loading ? "Logging..." : "Create Route"}
            </button>
        </form>
      </div>
    </div>
  );
}

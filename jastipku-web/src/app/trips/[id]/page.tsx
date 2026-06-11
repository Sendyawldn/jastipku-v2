"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../lib/axios";
import { uploadToCloudStorage } from "../../../lib/upload";
import { PackagePlus } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

export default function TripDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form Order
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemFile, setItemFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [weightKg, setWeightKg] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let productImageUrl = null;
      if (itemFile) {
        productImageUrl = await uploadToCloudStorage(itemFile);
      }

      const res = await api.post("/orders", {
        tripId: Number(id),
        itemName,
        itemUrl,
        productImageUrl,
        quantity,
        weightKg,
        price,
      });
      router.push(`/orders/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to lodge order. Ensure you are logged in.");
    }
  };

  if (loading) return <div className="p-8 font-mono animate-pulse">Scanning Manifest...</div>;
  if (!trip) return <div className="p-8 font-mono">Manifest Not Found</div>;

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
         
         {/* LEFT: TRIP MANIFEST (LUGGAGE TAG) */}
         <div className="tag-card relative">
            <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 font-mono text-[10px]">VERIFIED ROUTE</div>
            <div className="p-6 border-b-2 border-dashed border-gray-300">
               <div className="font-mono text-xs uppercase text-gray-500 mb-2">Routing</div>
               <div className="flex justify-between items-end mb-4">
                  <div className="flex-1">
                     <div className="text-[10px] uppercase font-mono mb-1">Origin</div>
                     <div className="text-5xl font-display uppercase">{trip.originCity}</div>
                  </div>
                  <div className="pb-2 text-[var(--color-ink-muted)] px-2">➔</div>
                  <div className="flex-1 text-right">
                     <div className="text-[10px] uppercase font-mono mb-1">Dest</div>
                     <div className="text-5xl font-display uppercase">{trip.destinationCity}</div>
                  </div>
               </div>
            </div>
            
            <div className="p-6 bg-gray-50 space-y-3 font-mono text-sm border-b border-gray-300">
               <div className="flex justify-between">
                 <span className="text-gray-500 uppercase">Traveler</span>
                 <span className="font-bold">{trip.traveler?.user?.name}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500 uppercase">Departure</span>
                 <span className="font-bold">{new Date(trip.departureDate).toLocaleDateString()}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500 uppercase">Return</span>
                 <span className="font-bold">{new Date(trip.arrivalDate).toLocaleDateString()}</span>
               </div>
               <div className="flex justify-between text-[var(--color-highlight)]">
                 <span className="uppercase">Available Cap</span>
                 <span className="font-bold">{trip.currentCapacityKg} / {trip.maxCapacityKg} KG</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500 uppercase">Tariff / KG</span>
                 <span className="font-bold">Rp {trip.pricePerKg.toLocaleString()}</span>
               </div>
            </div>
         </div>

         {/* RIGHT: CREATE ORDER */}
         <div className="tag-card p-6">
            <div className="flex items-center gap-2 border-b-2 border-black pb-4 mb-6">
               <PackagePlus className="w-6 h-6" />
               <h2 className="text-2xl font-display uppercase tracking-tight">Lodge Order</h2>
            </div>
            
            <form onSubmit={handleOrder} className="space-y-4">
               <div className="space-y-2">
                 <label className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)]">Item Description</label>
                 <input type="text" required className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Nike Air Force 1 size 42" />
               </div>
               <div className="space-y-2">
                 <label className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)]">Reference URL (Optional)</label>
                 <input type="url" className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]" value={itemUrl} onChange={e => setItemUrl(e.target.value)} placeholder="https://..." />
               </div>
               
               <div className="space-y-2">
                 <label className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)]">Product Photo (Optional)</label>
                 <input type="file" accept="image/*" className="w-full border border-black p-2 font-mono text-sm file:mr-4 file:py-1 file:px-3 file:border file:border-black file:text-xs file:font-mono file:bg-black file:text-white hover:file:bg-[var(--color-highlight)] hover:file:text-black cursor-pointer" onChange={e => setItemFile(e.target.files?.[0] || null)} />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)]">Quantity</label>
                    <input type="number" min="1" required className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)]">Est. Weight (KG)</label>
                    <input type="number" min="1" required className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]" value={weightKg} onChange={e => setWeightKg(Number(e.target.value))} />
                  </div>
               </div>

               <div className="space-y-2">
                 <label className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)]">Item Price (Rp)</label>
                 <input type="number" required min="0" className="w-full border border-black p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]" value={price} onChange={e => setPrice(Number(e.target.value))} />
               </div>

               <div className="bg-gray-100 p-4 font-mono text-xs uppercase border border-gray-300 mt-4">
                  <div className="flex justify-between mb-1">
                     <span className="text-gray-500">Service Fee (est)</span>
                     <span>Rp {(weightKg * trip.pricePerKg).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                     <span className="text-gray-500">Item Price</span>
                     <span>Rp {price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-2 mt-2 font-bold text-sm">
                     <span>Total Funds Req</span>
                     <span>Rp {(price + (weightKg * trip.pricePerKg)).toLocaleString()}</span>
                  </div>
               </div>

               <button
                 type="submit"
                 disabled={!user || user.role !== "CUSTOMER"}
                 className="w-full bg-black text-white font-display uppercase tracking-widest py-4 mt-6 hover:bg-[var(--color-highlight)] hover:text-black transition-colors disabled:opacity-50"
               >
                 {user?.role === "CUSTOMER" ? "Submit Manifest" : "Customers Only"}
               </button>
            </form>
         </div>

      </div>
    </div>
  );
}

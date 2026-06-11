"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import api from "../../lib/axios";
import { Plus, Package, Plane, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [trips, setTrips] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        if (user?.role === "TRAVELER" || user?.role === "ADMIN") {
          const tripsRes = await api.get("/trips");
          setTrips(tripsRes.data);
        }
        const ordersRes = await api.get("/orders");
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, token, router]);

  if (!user || loading) return <div className="p-8 font-mono uppercase">Loading Manifest...</div>;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b-2 border-black bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter uppercase font-display">
            Dashboard
          </div>
          <div className="flex gap-4 font-mono text-xs uppercase items-center">
            <span>{user.name} ({user.role})</span>
            <button 
              onClick={() => { useAuthStore.getState().logout(); router.push("/"); }}
              className="px-3 py-1 border border-black hover:bg-black hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* TRAVELER SECTION */}
        {user.role === "TRAVELER" && (
          <section className="space-y-4">
            <div className="flex justify-between items-end border-b-2 border-black pb-2">
              <h2 className="text-2xl font-display uppercase tracking-widest flex items-center gap-2">
                <Plane className="w-6 h-6" /> My Trips
              </h2>
              <Link href="/trips/new" className="bg-black text-white px-4 py-2 font-mono text-xs uppercase flex items-center gap-2 hover:bg-[var(--color-highlight)] hover:text-black transition-colors">
                <Plus className="w-4 h-4"/> Log New Trip
              </Link>
            </div>
            
            {trips.length === 0 ? (
              <div className="tag-card p-8 text-center text-[var(--color-ink-muted)] font-mono text-sm uppercase">
                No trips logged. Create a routing manifest.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {trips.filter(t => t.travelerId === user.id).map(trip => (
                  <div key={trip.id} className="tag-card p-4 relative">
                     <div className="absolute top-0 right-0 bg-black text-white font-mono text-[10px] px-2 py-1 uppercase">ID: TRP-{trip.id}</div>
                     <div className="flex justify-between items-center mb-4 mt-2">
                        <div className="text-3xl font-display uppercase">{trip.originCity}</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="text-3xl font-display uppercase text-right">{trip.destinationCity}</div>
                     </div>
                     <div className="font-mono text-xs text-gray-600 mb-4 border-t border-dashed border-gray-300 pt-2">
                        {new Date(trip.departureDate).toLocaleDateString()} — {new Date(trip.arrivalDate).toLocaleDateString()}
                     </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CUSTOMER PROFILE PROMPT */}
        {user.role === "CUSTOMER" && (
           <div className="bg-black text-white p-6 font-mono text-sm flex justify-between items-center uppercase">
              <div>
                <span className="text-[var(--color-highlight)] font-bold">WANT TO DELIVER?</span> <br />
                Verify identity to become a traveler.
              </div>
              <Link href="/onboarding" className="border border-[var(--color-highlight)] text-[var(--color-highlight)] px-4 py-2 hover:bg-[var(--color-highlight)] hover:text-black transition-colors">
                Apply Now
              </Link>
           </div>
        )}

        {/* ORDERS SECTION */}
        <section className="space-y-4">
          <div className="border-b-2 border-black pb-2">
            <h2 className="text-2xl font-display uppercase tracking-widest flex items-center gap-2">
              <Package className="w-6 h-6" /> Waybills & Orders
            </h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="tag-card p-8 text-center text-[var(--color-ink-muted)] font-mono text-sm uppercase">
              No active orders found in the registry.
            </div>
          ) : (
            <div className="space-y-4">
               {orders.map(order => (
                 <Link href={`/orders/${order.id}`} key={order.id} className="block tag-card p-4 hover:border-[var(--color-highlight)] transition-colors group">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                         <div className="bg-gray-100 p-2 font-mono text-xs font-bold w-16 text-center">#{order.id}</div>
                         <div>
                            <div className="font-display uppercase text-xl group-hover:text-[var(--color-highlight)] transition-colors">
                              {order.itemName}
                            </div>
                            <div className="font-mono text-xs text-gray-500">
                              Qty: {order.quantity} • Rp {order.price.toLocaleString()}
                            </div>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="bg-black text-white px-2 py-1 font-mono text-[10px] uppercase inline-block mb-1">
                           {order.status}
                         </div>
                         <div className="font-mono text-[10px] text-gray-400 block">
                           {new Date(order.createdAt).toLocaleDateString()}
                         </div>
                       </div>
                    </div>
                 </Link>
               ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

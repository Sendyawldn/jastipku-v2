"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import api from "../../lib/axios";
import { Banknote, Landmark } from "lucide-react";

export default function WithdrawalsDashboard() {
  const { user } = useAuthStore();
  const [balance, setBalance] = useState(0);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const balRes = await api.get("/withdrawals/balance");
        setBalance(balRes.data.balance);
        
        const histRes = await api.get("/withdrawals");
        setWithdrawals(histRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFinance();
  }, []);

  const handleWithdraw = async (e: React.FormEvent) => {
     e.preventDefault();
     if(amount <= 0 || amount > balance) return alert("Invalid amount");
     
     try {
        await api.post("/withdrawals", {
           amount,
           bankName: "MOCK_BANK",
           accountNumber: "1234567890"
        });
        // refresh
        const balRes = await api.get("/withdrawals/balance");
        setBalance(balRes.data.balance);
        const histRes = await api.get("/withdrawals");
        setWithdrawals(histRes.data);
        setAmount(0);
     } catch (err) {
        console.error(err);
        alert("Withdrawal request failed");
     }
  };

  if (loading) return <div className="p-8 font-mono animate-pulse">Checking Ledger...</div>;

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
         
         {/* LEFT: BALANCE LEDGER */}
         <div className="tag-card relative p-8">
            <div className="absolute top-0 right-0 bg-black text-[var(--color-highlight)] font-mono text-[10px] font-bold px-2 py-1 uppercase">FINANCE DEPT</div>
            
            <div className="flex items-center gap-2 mb-6 border-b-2 border-black pb-4">
               <Landmark className="w-6 h-6" />
               <h1 className="text-3xl font-display uppercase tracking-tight">Ledger</h1>
            </div>

            <div className="mb-8">
               <div className="font-mono text-xs uppercase text-gray-500 mb-1">Available Cleared Funds</div>
               <div className="text-5xl font-display uppercase">Rp {balance.toLocaleString()}</div>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4 border-t border-dashed border-gray-300 pt-6">
               <h3 className="font-mono text-sm font-bold uppercase">Request Payout</h3>
               <div className="space-y-2">
                 <label className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)]">Amount to Withdraw</label>
                 <div className="flex gap-2">
                    <span className="bg-gray-100 border border-black p-3 font-mono">Rp</span>
                    <input type="number" max={balance} className="flex-1 border border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                 </div>
               </div>
               
               <button
                 type="submit"
                 disabled={amount <= 0 || amount > balance}
                 className="w-full bg-black text-white font-display uppercase tracking-widest py-4 hover:bg-[var(--color-highlight)] hover:text-black transition-colors disabled:opacity-50"
               >
                 Authorize Transfer
               </button>
            </form>
         </div>

         {/* RIGHT: HISTORY */}
         <div className="tag-card p-6">
            <div className="flex items-center gap-2 border-b-2 border-black pb-4 mb-6">
               <Banknote className="w-6 h-6" />
               <h2 className="text-2xl font-display uppercase tracking-tight">Payout History</h2>
            </div>
            
            <div className="space-y-4">
               {withdrawals.length === 0 ? (
                  <div className="text-center font-mono text-xs uppercase text-gray-400 py-8">No prior payouts logged</div>
               ) : (
                  withdrawals.map(w => (
                     <div key={w.id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                        <div>
                           <div className="font-display uppercase text-lg">Rp {w.amount.toLocaleString()}</div>
                           <div className="font-mono text-[10px] text-gray-500">{new Date(w.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className={`font-mono text-[10px] uppercase px-2 py-1 border border-black ${w.status === "PENDING" ? "bg-yellow-100" : w.status === "COMPLETED" ? "bg-green-100" : "bg-red-100"}`}>
                           {w.status}
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>

      </div>
    </div>
  );
}

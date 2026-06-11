"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/axios";
import { uploadToCloudStorage } from "../../lib/upload";
import { ShieldCheck } from "lucide-react";

export default function TravelerOnboarding() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCardFile) return alert("KTP image is required");
    
    setLoading(true);
    try {
      // Upload to Cloud Storage first
      const idCardImageUrl = await uploadToCloudStorage(idCardFile);

      // Submit profile to backend
      await api.post("/profiles/traveler", {
        phoneNumber,
        idCardNumber,
        idCardImageUrl,
      });
      // In a real app, we might update the zustand store role here
      // by fetching the user again, but for now we just redirect
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Failed to submit verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg tag-card p-8">
         <div className="flex justify-center mb-6">
            <ShieldCheck className="w-12 h-12 text-[var(--color-highlight)]" />
         </div>
         <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-3xl font-display uppercase tracking-tight">Traveler Verification</h1>
            <p className="font-mono text-xs uppercase text-[var(--color-ink-muted)] mt-2">
              Identity clearance required for logging trips.
            </p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full border border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+62 812 3456 7890"
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">National ID (KTP) Number</label>
              <input
                type="text"
                required
                className="w-full border border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent"
                value={idCardNumber}
                onChange={(e) => setIdCardNumber(e.target.value)}
                placeholder="16 digits ID number"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Upload KTP Photo</label>
              <input
                type="file"
                accept="image/*"
                required
                className="w-full border border-black p-3 font-mono text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-black file:text-sm file:font-mono file:bg-black file:text-white hover:file:bg-[var(--color-highlight)] hover:file:text-black cursor-pointer"
                onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-display uppercase tracking-widest py-4 hover:bg-[var(--color-highlight)] hover:text-black transition-colors"
            >
              {loading ? "Processing..." : "Submit Application"}
            </button>
         </form>
      </div>
    </div>
  );
}

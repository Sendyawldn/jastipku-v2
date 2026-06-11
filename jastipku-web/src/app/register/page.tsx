"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/axios";
import { useAuthStore } from "../../store/authStore";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Register
      await api.post("/auth/register", { email, password, name });
      
      // Step 2: Auto Login
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md tag-card p-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-[var(--color-border-dark)] bg-[var(--background)]" />
        
        <div className="border-b-2 border-dashed border-[var(--color-ink-muted)] pb-6 mb-6 mt-4">
          <h1 className="text-4xl font-display uppercase tracking-tight text-center">Register</h1>
          <div className="font-mono text-xs uppercase text-center mt-2 text-[var(--color-ink-muted)]">
            New Passenger Entry
          </div>
        </div>

        {error && (
          <div className="bg-[var(--color-highlight)] text-black font-mono text-xs p-3 mb-6 font-bold uppercase border border-black">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Full Name</label>
            <input
              type="text"
              required
              className="w-full border border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Email Address</label>
            <input
              type="email"
              required
              className="w-full border border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[var(--color-ink-muted)]">Password</label>
            <input
              type="password"
              required
              className="w-full border border-black p-3 font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-display uppercase tracking-widest py-4 hover:bg-[var(--color-highlight)] hover:text-black transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center font-mono text-xs border-t border-[var(--color-border-dark)] pt-6">
          <span className="text-[var(--color-ink-muted)]">Already verified?</span>{" "}
          <Link href="/login" className="font-bold underline hover:text-[var(--color-highlight)]">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}

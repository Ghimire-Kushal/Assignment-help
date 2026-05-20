"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, RotateCcw, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { Button } from "@/components/shared/Button";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;
const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function OTPPage() {
  const router = useRouter();
  const toast = useToast();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Start countdown on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setCooldown((v) => {
        if (v <= 1) { clearInterval(interval); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function startCooldown() {
    setCooldown(60);
    const interval = setInterval(() => {
      setCooldown((v) => {
        if (v <= 1) { clearInterval(interval); return 0; }
        return v - 1;
      });
    }, 1000);
  }

  const focusIndex = useCallback((index: number) => {
    inputRefs.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))]?.focus();
  }, []);

  function handleChange(index: number, value: string) {
    // Allow only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(null);
    if (digit && index < OTP_LENGTH - 1) focusIndex(index + 1);
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else {
        focusIndex(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusIndex(index - 1);
    } else if (e.key === "ArrowRight") {
      focusIndex(index + 1);
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    focusIndex(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  const isComplete = digits.every((d) => d !== "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete) {
      setError("Please enter all 6 digits.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);

    // Mock: wrong code simulation (treat "000000" as invalid for demo)
    if (digits.join("") === "000000") {
      setError("Invalid code. Please try again.");
      return;
    }

    toast.success("Email verified! Welcome to EduNexus AI.");
    router.push("/dashboard");
  }

  async function handleResend() {
    if (cooldown > 0) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(null);
    focusIndex(0);
    toast.info("A new code has been sent.");
    startCooldown();
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent to your inbox"
    >
      <form onSubmit={handleSubmit} noValidate>
        {/* OTP boxes */}
        <div className="mb-6 flex justify-center gap-3" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              autoFocus={i === 0}
              className={cn(
                "h-14 w-12 rounded-xl border bg-white/[0.04] text-center text-xl font-semibold text-foreground transition-all duration-150 focus:outline-none focus:ring-1",
                error
                  ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/15"
                  : digit
                  ? "border-blue-500/50 bg-blue-500/[0.05] focus:border-blue-500/60 focus:ring-blue-500/15"
                  : "border-white/[0.1] focus:border-blue-500/50 focus:ring-blue-500/15"
              )}
            />
          ))}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="mb-4 text-center text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading || !isComplete}
          className="w-full"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Verify email
            </>
          )}
        </Button>
      </form>

      {/* Resend + back */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
        </button>

        <Link
          href="/login"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}

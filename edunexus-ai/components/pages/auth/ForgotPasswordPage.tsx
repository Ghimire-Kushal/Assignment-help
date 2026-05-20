"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { FormInput } from "@/components/shared/FormInput";
import { Button } from "@/components/shared/Button";
import { useToast } from "@/hooks/useToast";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }
    setEmailError(undefined);
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
    startCooldown();
  }

  function startCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((v) => {
        if (v <= 1) { clearInterval(interval); return 0; }
        return v - 1;
      });
    }, 1000);
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Reset email resent!");
    startCooldown();
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <FormInput
                label="Email address"
                type="email"
                placeholder="you@university.edu"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                hint="We'll send a reset link to this address."
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="mt-1 w-full"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send reset link
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remembered it?{" "}
              <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Back to sign in
              </Link>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col items-center gap-5 py-4 text-center"
          >
            {/* Success icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground">Check your inbox</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We sent a reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                It expires in 30 minutes.
              </p>
            </div>

            {/* Resend */}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || loading}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend email"}
            </button>

            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

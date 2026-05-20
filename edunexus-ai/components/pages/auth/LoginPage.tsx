"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, GraduationCap, Key, Eye, EyeOff, LogIn } from "lucide-react";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { FormInput } from "@/components/shared/FormInput";
import { Button } from "@/components/shared/Button";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { authService } from "@/services/authService";

type Role = "student" | "admin";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function RoleSelector({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div className="mb-6 flex rounded-xl border border-white/[0.09] bg-white/[0.03] p-1">
      {(["student", "admin"] as Role[]).map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => onChange(r)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
            role === r
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {r === "student" ? (
            <GraduationCap className="h-4 w-4" />
          ) : (
            <Key className="h-4 w-4" />
          )}
          {r === "student" ? "Student" : "Admin"}
        </button>
      ))}
    </div>
  );
}

export function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState<FormState>({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatusMessage(null);

    try {
      const { user } = await authService.login({
        email: form.email,
        password: form.password,
      });
      const destination = user.role === "admin" ? "/dashboard/admin" : "/dashboard/student";
      const mismatch =
        (role === "admin" && user.role !== "admin") ||
        (role === "student" && user.role === "admin");

      setStatusMessage({
        type: "success",
        text: mismatch
          ? `Signed in as ${user.role}. Redirecting to the correct dashboard.`
          : "Logged in successfully. Redirecting...",
      });
      toast.success("Logged in successfully!");
      router.push(destination);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in. Please try again.";
      setStatusMessage({ type: "error", text: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={`Sign in to your ${role === "student" ? "student" : "admin"} account`}
    >
      {/* Role toggle */}
      <RoleSelector role={role} onChange={setRole} />

      {/* Google SSO */}
      <button
        type="button"
        onClick={() => toast.info("Google SSO coming soon.")}
        className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.04] py-3 text-sm font-medium text-foreground transition-all duration-150 hover:bg-white/[0.08] active:scale-[0.98]"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.07]" />
        <span className="text-xs text-muted-foreground/50">or continue with email</span>
        <div className="h-px flex-1 bg-white/[0.07]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {statusMessage ? (
          <div
            className={cn(
              "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm",
              statusMessage.type === "success"
                ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-100"
                : "border-red-400/25 bg-red-500/10 text-red-100"
            )}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        ) : null}

        <FormInput
          label="Email address"
          type="email"
          placeholder="you@university.edu"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          error={errors.password}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-muted-foreground/50 transition-colors hover:text-muted-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        {/* Remember + forgot */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground select-none">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
              className="h-4 w-4 rounded border-white/20 bg-white/[0.04] accent-blue-500"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

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
              <LogIn className="h-4 w-4" />
              Sign in
            </>
          )}
        </Button>
      </form>

      {/* Register link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Create one free
        </Link>
      </p>
    </AuthLayout>
  );
}

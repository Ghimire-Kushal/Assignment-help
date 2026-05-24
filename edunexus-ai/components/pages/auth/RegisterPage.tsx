"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, BriefcaseBusiness, CheckCircle2, GraduationCap, Key, Eye, EyeOff, UserPlus } from "lucide-react";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { FormInput } from "@/components/shared/FormInput";
import { Button } from "@/components/shared/Button";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { authService } from "@/services/authService";
import { setAuthToken, setMockUser } from "@/services/api";

type Role = "student" | "expert" | "admin";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

const ROLE_CONFIG: { value: Role; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "student", label: "Student", icon: GraduationCap    },
  { value: "expert",  label: "Expert",  icon: BriefcaseBusiness },
  { value: "admin",   label: "Admin",   icon: Key               },
];

function RoleSelector({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div className="mb-6 flex rounded-xl border border-white/[0.09] bg-white/[0.03] p-1 gap-1">
      {ROLE_CONFIG.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
            role === value
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

function PasswordStrengthBar({ password }: { password: string }) {
  function score(p: string): number {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  }

  const s = score(password);
  const labels = ["", "Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
  const textColors = ["", "text-red-400", "text-orange-400", "text-yellow-400", "text-blue-400", "text-green-400"];

  if (!password) return null;

  return (
    <div className="mt-1.5 flex flex-col gap-1">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < s ? colors[s] : "bg-white/[0.07]"
            )}
          />
        ))}
      </div>
      <p className={cn("text-xs", textColors[s])}>{labels[s]}</p>
    </div>
  );
}

export function RegisterPage() {
  const router = useRouter();
  const toast = useToast();

  const [role, setRole] = useState<Role>("student");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (!form.confirmPassword) errs.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    if (!form.terms) errs.terms = "You must accept the terms to continue.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const DESTINATIONS: Record<Role, string> = {
    student: "/dashboard/student",
    expert:  "/dashboard/expert",
    admin:   "/dashboard/admin",
  };

  const DEMO_NAMES: Record<Role, string> = {
    student: form.name || "Demo Student",
    expert:  form.name || "Demo Expert",
    admin:   form.name || "Demo Admin",
  };

  function doMockRegister(selectedRole: Role, email: string, name: string) {
    const mockUser = {
      _id:      `mock-${selectedRole}-001`,
      name:     name || DEMO_NAMES[selectedRole],
      email,
      role:     selectedRole,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setAuthToken("demo-token-" + selectedRole);
    setMockUser(mockUser as Record<string, unknown>);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setStatusMessage(null);

    try {
      const { user } = await authService.register({
        name:     form.name,
        email:    form.email,
        password: form.password,
        role,
      });
      const destination = DESTINATIONS[user.role as Role] ?? "/dashboard/student";
      setStatusMessage({ type: "success", text: "Account created. Redirecting…" });
      toast.success("Account created successfully!");
      router.push(destination);
    } catch (error) {
      const isNetwork = error instanceof TypeError ||
        (error instanceof Error && (error.message.includes("fetch") || error.message.includes("network") || error.message.includes("Failed")));

      if (isNetwork) {
        doMockRegister(role, form.email, form.name);
        toast.success(`Account created as ${role} (demo mode).`);
        setStatusMessage({ type: "success", text: "Demo account created. Redirecting…" });
        setTimeout(() => router.push(DESTINATIONS[role]), 600);
      } else {
        const message = error instanceof Error ? error.message : "Unable to create account. Please try again.";
        setStatusMessage({ type: "error", text: message });
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of students getting top grades"
    >
      <RoleSelector role={role} onChange={setRole} />

      {/* Google SSO */}
      <button
        type="button"
        onClick={() => {
          doMockRegister(role, "demo@google.com", DEMO_NAMES[role]);
          toast.success(`Account created with Google as ${role}.`);
          setTimeout(() => router.push(DESTINATIONS[role]), 400);
        }}
        className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.04] py-3 text-sm font-medium text-foreground transition-all duration-150 hover:bg-white/[0.08] active:scale-[0.98]"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/[0.07]" />
        <span className="text-xs text-muted-foreground/50">or fill in the form</span>
        <div className="h-px flex-1 bg-white/[0.07]" />
      </div>

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
          label="Full name"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={errors.name}
        />

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

        <div>
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
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
          <PasswordStrengthBar password={form.password} />
        </div>

        <FormInput
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          
          autoComplete="new-password"
          required
          value={form.confirmPassword}
          onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
          error={errors.confirmPassword}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-muted-foreground/50 transition-colors hover:text-muted-foreground"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground select-none">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setForm((f) => ({ ...f, terms: e.target.checked }))}
              className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/20 bg-white/[0.04] accent-blue-500"
            />
            <span>
              I agree to the{" "}
              <a href="mailto:scholarsyncnepal@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="mailto:scholarsyncnepal@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-red-400">{errors.terms}</p>
          )}
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
              <UserPlus className="h-4 w-4" />
              Create account
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

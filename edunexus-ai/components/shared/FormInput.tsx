"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  wrapperClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightElement,
      wrapperClassName,
      className,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="ml-1 text-[11px] font-normal text-red-400">*</span>
          )}
        </label>

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-white/[0.04] py-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-150 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon ? "pl-11" : "pl-4",
              rightElement ? "pr-12" : "pr-4",
              error
                ? "border-red-500/50 bg-red-500/[0.03] focus:border-red-500/60 focus:ring-red-500/15"
                : "border-white/[0.1] focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-blue-500/15",
              className
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5 text-xs text-red-400"
            >
              <AlertCircle className="h-3 w-3 flex-shrink-0" />
              {error}
            </motion.p>
          ) : hint ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-muted-foreground"
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

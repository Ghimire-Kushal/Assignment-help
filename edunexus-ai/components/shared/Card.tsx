"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "glass border border-white/[0.07] hover:border-blue-500/20",
        glow: "glass border border-blue-500/20 hover:border-blue-500/40 hover:glow-blue",
        solid:
          "bg-card border border-border hover:border-border/80",
        ghost: "hover:bg-white/5",
        feature:
          "glass border border-white/[0.07] hover:border-purple-500/30 hover:glow-purple group",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

type CardBaseProps = VariantProps<typeof cardVariants> & {
  className?: string;
  children: React.ReactNode;
  animated?: boolean;
};

type CardProps = CardBaseProps &
  Omit<HTMLMotionProps<"div">, keyof CardBaseProps | "children"> & {
    children: React.ReactNode;
  };

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, animated = false, children, ...props }, ref) => {
    if (animated) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(cardVariants({ variant, padding, className }))}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(cardVariants({ variant, padding, className }))}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/* Sub-components for structured card layouts */
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-semibold text-lg leading-snug tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-4", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center pt-4 border-t border-white/[0.06]", className)} {...props} />
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
export type { CardProps };

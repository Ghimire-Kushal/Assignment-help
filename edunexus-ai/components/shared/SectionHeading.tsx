"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE },
  }),
};

export function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  /* Replace [[highlight]] placeholder in title if highlight prop is given */
  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    if (parts.length < 2) return title;
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn("flex flex-col gap-4", alignClass, className)}>
      {badge && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border border-blue-500/30 bg-blue-500/10 text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground",
          titleClassName
        )}
      >
        {renderTitle()}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className={cn(
            "max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg",
            descriptionClassName
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

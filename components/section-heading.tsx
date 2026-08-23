"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
        <span aria-hidden="true" className="h-px w-6 bg-primary" />
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}

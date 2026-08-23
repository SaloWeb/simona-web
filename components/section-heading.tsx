"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  /**
   * "inverted": para secciones con fondo de color de marca (bg-primary),
   * donde el eyebrow/título/descripción por defecto (pensados para fondo
   * claro) perderían contraste. Usado por AiSection como sección de
   * acento a mitad del recorrido de scroll.
   */
  tone?: "default" | "inverted"
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const isInverted = tone === "inverted"

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
      <span
        className={cn(
          "flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]",
          isInverted ? "text-primary-foreground/90" : "text-primary",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-6",
            isInverted ? "bg-primary-foreground/60" : "bg-primary",
          )}
        />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl",
          isInverted && "text-primary-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed text-pretty",
            isInverted ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}

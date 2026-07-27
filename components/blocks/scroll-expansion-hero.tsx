"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface ScrollExpandMediaProps {
  mediaType: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title: string;
  date: string;
  scrollToExpand: string;
  textBlend?: boolean;
  children?: React.ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Remplace le bouton CTA par un composant custom (ex: CalBookingButton) */
  ctaNode?: React.ReactNode;
}

export default function ScrollExpandMedia({
  mediaType,
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  children,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaNode,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── animations scroll-driven ── */
  const width        = useTransform(scrollYProgress, [0, 0.75], ["72%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.75], ["2rem", "0rem"]);
  const scaleVal     = useTransform(scrollYProgress, [0, 0.75], [0.91, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.28], ["0px", "-28px"]);

  return (
    <>
      {/* Container 250 vh - contrôle la durée de l'effet */}
      <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Fond flouté */}
          <div className="absolute inset-0">
            <Image
              src={bgImageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ transform: "scale(1.12)", filter: "blur(10px)" }}
            />
            <div className="absolute inset-0 bg-brown-deep/58" />
          </div>

          {/* Média qui s'élargit */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{ width, borderRadius, scale: scaleVal, height: "87vh" }}
              className="relative overflow-hidden"
            >
              {mediaType === "image" ? (
                <Image
                  src={mediaSrc}
                  alt={title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              ) : (
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/35 via-transparent to-brown-deep/80" />

              {/* Titre + CTA - centré et fluide sur toutes les largeurs d'écran */}
              <motion.div
                style={{ opacity: titleOpacity, y: titleY }}
                className={`absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-3xl flex-col items-center justify-center pb-12 px-4 text-center sm:pb-14 sm:px-6 ${
                  textBlend ? "mix-blend-difference" : ""
                }`}
              >
                <p className="font-sans text-[0.62rem] uppercase tracking-[0.42em] text-cream/60 mb-5">
                  {date}
                </p>
                <h1 className="font-display font-bold text-cream leading-[0.92] text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-5 font-sans text-base text-cream/72 max-w-md tracking-wide">
                    {subtitle}
                  </p>
                )}
                {ctaNode ?? (ctaLabel && ctaHref && (
                  <Link
                    href={ctaHref}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-caramel px-10 py-4 font-sans text-sm font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:bg-gold-dark hover:shadow-warm active:scale-[0.97]"
                  >
                    {ctaLabel}
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Indicateur de défilement */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="font-sans text-[0.55rem] uppercase tracking-[0.35em] text-cream/45">
              {scrollToExpand}
            </span>
            <div className="h-7 w-px bg-gradient-to-b from-cream/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Contenu sous le hero */}
      {children}
    </>
  );
}

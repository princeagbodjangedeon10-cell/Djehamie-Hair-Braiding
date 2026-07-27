"use client";
import { useEffect, useRef, useState } from "react";
import { google } from "@/lib/site";

export function StarRating({ value = 5, className = "h-4 w-4" }: { value?: number; className?: string }) {
  return (
    <span className="inline-flex text-caramel" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={`${className} ${i < value ? "opacity-100" : "opacity-20"}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

export function GoogleBadge({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-2.5 font-sans ${
      dark ? "border-cream/20 bg-cream/8 text-cream" : "border-brown-deep/12 bg-white/80 text-brown-deep shadow-card"
    }`}>
      <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0" aria-hidden>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      <span className="text-lg font-semibold leading-none">{google.rating.toString().replace(".", ",")}</span>
      <StarRating value={5} className="h-3.5 w-3.5" />
      <span className={`font-sans text-xs ${dark ? "text-cream/65" : "text-ink/55"}`}>{google.reviewCount} reviews</span>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className={`eyebrow ${dark ? "text-gold" : "text-caramel"}`}>
        <span className="h-px w-8 bg-current" />{eyebrow}
      </span>
      <h2 className={`mt-4 text-balance text-4xl font-medium leading-[1.06] sm:text-5xl ${dark ? "text-cream" : "text-brown-deep"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 font-sans text-lg leading-relaxed ${dark ? "text-cream/70" : "text-ink/65"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

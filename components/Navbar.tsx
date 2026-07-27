"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, business } from "@/lib/site";
import { BookingButton } from "@/components/BookingButton";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-brown-deep/10 bg-cream/92 backdrop-blur-md shadow-sm"
          : isHome
          ? "bg-transparent"
          : "border-b border-brown-deep/10 bg-cream/92 backdrop-blur-md"
      }`}
    >
      <nav className="container-wide flex h-[72px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" aria-label={business.name}>
          <span className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-all duration-300 ${
            scrolled || !isHome
              ? "border-caramel text-caramel group-hover:bg-caramel group-hover:text-cream"
              : "border-cream/70 text-cream/90 group-hover:bg-cream/20"
          }`}>
            <BraidIcon />
          </span>
          <span className="leading-none">
            <span className={`block font-display text-lg font-semibold tracking-tight transition-colors ${scrolled || !isHome ? "text-brown-deep" : "text-cream"}`}>
              Djehamie
            </span>
            <span className={`block text-[0.6rem] font-sans font-medium uppercase tracking-[0.32em] transition-colors ${scrolled || !isHome ? "text-caramel" : "text-cream/70"}`}>
              Hair Braiding
            </span>
          </span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-sans font-medium transition-colors ${
                  scrolled || !isHome
                    ? active ? "text-brown-deep" : "text-ink/60 hover:text-brown-deep"
                    : active ? "text-cream" : "text-cream/70 hover:text-cream"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  scrolled || !isHome ? "bg-caramel" : "bg-cream"
                } ${active ? "w-full" : "w-0"}`} />
              </Link>
            );
          })}
        </div>

        {/* CTA desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${business.phone}`}
            className={`text-sm font-sans font-medium transition-colors ${scrolled || !isHome ? "text-ink/60 hover:text-brown-deep" : "text-cream/75 hover:text-cream"}`}
          >
            {business.phoneDisplay}
          </a>
          <BookingButton
            className={`rounded-full px-5 py-2.5 text-xs font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
              scrolled || !isHome
                ? "bg-brown-deep text-cream hover:bg-brown-mid"
                : "bg-cream text-brown-deep hover:bg-gold"
            }`}
          >
            Book
          </BookingButton>
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 lg:hidden ${
            scrolled || !isHome
              ? "border-brown-deep/20 text-brown-deep"
              : "border-cream/40 text-cream"
          }`}
          aria-label={open ? "Close" : "Menu"}
          aria-expanded={open}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Panneau mobile */}
      <div
        className={`overflow-hidden bg-cream lg:hidden ${open ? "max-h-[90vh] border-b border-brown-deep/10" : "max-h-0"} transition-[max-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      >
        <div className="container-wide flex flex-col gap-1 py-6">
          {nav.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between border-b border-brown-deep/8 py-4 font-display text-2xl ${active ? "text-caramel" : "text-brown-deep"}`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
                <span className="font-sans text-sm text-caramel/60">0{i + 1}</span>
              </Link>
            );
          })}
          <BookingButton className="btn-primary mt-5 w-full">Book an appointment</BookingButton>
          <a href={`tel:${business.phone}`} className="btn-outline mt-3 w-full">{business.phoneDisplay}</a>
        </div>
      </div>
    </header>
  );
}

function BraidIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-5 w-5" aria-hidden>
      <path d="M7 4c0 4 10 4 10 8S7 16 7 20" />
      <path d="M17 4c0 4-10 4-10 8s10 4 10 8" />
    </svg>
  );
}
function MenuIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>;
}
function XIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>;
}

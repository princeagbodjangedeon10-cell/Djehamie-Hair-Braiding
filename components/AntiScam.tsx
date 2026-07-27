import { antiScam, business } from "@/lib/site";
import { Reveal } from "./ui";

/* ─────────────────────────────────────────────────────────────
   Section anti-arnaque - protège les clients des usurpateurs
   qui utilisent le nom du salon. Affichée sur les pages clés.
───────────────────────────────────────────────────────────── */
export function AntiScamSection() {
  return (
    <section id="verification" className="bg-brown-deep py-20 text-cream">
      <div className="container-wide">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-caramel/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              <ShieldIcon className="h-4 w-4" /> Official website
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
              {antiScam.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-cream/70">
              {antiScam.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {antiScam.rules.map((r, i) => (
            <Reveal key={r.t} delay={i * 90}>
              <div className="h-full rounded-2xl border border-cream/10 bg-cream/5 p-7 text-left">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-caramel/40 bg-caramel/10 text-caramel">
                  {i === 0 ? <PhoneCheckIcon className="h-5 w-5" /> : i === 1 ? <NoCardIcon className="h-5 w-5" /> : <PinCheckIcon className="h-5 w-5" />}
                </span>
                <h3 className="mt-4 font-display text-xl text-cream">{r.t}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-cream/65">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-caramel/30 bg-caramel/10 px-6 py-5 text-center">
            <p className="font-sans text-sm leading-relaxed text-cream/85">
              {antiScam.reminder}
            </p>
            <a
              href={`tel:${business.phone}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-caramel px-7 py-3 font-sans text-sm font-bold uppercase tracking-[0.14em] text-cream transition-all hover:bg-gold-dark"
            >
              Official number: {business.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Bandeau compact - rappel discret sous les CTA de réservation */
export function OfficialNumberBadge({ light = false }: { light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-sans text-xs ${
        light ? "text-cream/60" : "text-ink/50"
      }`}
    >
      <ShieldIcon className="h-3.5 w-3.5 text-caramel" />
      Bookings only at {business.phoneDisplay}, the salon&apos;s only official number.
    </p>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function PhoneCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8.1 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.9.5 2.9.7a2 2 0 011.6 2z" />
    </svg>
  );
}
function NoCardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M4 3l17 18" />
    </svg>
  );
}
function PinCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
      <path d="M9.5 10l1.8 1.8L15 8.2" />
    </svg>
  );
}

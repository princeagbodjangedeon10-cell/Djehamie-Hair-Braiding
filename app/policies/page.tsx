import type { Metadata } from "next";
import Link from "next/link";
import {
  business,
  policyHighlight,
  salonPolicies,
  type Policy,
} from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { ArrowIcon, PhoneIcon } from "@/components/Icons";
import { Reveal } from "@/components/ui";
import { OfficialNumberBadge } from "@/components/AntiScam";

export const metadata: Metadata = {
  title: "Good to know before your appointment",
  description:
    "Salon policies at Djehamie Hair Braiding, Chicago: you never pay upfront (payment is due once your braids are halfway done), allergy and comfort care, free adjustments within 24 hours, and photo consent.",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Good to know"
        title={
          <>
            A few things that make your{" "}
            <span className="italic text-caramel">visit easy</span>
          </>
        }
        intro="Nothing complicated, and no small print. Here is how we work at the salon, so you know exactly what to expect before you sit in the chair."
      />

      {/* ── The payment promise: the headline, and an anti-scam argument ── */}
      <section className="bg-cream-200 py-20">
        <div className="container-wide">
          <Reveal>
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] bg-brown-deep px-8 py-14 text-cream shadow-warm sm:px-14">
              <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-caramel/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-gold/8 blur-2xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-caramel/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
                  <HandCoinIcon className="h-4 w-4" /> {policyHighlight.eyebrow}
                </span>

                <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                  {policyHighlight.title}
                </h2>

                <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-cream/75">
                  {policyHighlight.body}
                </p>

                {/* Les trois temps du rendez-vous */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { n: "0 %", t: "You arrive", d: "Nothing to pay. We talk style and price together." },
                    { n: "50 %", t: "Halfway done", d: "You see the work, then you pay in full at the salon." },
                    { n: "100 %", t: "You leave", d: "You check your style in the mirror before heading out." },
                  ].map((s, i) => (
                    <Reveal key={s.n} delay={i * 90}>
                      <div className="h-full rounded-2xl border border-cream/10 bg-cream/5 p-5">
                        <span className="font-display text-3xl text-caramel">{s.n}</span>
                        <p className="mt-2 font-display text-lg text-cream">{s.t}</p>
                        <p className="mt-1 font-sans text-sm leading-relaxed text-cream/60">{s.d}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <p className="mt-8 rounded-2xl border border-caramel/30 bg-caramel/10 px-6 py-4 font-sans text-sm leading-relaxed text-cream/85">
                  {policyHighlight.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Les règles du salon, côté client ── */}
      <section className="bg-cream py-20">
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow text-caramel">
                <span className="h-px w-8 bg-current" /> At the salon
              </span>
              <h2 className="mt-4 text-balance font-display text-4xl font-medium leading-[1.06] text-brown-deep sm:text-5xl">
                Your comfort, in six points
              </h2>
              <p className="mt-5 font-sans text-lg leading-relaxed text-ink/65">
                Most of these exist for one reason only: so you walk out with a
                hairstyle you love, and a scalp that feels good.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {salonPolicies.map((p, i) => (
              <Reveal key={p.t} delay={i * 80}>
                <div className="h-full rounded-2xl border border-brown-deep/8 bg-white p-7 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-caramel/40 bg-caramel/10 text-caramel">
                    <PolicyIcon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-brown-deep">{p.t}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA de fin ── */}
      <section className="bg-cream pb-20">
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-xl rounded-2xl border border-brown-deep/8 bg-white p-8 text-center shadow-card">
              <p className="font-display text-2xl text-brown-deep">
                Any question before booking?
              </p>
              <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink/65">
                Ms. Djehamie answers personally. Ask her anything about a style,
                a price, or how your appointment will go.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/booking" className="btn-primary">
                  Book an appointment <ArrowIcon className="h-4 w-4" />
                </Link>
                <a href={`tel:${business.phone}`} className="btn-outline text-center">
                  <PhoneIcon className="h-4 w-4" /> {business.phoneDisplay}
                </a>
              </div>
              <div className="mt-6">
                <OfficialNumberBadge />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ── Icônes, dans le même trait que celles de AntiScam ── */
function PolicyIcon({ name, className }: { name: Policy["icon"]; className?: string }) {
  const map: Record<Policy["icon"], React.ReactNode> = {
    allergy: (
      <>
        <path d="M12 3c-1.5 3-5 5.2-5 9a5 5 0 0010 0c0-3.8-3.5-6-5-9z" />
        <path d="M9.5 14.5l5-5" />
      </>
    ),
    comfort: (
      <>
        <path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 21l8.8-8.3a5 5 0 000-7.1z" />
      </>
    ),
    mirror: (
      <>
        <ellipse cx="12" cy="9" rx="6.5" ry="7" />
        <path d="M12 16v5" />
        <path d="M9 21h6" />
      </>
    ),
    adjust: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    camera: (
      <>
        <path d="M3 8.5A1.5 1.5 0 014.5 7h2.2l1.2-2h8.2l1.2 2h2.2A1.5 1.5 0 0121 8.5v9A1.5 1.5 0 0119.5 19h-15A1.5 1.5 0 013 17.5v-9z" />
        <circle cx="12" cy="13" r="3.2" />
      </>
    ),
    calm: (
      <>
        <path d="M11 5L6.5 9H3v6h3.5L11 19V5z" />
        <path d="M16.5 8.5a5 5 0 010 7" />
        <path d="M19.5 5.5a9 9 0 010 13" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {map[name]}
    </svg>
  );
}

function HandCoinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="16" cy="7" r="3.5" />
      <path d="M3 14.5l3-1.5 4.5 2h3a1.5 1.5 0 010 3H10" />
      <path d="M3 13v7" />
      <path d="M21 14l-6.5 5.5-4.5-2" />
    </svg>
  );
}

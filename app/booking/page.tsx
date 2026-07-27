import type { Metadata } from "next";
import { business, smsLink, defaultSmsBody, paymentPolicy } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { ArrowIcon, ClockIcon, PhoneIcon } from "@/components/Icons";
import { Reveal } from "@/components/ui";
import { BookingButton } from "@/components/BookingButton";
import { AntiScamSection, OfficialNumberBadge } from "@/components/AntiScam";

export const metadata: Metadata = {
  title: "Booking by text at the official number",
  description:
    "Book your appointment at Djehamie Hair Braiding in Chicago: pick your style, send your request by text to (773) 801-9351, the only official number, and get a personal reply from the braider.",
};

const steps = [
  {
    n: "01",
    t: "Pick your style",
    d: "Boho knotless, box braids, twists, cornrows… for her or for him. The gallery photos are there to inspire you.",
  },
  {
    n: "02",
    t: "Choose your preferred time",
    d: "Open 7 days a week, by appointment. Tell us the day and time that work for you, and Djehamie adapts to your schedule.",
  },
  {
    n: "03",
    t: "Send your text",
    d: "Your request goes straight to Djehamie's work number. She replies personally to confirm the time slot and the price.",
  },
];

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title={
          <>
            Book by <span className="italic text-caramel">text</span>,
            directly with the braider
          </>
        }
        intro="No middleman, no online payment: your request lands directly on the salon's official number, and Djehamie herself confirms with you."
      />

      {/* ── Steps ── */}
      <section className="bg-cream py-16">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="h-full rounded-2xl border border-brown-deep/8 bg-white p-7 shadow-card">
                <span className="font-display text-4xl text-caramel">{s.n}</span>
                <h3 className="mt-3 font-display text-xl text-brown-deep">{s.t}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Main CTA ── */}
      <section className="bg-cream-200 py-20">
        <div className="container-wide">
          <Reveal>
            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] bg-brown-deep px-8 py-16 text-center text-cream shadow-warm sm:px-16">
              <div className="pointer-events-none absolute -bottom-10 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-caramel/10 blur-3xl" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-caramel/80">
                Direct booking
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Ready for your new look?
              </h2>
              <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-cream/65">
                Use the assistant to compose your request in a few clicks, or send a text
                directly. The exact price is discussed with the braider.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <BookingButton className="inline-flex items-center gap-2 rounded-full bg-caramel px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] text-cream transition-all hover:bg-gold-dark hover:shadow-warm active:scale-[0.97]">
                  Compose my request <ArrowIcon className="h-4 w-4" />
                </BookingButton>
                <a
                  href={smsLink(defaultSmsBody)}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] text-cream transition-all hover:border-caramel hover:text-caramel"
                >
                  Text directly
                </a>
              </div>
              <div className="mt-6">
                <OfficialNumberBadge light />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Direct contact ── */}
      <section className="bg-cream py-12">
        <div className="container-wide">
          <div className="mx-auto max-w-xl rounded-2xl border border-brown-deep/8 bg-white p-8 shadow-card text-center">
            <p className="font-display text-xl text-brown-deep">Prefer to call?</p>
            <p className="mt-2 font-sans text-sm text-ink/60">
              Ms. Djehamie answers personally to find the time that works for you.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href={`tel:${business.phone}`} className="btn-primary">
                <PhoneIcon className="h-4 w-4" /> {business.phoneDisplay}
              </a>
              <span className="inline-flex items-center gap-2 font-sans text-sm text-ink/55">
                <ClockIcon className="h-4 w-4 text-caramel" /> {business.hours}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment terms ── */}
      <section className="bg-cream pb-16">
        <div className="container-wide">
          <div className="mx-auto max-w-xl rounded-2xl border border-caramel/25 bg-caramel/8 p-8 text-center">
            <span className="grid mx-auto h-11 w-11 place-items-center rounded-xl border border-caramel/40 bg-caramel/10 text-caramel">
              💳
            </span>
            <p className="mt-4 font-display text-xl text-brown-deep">How does payment work?</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">
              {paymentPolicy}
            </p>
          </div>
        </div>
      </section>

      {/* ── Anti-scam: the reason this site exists ── */}
      <AntiScamSection />
    </>
  );
}

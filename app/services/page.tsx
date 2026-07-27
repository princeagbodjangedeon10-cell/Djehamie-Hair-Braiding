import type { Metadata } from "next";
import Image from "next/image";
import {
  servicesFemme,
  servicesHomme,
  servicesHommeExtra,
  serviceNote,
  business,
  smsLink,
  defaultSmsBody,
  type Service,
} from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui";
import { PhoneIcon, ArrowIcon } from "@/components/Icons";
import { BookingButton } from "@/components/BookingButton";
import { OfficialNumberBadge } from "@/components/AntiScam";

export const metadata: Metadata = {
  title: "Services: braids for women & men, quote-based",
  description:
    "African hair braiding services in Chicago for women and men: boho knotless, box braids, Senegalese twists, cornrows, goddess locs. Quote-based pricing, discussed directly with the braider at (773) 801-9351.",
};

function ServiceCard({ s }: { s: Service }) {
  const sms = smsLink(`${defaultSmsBody}${s.name}.`);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brown-deep/8 bg-white shadow-card transition-all duration-300 hover:border-caramel/30 hover:shadow-warm-sm">
      {s.img && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={s.img}
            alt={s.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/40 to-transparent" />
          {s.tag && (
            <span className="absolute right-3 top-3 rounded-full bg-caramel px-3 py-1 font-sans text-[0.6rem] font-bold uppercase tracking-widest text-cream">
              {s.tag}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-brown-deep sm:text-2xl">{s.name}</h3>
          {!s.img && s.tag && (
            <span className="shrink-0 rounded-full bg-caramel/12 px-3 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-caramel">
              {s.tag}
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink/70">
          {s.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-brown-deep/8 pt-4">
          <span className="rounded-full bg-caramel/10 px-3 py-1 font-sans text-xs font-semibold text-caramel">
            Quote-based
          </span>
          <a
            href={sms}
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-brown-deep transition-colors group-hover:text-caramel"
          >
            Ask by text <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title={
          <>
            The service <span className="italic text-caramel">menu</span>
          </>
        }
        intro="From classic braids to bohemian finishes, for her and for him. No prices displayed: every hairstyle is unique, so pricing is discussed directly with the braider."
      />

      {/* ══════════ WOMEN'S SERVICES ══════════ */}
      <section id="women" className="bg-cream py-20">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow text-caramel">
              <span className="h-px w-8 bg-current" /> For her
            </span>
            <h2 className="mt-3 font-display text-4xl text-brown-deep sm:text-5xl">
              Women&apos;s <span className="italic text-caramel">Services</span>
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-ink/60">
              Every photo below is real work from the salon. Length, thickness, and colors
              adapt to your wishes.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicesFemme.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 80}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MEN'S SERVICES ══════════ */}
      <section id="men" className="bg-cream-200 py-20">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow text-caramel">
              <span className="h-px w-8 bg-current" /> For him
            </span>
            <h2 className="mt-3 font-display text-4xl text-brown-deep sm:text-5xl">
              Men&apos;s <span className="italic text-caramel">Services</span>
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-ink/60">
              Box braids, twists, cornrows, and custom patterns, all with crisp edges and a
              polished finish.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicesHomme.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 80}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </div>

          {/* À la carte men's styles */}
          <Reveal>
            <div className="mt-10 rounded-2xl border border-brown-deep/8 bg-white p-8 shadow-card">
              <h3 className="font-display text-2xl text-brown-deep">
                Also available for men
              </h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {servicesHommeExtra.map((name) => (
                  <a
                    key={name}
                    href={smsLink(`${defaultSmsBody}${name}.`)}
                    className="rounded-full border border-brown-deep/15 px-4 py-2 font-sans text-sm text-ink/70 transition-colors hover:border-caramel hover:text-caramel"
                  >
                    {name}
                  </a>
                ))}
              </div>
              <p className="mt-4 font-sans text-xs text-ink/45">
                Tap a style to send your request directly by text.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ NOTE + CTA ══════════ */}
      <section className="bg-cream py-16">
        <div className="container-wide">
          <p className="mx-auto max-w-2xl text-center font-sans text-sm leading-relaxed text-ink/55">
            {serviceNote}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookingButton className="btn-primary">
              Book my appointment
            </BookingButton>
            <a href={`tel:${business.phone}`} className="btn-outline">
              <PhoneIcon className="h-4 w-4" /> {business.phoneDisplay}
            </a>
          </div>
          <div className="mt-6 text-center">
            <OfficialNumberBadge />
          </div>
        </div>
      </section>
    </>
  );
}

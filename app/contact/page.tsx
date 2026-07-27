import type { Metadata } from "next";
import { business } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import {
  MapPinIcon, PhoneIcon, ClockIcon,
  InstagramIcon, FacebookIcon, TikTokIcon, ArrowIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact & address: 3111 W Armitage Ave, Chicago",
  description:
    "Contact Djehamie Hair Braiding in Chicago: 3111 W Armitage Ave, (773) 801-9351, the salon's only official number. Call, text, and social media. Open 7 days a week by appointment.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s get in{" "}
            <span className="italic text-caramel">touch</span>
          </>
        }
        intro="A question, or some advice before booking? Call, write, or come straight to the salon."
      />

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact details */}
          <div className="space-y-4">
            <InfoCard icon={<MapPinIcon className="h-5 w-5" />} title="Address">
              <p className="font-sans text-sm text-ink/70">{business.address}</p>
              <a
                href={business.googleProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-caramel transition-colors hover:text-brown-deep"
              >
                Directions <ArrowIcon className="h-3.5 w-3.5" />
              </a>
            </InfoCard>

            <InfoCard icon={<PhoneIcon className="h-5 w-5" />} title="Phone & Text">
              <a
                href={`tel:${business.phone}`}
                className="font-sans text-sm text-ink/70 transition-colors hover:text-caramel"
              >
                {business.phoneDisplay}
              </a>
              <div className="mt-3 flex gap-2">
                <a
                  href={`tel:${business.phone}`}
                  className="rounded-full bg-caramel px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-gold-dark hover:shadow-warm-sm"
                >
                  Call
                </a>
                <a
                  href={`sms:${business.phone}`}
                  className="rounded-full border border-brown-deep/20 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-brown-deep transition-all hover:bg-brown-deep hover:text-cream"
                >
                  Send a text
                </a>
              </div>
            </InfoCard>

            <InfoCard icon={<ClockIcon className="h-5 w-5" />} title="Hours">
              <p className="font-sans text-sm text-ink/70">{business.hours}</p>
            </InfoCard>

            {/* Anti-scam reminder */}
            <div className="rounded-2xl border border-caramel/30 bg-caramel/8 p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-caramel">
                ⚠ Beware of impersonators
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink/70">
                <strong>{business.phoneDisplay}</strong> is the salon&apos;s only official number.
                Payment is made in person before your service; only early-morning appointments
                (before 8 AM) require a half-price deposit by Zelle to that same number,
                requested by Djehamie herself. If in doubt,{" "}
                <a href="/booking#verification" className="font-semibold text-caramel hover:underline">
                  check here
                </a>.
              </p>
            </div>

            <div className="rounded-2xl border border-brown-deep/8 bg-white p-6 shadow-card">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/55">Follow us</p>
              <div className="mt-4 flex gap-3">
                <Social href={business.instagram} label="Instagram"><InstagramIcon /></Social>
                <Social href={business.facebook} label="Facebook"><FacebookIcon /></Social>
                <Social href={business.tiktok} label="TikTok"><TikTokIcon /></Social>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[2rem] border border-brown-deep/8 bg-white p-8 shadow-warm-sm sm:p-10">
            <h2 className="font-display text-3xl text-brown-deep">Write to us</h2>
            <p className="mt-2 font-sans text-sm text-ink/60">
              Fill out the form and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="container-wide mt-12">
          <div className="overflow-hidden rounded-[2rem] border border-brown-deep/10 shadow-card">
            <iframe
              src={business.mapsEmbed}
              title="Map of Djehamie Hair Braiding, 3111 W Armitage Ave, Chicago"
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-brown-deep/8 bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-caramel/30 bg-caramel/8 text-caramel">
          {icon}
        </span>
        <h3 className="font-display text-xl text-brown-deep">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-brown-deep/15 text-brown-deep transition-all hover:border-caramel hover:bg-caramel hover:text-cream"
    >
      {children}
    </a>
  );
}

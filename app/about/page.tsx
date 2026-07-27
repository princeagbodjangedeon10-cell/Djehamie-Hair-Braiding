import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { google } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui";
import { ArrowIcon } from "@/components/Icons";
import { AntiScamSection } from "@/components/AntiScam";

export const metadata: Metadata = {
  title: "About & the founder's story",
  description:
    "The story of Djehamie Hair Braiding, a family-owned African hair braiding salon in Chicago. An art learned from a young age, turned into a passion that has already won over hundreds of clients.",
};

const values = [
  {
    t: "An art, not just a job",
    d: "Braiding is a craft learned in childhood and perfected over years. Every hairstyle carries the pride of taking this art to the highest level.",
  },
  {
    t: "Patience & precision",
    d: "Every strand counts. The work is meticulous, never rushed, always adapted to your scalp.",
  },
  {
    t: "A family house",
    d: "A family-run salon where you are welcomed with kindness and cared for from the first moment to the last.",
  },
  {
    t: "Satisfaction above all",
    d: "A client's smile at the end of a service is our true reward. That feeling of accomplishment drives us every single day.",
  },
];

const stats = [
  { k: `${google.rating} ★`, v: "Google rating" },
  { k: `${google.reviewCount}`, v: "Verified reviews" },
  { k: "100+", v: "Happy clients" },
  { k: "7/7", v: "By appointment" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={
          <>
            Braiding as a{" "}
            <span className="italic text-caramel">way of life</span>
          </>
        }
        intro="Behind every hairstyle: a passionate artist and a family business that made African braiding its pride."
      />

      {/* The founder's story */}
      <section className="bg-cream py-20">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-warm">
              <Image
                src="/images/Fondatrice.jpeg"
                alt="The founder of Djehamie Hair Braiding"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-brown-deep/10" />
              {/* Caption card */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-brown-deep/80 px-5 py-4 backdrop-blur-sm">
                <p className="font-display text-lg text-cream">Ms. Djehamie</p>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-caramel">
                  Founder & Afro hair specialist
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow text-caramel">
              <span className="h-px w-8 bg-current" /> The founder
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-brown-deep">
              An art learned in childhood,{" "}
              <span className="italic">carried to the top</span>
            </h2>
            <div className="mt-5 space-y-4 font-sans text-ink/70 leading-relaxed">
              <p>
                Braiding is an art Djehamie learned from her earliest years. And it is with
                immense pride that she has carried it, year after year, to the level of
                excellence she is known for today.
              </p>
              <p>
                For her, this is not just a job. It is a true passion. The smile and
                satisfaction she reads on every client&apos;s face at the end of a service
                are, in her eyes, an accomplishment in themselves.
              </p>
              <p>
                In this family business, she puts the same care into her work every day, to
                offer an experience like no other.{" "}
                <strong className="text-brown-deep">
                  Djehamie Hair Braiding has already won over hundreds of Americans. Let
                  yourself be won over too.
                </strong>
              </p>
            </div>
            <Link href="/booking" className="btn-primary mt-8">
              Book with Ms. Djehamie <ArrowIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brown-deep py-16 text-cream">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-caramel/40 to-transparent mb-0" />
        <div className="container-wide grid grid-cols-2 gap-8 sm:grid-cols-4 py-16">
          {stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 70}>
              <div className="text-center">
                <p className="font-display text-4xl text-caramel sm:text-5xl">{s.k}</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-wider text-cream/60">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-caramel/40 to-transparent" />
      </section>

      {/* Values */}
      <section className="bg-cream-200 py-20">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="eyebrow text-caramel">
              <span className="h-px w-8 bg-current" /> Our values
            </span>
            <h2 className="mt-4 font-display text-4xl text-brown-deep">
              What guides every appointment
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={(i % 4) * 70}>
                <div className="h-full rounded-2xl border border-brown-deep/8 bg-white p-7 shadow-card transition-all duration-300 hover:border-caramel/30 hover:shadow-warm-sm">
                  <span className="font-display text-2xl text-caramel">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl text-brown-deep">{v.t}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Anti-scam - authenticity is part of our story */}
      <AntiScamSection />

      {/* CTA */}
      <section className="bg-cream py-20">
        <div className="container-wide text-center">
          <Reveal>
            <span className="eyebrow text-caramel justify-center">
              <span className="h-px w-8 bg-current" /> Join the family
            </span>
            <h2 className="mt-5 font-display text-4xl text-brown-deep sm:text-5xl">
              Ready to live the{" "}
              <span className="italic text-caramel">Djehamie</span> experience?
            </h2>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/booking" className="btn-primary">
                Book an appointment <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-outline">Contact us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

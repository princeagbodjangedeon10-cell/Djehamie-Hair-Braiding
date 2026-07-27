import Image from "next/image";
import Link from "next/link";
import { business, google, reviews } from "@/lib/site";
import { Reveal, SectionHeading } from "@/components/ui";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { TestimonialsColumn, type Testimonial } from "@/components/TestimonialsColumn";
import { BookingButton } from "@/components/BookingButton";
import { AntiScamSection, OfficialNumberBadge } from "@/components/AntiScam";

/* ─── "The Djehamie Standard" - 4 quality pillars ─── */
const standards = [
  {
    img: "/images/femme/boho-knotless-noir.png",
    title: "African craftsmanship",
    desc: "An art learned from a young age and perfected over the years. Clean, precise hairstyles that hold week after week.",
  },
  {
    img: "/images/femme/twists-senegalais.png",
    title: "Quality & durability",
    desc: "Every strand is placed with care and patience. A long-lasting result that keeps its shine well beyond day one.",
  },
  {
    img: "/images/homme/homme-cornrows-design.png",
    title: "Women & Men",
    desc: "Boho knotless, box braids, twists, design cornrows… complete know-how, for her and for him.",
  },
  {
    img: "/images/femme/boho-knotless-miel.png",
    title: "Family atmosphere",
    desc: "A warm, family-owned salon with good energy and expert hands. We take care of you from start to finish.",
  },
];

/* ─── Testimonials → 3 animated columns ─── */
const allTestimonials: Testimonial[] = reviews.map((r) => ({
  text: r.text,
  name: r.name,
  role: `${r.when} · ${"★".repeat(r.rating)}`,
  image: "",
}));
const col1 = allTestimonials.filter((_, i) => i % 3 === 0);
const col2 = allTestimonials.filter((_, i) => i % 3 === 1);
const col3 = allTestimonials.filter((_, i) => i % 3 === 2);

export default function HomePage() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/images/salon.png"
      bgImageSrc="/images/femme/knotless-longues.png"
      title="Djehamie Hair Braiding"
      date="Chicago, Illinois"
      scrollToExpand="Scroll to discover"
      subtitle="Professional African hair braiding · Women & Men"
      textBlend
      ctaNode={
        <BookingButton className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-caramel px-7 py-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:bg-gold-dark hover:shadow-warm active:scale-[0.97] sm:px-10 sm:text-sm">
          Book an appointment →
        </BookingButton>
      }
    >

      {/* ══════════════════════════════════════════════════
          1. THE DJEHAMIE STANDARD - 4 photos + quality copy
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#FDFAF6] py-24">
        <div className="container-wide">
          <Reveal>
            <h2 className="text-center font-display text-4xl font-bold text-brown-deep sm:text-5xl">
              The Djehamie Standard
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center font-sans text-lg text-ink/60">
              What every client feels from the very first appointment.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="flex flex-col">
                  <div className="relative h-80 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-brown-deep">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 flex justify-center">
              <Link href="/booking" className="btn-primary">
                Book an appointment →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. TESTIMONIALS - animated scrolling columns
      ══════════════════════════════════════════════════ */}
      <section className="bg-cream py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="What they say"
              title={
                <>
                  {google.rating} stars on Google,{" "}
                  <span className="italic text-caramel">{google.reviewCount} verified reviews</span>
                </>
              }
            />
          </Reveal>
        </div>

        {/* Columns with top/bottom fade mask */}
        <div
          className="mt-14 flex justify-center gap-5 overflow-hidden"
          style={{
            height: "560px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <TestimonialsColumn testimonials={col1} duration={20} />
          <TestimonialsColumn testimonials={col2} duration={25} className="hidden md:block" />
          <TestimonialsColumn testimonials={col3} duration={18} className="hidden lg:block" />
        </div>

        {/* Live Google reviews - Elfsight widget connected to the salon's listing */}
        <div className="container-wide mt-16">
          <div
            className="elfsight-app-705107d7-a332-44cb-9cfa-5bf9736e04b8"
            data-elfsight-app-lazy
          />
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <a
              href={business.googleProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              See all Google reviews →
            </a>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════
          3. ANTI-SCAM - make sure it's really us
      ══════════════════════════════════════════════════ */}
      <AntiScamSection />

      {/* ══════════════════════════════════════════════════
          4. FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="bg-cream py-24">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[3rem] bg-brown-deep px-8 py-20 text-center text-cream sm:px-16">
            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-caramel/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-0 h-60 w-60 rounded-full border border-caramel/20" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full border border-gold/15" />

            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow justify-center text-caramel">
                <span className="h-px w-8 bg-current" /> Ready for your new look?
              </span>
              <h2 className="mt-5 text-balance font-display text-4xl font-bold leading-tight sm:text-5xl">
                Book in a few seconds
              </h2>
              <p className="mx-auto mt-5 max-w-md font-sans text-cream/70">
                Open 7 days a week, by appointment. Pick your style, send your request by
                text, and Djehamie replies to you personally.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <BookingButton className="btn-gold">
                  Book an appointment →
                </BookingButton>
                <a href={`tel:${business.phone}`} className="btn-cream-outline">
                  {business.phoneDisplay}
                </a>
              </div>
              <div className="mt-6">
                <OfficialNumberBadge light />
              </div>
            </div>
          </div>
        </div>
      </section>

    </ScrollExpandMedia>
  );
}

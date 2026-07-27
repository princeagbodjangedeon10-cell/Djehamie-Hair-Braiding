import type { Metadata } from "next";
import { gallery, galleryHomme, business, smsLink, defaultSmsBody } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";
import { InstagramIcon, ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/ui";
import { OfficialNumberBadge } from "@/components/AntiScam";

export const metadata: Metadata = {
  title: "Gallery: our work for women & men",
  description:
    "Portfolio of hairstyles done at Djehamie Hair Braiding in Chicago: boho knotless, box braids, Senegalese twists, goddess locs, men's cornrows. Authentic salon photos.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The portfolio"
        title={
          <>
            Our <span className="italic text-caramel">work</span>
          </>
        }
        intro="Photos taken right at the salon. Every hairstyle tells a story of patient craftsmanship and flawless finishing."
      />

      {/* ══════════ WOMEN ══════════ */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow text-caramel">
              <span className="h-px w-8 bg-current" /> For her
            </span>
            <h2 className="mb-10 mt-3 font-display text-4xl text-brown-deep">
              Women&apos;s <span className="italic text-caramel">Styles</span>
            </h2>
          </Reveal>

          <GalleryGrid items={gallery} />
        </div>
      </section>

      {/* ══════════ MEN ══════════ */}
      <section className="bg-cream-200 py-16 lg:py-20">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow text-caramel">
              <span className="h-px w-8 bg-current" /> For him
            </span>
            <h2 className="mb-10 mt-3 font-display text-4xl text-brown-deep">
              Men&apos;s <span className="italic text-caramel">Styles</span>
            </h2>
          </Reveal>

          <GalleryGrid items={galleryHomme} />

          <Reveal>
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="max-w-xl font-sans text-sm text-ink/60">
                Spotted a style you love? Text us its name and the braider replies to you
                personally with a quote.
              </p>
              <a href={smsLink(defaultSmsBody)} className="btn-primary">
                Ask for a quote by text <ArrowIcon className="h-4 w-4" />
              </a>
              <OfficialNumberBadge />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ INSTAGRAM ══════════ */}
      <section className="bg-cream py-16">
        <div className="container-wide">
          <div className="overflow-hidden rounded-[2rem] border border-brown-deep/8 bg-white p-8 sm:p-12">
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brown-deep to-caramel text-cream">
                <InstagramIcon className="h-6 w-6" />
              </span>
              <div className="max-w-xl">
                <h2 className="font-display text-3xl text-brown-deep">
                  Even more of our work
                </h2>
                <p className="mt-3 font-sans text-ink/65">
                  Follow{" "}
                  <span className="font-semibold text-caramel">{business.instagramHandle}</span>{" "}
                  to see the salon&apos;s latest creations.
                </p>
              </div>
              <a href={business.instagram} target="_blank" rel="noreferrer" className="btn-primary">
                Follow on Instagram <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

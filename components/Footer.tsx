import Link from "next/link";
import { business, nav, google } from "@/lib/site";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-brown-deep text-cream"
      style={{ backgroundColor: "var(--color-brown-deep)", color: "var(--color-cream)" }}
    >
      {/* Ligne décorative dorée en haut */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-caramel/60 to-transparent" />

      <div className="container-wide relative py-16 lg:py-20">
        {/* Section supérieure : CTA + note */}
        <div className="flex flex-col gap-8 border-b border-cream/10 pb-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-caramel">
              <span className="h-px w-8 bg-current" /> Join our {google.reviewCount}+ happy clients
            </p>
            <h3 className="mt-3 max-w-lg font-display text-3xl leading-snug text-cream">
              {google.rating} stars,{" "}
              <span className="italic text-gold">the best braider in Chicago.</span>
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/booking" className="btn-gold">Book now</Link>
            <a
              href={business.googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-cream-outline text-center"
            >
              Leave a review ★
            </a>
          </div>
        </div>

        {/* Colonnes */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="font-display text-2xl text-cream">Djehamie</span>
            <p className="mt-1 font-sans text-xs uppercase tracking-[0.28em] text-caramel">Hair Braiding · Chicago</p>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-cream/60">
              Professional African hair braiding salon. Authentic African craftsmanship, 10+ years of expertise.
            </p>
            <div className="mt-7 flex gap-3">
              <SocialLink href={business.instagram} label="Instagram">IG</SocialLink>
              <SocialLink href={business.tiktok} label="TikTok">TK</SocialLink>
              <SocialLink href={business.facebook} label="Facebook">FB</SocialLink>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-caramel">Navigation</h4>
            <ul className="mt-5 space-y-3 font-sans text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/65 transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/booking" className="text-cream/65 transition-colors hover:text-gold">
                  Booking
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-cream/65 transition-colors hover:text-gold">
                  Good to know
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-caramel">Contact</h4>
            <ul className="mt-5 space-y-4 font-sans text-sm text-cream/65">
              <li className="flex gap-3">
                <span className="mt-0.5 text-caramel">📍</span>
                <span>{business.address}</span>
              </li>
              <li>
                <a href={`tel:${business.phone}`} className="flex gap-3 transition-colors hover:text-gold">
                  <span className="text-caramel">📞</span>
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-caramel">🕐</span>
                <span>{business.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-caramel">Google rating</h4>
            <div className="mt-5 flex items-center gap-4">
              <span className="font-display text-5xl text-cream">{google.rating}</span>
              <div>
                <div className="flex text-caramel">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="mt-1 font-sans text-xs text-cream/55">{google.reviewCount} verified reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-cream/10 pt-8">
          <p className="mb-5 rounded-2xl border border-caramel/25 bg-caramel/10 px-5 py-4 text-center font-sans text-xs leading-relaxed text-cream/75">
            🔒 Official website of {business.name}. All bookings happen exclusively by text or
            call at <a href={`tel:${business.phone}`} className="font-semibold text-gold hover:underline">{business.phoneDisplay}</a>.
            You never pay upfront: payment is made at the salon once your braids are halfway done.
            Only early-morning appointments (before 8 AM) require a
            half-price deposit by Zelle to that same number, requested by Djehamie herself.
            Beware of accounts impersonating our name.
          </p>
          <div className="flex flex-col gap-3 font-sans text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
            <p>Chicago, Illinois · USA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 font-sans text-xs font-semibold text-cream/70 transition-all duration-300 hover:border-caramel hover:bg-caramel hover:text-brown-deep"
    >
      {children}
    </a>
  );
}

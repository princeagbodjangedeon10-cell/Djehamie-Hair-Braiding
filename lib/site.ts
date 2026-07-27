// =============================================================
//  Central site data - Djehamie Hair Braiding
//  Editing this file is enough to update the site content.
// =============================================================

export const business = {
  name: "Djehamie Hair Braiding",
  shortName: "Djehamie",
  tagline: "The art of African braiding, in Chicago",
  legalCity: "Chicago, Illinois",
  address: "3111 W Armitage Ave, Chicago, IL 60647",
  addressShort: "3111 W Armitage Ave, Chicago, IL",
  phoneDisplay: "(773) 801-9351",
  phone: "+17738019351",
  hours: "Open 7 days a week · by appointment · until 11 PM",
  instagram: "https://www.instagram.com/djehamiehair/",
  instagramHandle: "@djehamiehair",
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/@djehamiehair",
  googleReviewUrl:
    "https://www.google.com/maps/search/Djehamie+Hair+Braiding+Chicago",
  googleProfileUrl:
    "https://www.google.com/maps/search/Djehamie+Hair+Braiding+Chicago",
  mapsEmbed:
    "https://www.google.com/maps?q=3111+W+Armitage+Ave+Chicago+IL+60647&output=embed",
};

export const google = {
  rating: 4.8,
  reviewCount: 194,
  distribution: { 5: 88, 4: 6, 3: 3, 2: 1, 1: 2 }, // approx. % (Google listing)
};

/* ─────────────────────────────────────────────────────────────
   Booking by text message - THE official channel.
   Every request lands on Djehamie's work number:
   that is the #1 protection against impersonators.
───────────────────────────────────────────────────────────── */
export function smsLink(body?: string) {
  const base = `sms:${business.phone}`;
  if (!body) return base;
  return `${base}?&body=${encodeURIComponent(body)}`;
}

export const defaultSmsBody =
  "Hi Djehamie! I'm reaching out from your official website. I'd like to book a hairstyle: ";

/* ─────────────────────────────────────────────────────────────
   Anti-scam - impersonators are using the salon's name.
   These rules are displayed on the site to protect clients.
───────────────────────────────────────────────────────────── */
export const antiScam = {
  title: "Make sure it's really us",
  intro:
    "Ill-intentioned people impersonate Djehamie Hair Braiding to scam clients. This is the salon's only official website. Take 10 seconds to check these three points before booking anything:",
  rules: [
    {
      t: "One official number only",
      d: "All bookings happen exclusively by text or call at (773) 801-9351. It's the number displayed on the salon's neon sign and on our Google listing. No other number speaks for us.",
    },
    {
      t: "Deposit by Zelle, one case only",
      d: "Appointments starting at 8:00 AM or later require no deposit: you pay at the salon, before your service begins. Only early-morning appointments (before 8 AM, since Djehamie starts as early as 4 AM) require a deposit of half the braid price the night before. That deposit is paid by Zelle to (773) 801-9351 only, and Djehamie sends you the Zelle request herself from that number. That request is your proof. Any other payment request is a scam.",
    },
    {
      t: "One address only",
      d: "The salon is located at 3111 W Armitage Ave, Chicago, IL 60647, and nowhere else. Exact pricing is discussed directly with the braider, in person or by text.",
    },
  ],
  reminder:
    "If you have any doubt about an account, a listing or a message you received, call (773) 801-9351 directly before paying anything.",
};

// Payment policy - shown on the booking and services pages.
export const paymentPolicy =
  "Appointments starting at 8:00 AM or later: no deposit. You simply pay at the salon, before your service begins. Early-morning appointments (before 8:00 AM, since Djehamie starts as early as 4:00 AM) need a deposit of half the braid price the night before, because early slots are too often missed. The deposit is paid by Zelle to the official number (773) 801-9351 only. Djehamie sends you the Zelle request herself from that number, and that request is your proof. Never send a deposit to any other number or name.";

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  name: string;
  description: string;
  img?: string;
  tag?: string;
};

/* ─────────────────────────────────────────────────────────────
   WOMEN's services - no prices displayed: everything is
   quote-based, discussed directly with the braider.
───────────────────────────────────────────────────────────── */
export const servicesFemme: Service[] = [
  {
    name: "Boho Knotless Braids",
    description:
      "Knotless braids blended with free-flowing curly strands, the light and natural bohemian look the salon is known for. Colors of your choice, from honey ombré to deep black.",
    img: "/images/femme/boho-knotless-miel.png",
    tag: "Signature",
  },
  {
    name: "Knotless Braids",
    description:
      "No knot at the root: lighter, more comfortable, and tension-free on your scalp. Flawless finish from nape to ends.",
    img: "/images/femme/knotless-braids.png",
    tag: "Popular",
  },
  {
    name: "Box Braids",
    description:
      "The timeless classic: clean square sections, length and thickness of your choice. A protective style that keeps its shine week after week.",
    img: "/images/femme/knotless-longues.png",
  },
  {
    name: "Boho / Goddess Braids",
    description:
      "Bohemian braids with a romantic finish, sprinkled with soft curls. Perfect for vacation, weddings, or every day.",
    img: "/images/femme/boho-braids.png",
    tag: "Trending",
  },
  {
    name: "Goddess Faux Locs",
    description:
      "The loc look without the commitment: airy, curly locs worn loose or half-up. A bold, highly requested style.",
    img: "/images/femme/goddess-locs.png",
  },
  {
    name: "Senegalese Twists",
    description:
      "Thin, silky, glossy twists. A clean, sophisticated result, with the option of adding colored accent strands.",
    img: "/images/femme/twists-senegalais.png",
  },
  {
    name: "Boho Twists",
    description:
      "Bohemian twists blended with loose curls, from fiery copper to natural black. Volume, movement, and softness.",
    img: "/images/femme/boho-twists.png",
  },
  {
    name: "Micro Braids",
    description:
      "Ultra-thin, almost invisible braids, worn loose or in a high ponytail. Precision work, Djehamie style.",
    img: "/images/femme/micro-braids.png",
  },
  {
    name: "Lemonade / Styled Cornrows",
    description:
      "Side-swept or patterned cornrows, with or without ombré. Perfect geometry and sculpted baby hairs.",
    img: "/images/femme/lemonade-braids.png",
  },
  {
    name: "Feed-in Braids",
    description:
      "Cornrows with extensions fed in gradually for a natural look from the root. Our clients' favorite before/after transformation.",
    img: "/images/femme/feed-in-braids.png",
  },
  {
    name: "Kids' hairstyles",
    description:
      "Gentle braids adapted to little ones, done with patience in a warm, family atmosphere.",
  },
  {
    name: "Weddings & events",
    description:
      "Custom hairstyles for your big occasions, with personalized advice on style, colors, and accessories.",
  },
];

/* ─────────────────────────────────────────────────────────────
   MEN's services - selected photos + à la carte styles.
───────────────────────────────────────────────────────────── */
export const servicesHomme: Service[] = [
  {
    name: "Men's Box Braids",
    description:
      "Clean, well-defined medium-length square braids. The go-to urban style, with crisp edges.",
    img: "/images/homme/homme-box-braids.png",
    tag: "Popular",
  },
  {
    name: "Long Box Braids",
    description:
      "Box braids worn long, with precise sections and a natural fall. For a bold look that lasts.",
    img: "/images/homme/homme-box-braids-longues.png",
  },
  {
    name: "Men's Twists",
    description:
      "Two-strand twists on natural hair or with extensions. Volume, texture, and easy upkeep.",
    img: "/images/homme/homme-twists.png",
  },
  {
    name: "Design Cornrows",
    description:
      "Curved or geometric cornrow patterns, custom-designed to match your style.",
    img: "/images/homme/homme-cornrows-design.png",
    tag: "Custom",
  },
  {
    name: "Cornrows with Braid",
    description:
      "Classic cornrows gathered into a single braid at the back. Perfect with a fresh fade.",
    img: "/images/homme/homme-cornrows-natte.png",
  },
  {
    name: "Braids & Beads",
    description:
      "Box braids or twists finished with beads and rings, a personal touch that makes the difference.",
    img: "/images/homme/homme-tresses-perles.png",
  },
];

// Additional men's styles (no photo) - quote-based, like everything else.
export const servicesHommeExtra: string[] = [
  "Simple cornrows (4 to 8 rows)",
  "Flat twists",
  "Pop Smoke braids",
  "Zig-zag & freestyle patterns",
  "Retwist / twist maintenance",
  "Edge & baby hair touch-up",
];

export const serviceNote =
  "No prices are displayed: every hairstyle is unique. The exact price is discussed directly with the braider, by text or at the salon, based on length, thickness, and the chosen style.";

export type GalleryItem = {
  src: string;
  alt: string;
  style: string;
  span?: boolean; // spans two rows in the grid
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/femme/knotless-longues.png",
    alt: "Long black knotless braids with clean sections, done at the salon",
    style: "Knotless Braids",
    span: true,
  },
  {
    src: "/images/femme/goddess-locs.png",
    alt: "Curly goddess faux locs worn half-up, done at Djehamie's salon",
    style: "Goddess Faux Locs",
  },
  {
    src: "/images/femme/twists-senegalais.png",
    alt: "Thin auburn Senegalese twists with pink accent strands",
    style: "Senegalese Twists",
  },
  {
    src: "/images/femme/boho-knotless-miel.png",
    alt: "Honey ombré boho knotless braids with curly ends",
    style: "Boho Knotless, Honey Ombré",
    span: true,
  },
  {
    src: "/images/femme/lemonade-braids.png",
    alt: "Side-swept lemonade braids with honey ombré",
    style: "Lemonade Braids",
  },
  {
    src: "/images/femme/boho-knotless-noir.png",
    alt: "Black boho knotless braids with curly finish",
    style: "Boho Knotless",
  },
  {
    src: "/images/femme/boho-twists.png",
    alt: "Copper boho twists, front and back view, done at the salon",
    style: "Boho Twists",
  },
  {
    src: "/images/femme/micro-braids.png",
    alt: "Burgundy micro braids in a high ponytail",
    style: "Micro Braids",
  },
  {
    src: "/images/femme/boho-braids.png",
    alt: "Dark brown boho braids with natural curls",
    style: "Boho Braids",
    span: true,
  },
  {
    src: "/images/femme/knotless-braids.png",
    alt: "Black knotless braids worn to the side",
    style: "Knotless Braids",
  },
  {
    src: "/images/femme/feed-in-braids.png",
    alt: "Before/after transformation: copper feed-in braids",
    style: "Feed-in Braids, Before & After",
  },
];

export const galleryHomme: GalleryItem[] = [
  {
    src: "/images/homme/homme-box-braids.png",
    alt: "Men's medium-length box braids with crisp edges",
    style: "Men's Box Braids",
  },
  {
    src: "/images/homme/homme-box-braids-longues.png",
    alt: "Men's long box braids with precise sections",
    style: "Long Box Braids",
  },
  {
    src: "/images/homme/homme-twists.png",
    alt: "Men's two-strand twists on natural hair",
    style: "Men's Twists",
  },
  {
    src: "/images/homme/homme-cornrows-design.png",
    alt: "Men's cornrows in curved design patterns",
    style: "Design Cornrows",
  },
  {
    src: "/images/homme/homme-cornrows-natte.png",
    alt: "Men's cornrows with back braid and fade",
    style: "Cornrows with Braid",
  },
  {
    src: "/images/homme/homme-tresses-perles.png",
    alt: "Men's braids finished with beads",
    style: "Braids & Beads",
  },
];

export type Review = {
  name: string;
  text: string;
  when: string;
  rating: number;
};

// Authentic Google reviews (Google listing - 4.8 rating / 194 reviews)
export const reviews: Review[] = [
  {
    name: "Isabelle S.",
    text: "Djehamie hair braiding is the best in Chicago. I travel from Indy all the way to her to get my hair done. She is that good and the service is beyond expectation. I recommend her 100 %.",
    when: "6 months ago",
    rating: 5,
  },
  {
    name: "Nzinga O.",
    text: "Amazing! I called her around 8 am and she was able to do my hair by 10:30 am. She's SUPER nice, the place is really clean and her braids are perfectly neat. 10/10.",
    when: "3 months ago",
    rating: 5,
  },
  {
    name: "Belinda D.",
    text: "Djehamie Hair Braiding really impresses. It's a family vibe, her family crew is so polite and thoughtful. Her braiding skills are top notch: fast, efficient, long lasting and beautiful.",
    when: "6 months ago",
    rating: 5,
  },
  {
    name: "Narobi C.",
    text: "I first went here 3 years ago and I have not had my hair braided by anyone else. Ms. Djehamie is one of the sweetest and hardworking people I have met. She is very precise.",
    when: "a year ago",
    rating: 5,
  },
  {
    name: "Wendy R.",
    text: "I've been coming to this lovely woman for a few years now. She never disappoints me. She has blessed hands and does it all with love. Very accommodating and always sensitive to your needs.",
    when: "6 months ago",
    rating: 5,
  },
  {
    name: "Kathryn R.",
    text: "I have been coming to Djehamie for eight months and each time I have been extremely satisfied. This shop has been the best experience I've had with hair braiding so far.",
    when: "6 months ago",
    rating: 5,
  },
];

import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brown-deep": "#5C2E0E",
        "brown-mid": "#8B4513",
        caramel: "#C68642",
        gold: { DEFAULT: "#C9A96E", light: "#DFC89A", dark: "#A07A40" },
        cream: { DEFAULT: "#F5EDE3", 50: "#FBF7EF", 100: "#F5EDE3", 200: "#EFE0CE" },
        ink: "#1A1A1A",
        // Aliases pour la compatibilité avec le code existant
        espresso: { DEFAULT: "#5C2E0E", 600: "#8B4513", 700: "#4A2008", 800: "#3A1808" },
        rust: { DEFAULT: "#C68642", dark: "#A07A40" },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.22em" },
      boxShadow: {
        warm: "0 24px 56px -16px rgba(92,46,14,0.35)",
        "warm-sm": "0 8px 24px -8px rgba(92,46,14,0.25)",
        "card": "0 2px 16px rgba(92,46,14,0.08)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(32px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "float": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1.1s ease both",
        "marquee": "marquee 28s linear infinite",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  safelist: [
    // Backgrounds
    "bg-brown-deep", "bg-brown-mid", "bg-caramel", "bg-cream",
    "bg-cream-200", "bg-gold", "bg-gold-dark", "bg-gold-light",
    // Text
    "text-brown-deep", "text-brown-mid", "text-caramel", "text-cream",
    "text-gold", "text-ink",
    // Borders
    "border-brown-deep", "border-caramel",
    // Hover
    "hover:bg-brown-mid", "hover:bg-caramel", "hover:bg-gold-dark",
    // Ring (booking modal)
    "ring-2", "ring-caramel", "ring-caramel/30",
    // Line clamp (booking service cards)
    "line-clamp-2",
    // Shadow warm (used dynamically)
    "shadow-warm", "shadow-warm-sm", "shadow-card",
  ],
  plugins: [],
};
export default config;

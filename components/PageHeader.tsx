export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-brown-deep pt-[72px] text-cream"
      style={{ backgroundColor: "var(--color-brown-deep)", color: "var(--color-cream)" }}
    >
      {/* Cercles décoratifs */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-caramel/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-gold/8 blur-2xl" />
      {/* Ligne dorée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-caramel/50 to-transparent" />

      <div className="container-wide relative py-16 lg:py-24">
        <span className="eyebrow text-caramel animate-fade-up">
          <span className="h-px w-8 bg-current" /> {eyebrow}
        </span>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-5xl font-bold leading-[1] sm:text-6xl animate-fade-up">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-cream/70 animate-fade-up">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

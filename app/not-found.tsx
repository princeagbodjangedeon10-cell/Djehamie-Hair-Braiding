import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-cream px-6 pt-[72px] text-center">
      <div>
        <p className="font-display text-7xl text-caramel">404</p>
        <h1 className="mt-4 font-display text-3xl text-brown-deep">This page came undone</h1>
        <p className="mx-auto mt-3 max-w-sm font-sans text-ink/65">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </section>
  );
}

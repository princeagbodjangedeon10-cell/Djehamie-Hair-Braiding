"use client";

import { useState } from "react";
import { business, smsLink } from "@/lib/site";
import { ArrowIcon } from "./Icons";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Hi Djehamie! Message from your official website: ${form.message}. From ${form.name}${form.email ? ` (${form.email})` : ""}`;
    window.location.href = smsLink(body);
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-brown-deep/15 bg-cream-50 px-4 py-3 font-sans text-ink placeholder:text-ink/40 outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/25";
  const label =
    "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-ink/55";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={label} htmlFor="cname">Name</label>
        <input
          id="cname"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={field}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className={label} htmlFor="cemail">Email (optional)</label>
        <input
          id="cemail"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={field}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className={label} htmlFor="cmsg">Message</label>
        <textarea
          id="cmsg"
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={field}
          placeholder="How can we help you?"
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        Send by text <ArrowIcon className="h-4 w-4" />
      </button>
      {sent && (
        <p className="rounded-xl bg-caramel/10 px-4 py-3 text-center font-sans text-sm text-brown-deep">
          Thank you! Your messaging app is opening to finish sending to {business.phoneDisplay}.
        </p>
      )}
      <p className="text-center font-sans text-xs text-ink/40">
        Your message goes straight to the salon&apos;s official number: {business.phoneDisplay}.
      </p>
    </form>
  );
}

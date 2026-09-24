"use client";
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useBooking } from "./BookingProvider";
import type { BookingService } from "./BookingProvider";
import { BOOKING_SERVICES, SERVICE_CATEGORIES } from "./services-data";
import { business, smsLink, bookingEssentials, salonPolicies, policyHighlight } from "@/lib/site";

/* ────────────────────────────────────────────────────────── *
 *  Helpers calendrier                                        *
 * ────────────────────────────────────────────────────────── */
const DAYS_FR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS_FR = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const TIME_SLOTS = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function isAvailable(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today; // 7j/7 sur rendez-vous, pas dans le passé
}
function formatDate(date: Date) {
  return `${DAYS_FR[date.getDay()]}, ${MONTHS_FR[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/* ────────────────────────────────────────────────────────── *
 *  Slide transition variants                                 *
 * ────────────────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};
const transition = { type: "spring" as const, stiffness: 380, damping: 36 };

/* Pseudo-service: the client describes the exact style they want (free text + photo). */
const CUSTOM_SERVICE: BookingService = {
  id: "custom",
  category: "Custom",
  name: "My own style (described below)",
  duration: "To discuss",
  price: "Quote-based",
  description: "You describe exactly what you want, and you can attach a photo of the style.",
  img: "/images/salon.png",
};

/* ────────────────────────────────────────────────────────── *
 *  Étape 1 - Sélection du service                           *
 * ────────────────────────────────────────────────────────── */
function StepServices({ onSelect }: { onSelect: (s: BookingService) => void }) {
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState<BookingService | null>(null);

  const filtered =
    cat === "All" ? BOOKING_SERVICES : BOOKING_SERVICES.filter((s) => s.category === cat);

  return (
    <div className="flex h-full flex-col">
      {/* Titre */}
      <div className="flex-none px-6 pb-4 pt-6 sm:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-caramel">Step 1 / 4</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-brown-deep sm:text-3xl">
          Choose your style
        </h2>
        <p className="mt-1 font-sans text-sm text-ink/55">
          {BOOKING_SERVICES.length} services available
        </p>
      </div>

      {/* Filtres catégorie */}
      <div className="flex-none overflow-x-auto px-6 pb-3 sm:px-8">
        <div className="flex gap-2">
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`flex-none rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                cat === c
                  ? "bg-brown-deep text-cream"
                  : "border border-brown-deep/20 text-ink/60 hover:border-caramel hover:text-caramel"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grille services */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 sm:px-8">
        {/* Free-text option: describe your own style */}
        <button
          type="button"
          onClick={() => onSelect(CUSTOM_SERVICE)}
          className="mb-4 flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-caramel/40 bg-caramel/5 px-5 py-4 text-left transition-all hover:border-caramel hover:bg-caramel/10"
        >
          <span>
            <span className="block font-display text-base font-semibold text-brown-deep">
              ✏️ Don&apos;t see your style? Describe it yourself
            </span>
            <span className="mt-0.5 block font-sans text-xs text-ink/55">
              Write exactly what you want. You can also add a photo of the style.
            </span>
          </span>
          <span className="shrink-0 font-sans text-lg text-caramel">→</span>
        </button>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const isSel = selected?.id === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelected(isSel ? null : s)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-200 ${
                  isSel
                    ? "border-caramel shadow-warm ring-2 ring-caramel/30"
                    : "border-brown-deep/10 hover:border-caramel/50 hover:shadow-card"
                } bg-white`}
              >
                {/* Image */}
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    sizes="(max-width:640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/50 to-transparent" />
                  {s.tag && (
                    <span className="absolute right-3 top-3 rounded-full bg-caramel px-2.5 py-0.5 font-sans text-[0.6rem] font-bold uppercase tracking-widest text-cream">
                      {s.tag}
                    </span>
                  )}
                  {isSel && (
                    <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-caramel">
                      <svg className="h-3.5 w-3.5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Texte */}
                <div className="p-4">
                  <p className="font-display text-sm font-semibold leading-snug text-brown-deep">
                    {s.name}
                  </p>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-ink/55 line-clamp-2">
                    {s.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-sans text-xs font-semibold text-caramel">{s.price}</span>
                    <span className="font-sans text-[0.65rem] text-ink/40">{s.duration}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bouton continuer */}
      <div className="flex-none border-t border-brown-deep/8 px-6 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className={`w-full rounded-full py-3.5 font-sans text-sm font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
            selected
              ? "bg-brown-deep text-cream hover:bg-caramel"
              : "cursor-not-allowed bg-brown-deep/20 text-ink/30"
          }`}
        >
          {selected ? `Continue with ${selected.name}` : "Select a service"}
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── *
 *  Étape 2 - Calendrier & créneau                           *
 * ────────────────────────────────────────────────────────── */
function StepCalendar({
  onSelect,
  onBack,
}: {
  onSelect: (date: Date, time: string) => void;
  onBack: () => void;
}) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selDate, setSelDate] = useState<Date | null>(null);
  const [selTime, setSelTime] = useState<string | null>(null);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelDate(null); setSelTime(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelDate(null); setSelTime(null);
  };

  const firstDay = getFirstDayOfMonth(year, month);
  const daysCount = getDaysInMonth(year, month);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysCount }, (_, i) => i + 1),
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex-none px-6 pb-4 pt-6 sm:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-caramel">Step 2 / 4</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-brown-deep sm:text-3xl">
          Your preferred time
        </h2>
        <p className="mt-1 font-sans text-sm text-ink/55">
          7 days a week, by appointment. The time will be confirmed by text with Djehamie.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 sm:px-8">
        {/* Navigation mois */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            className="rounded-full border border-brown-deep/15 p-2 text-brown-deep hover:border-caramel hover:text-caramel"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-display text-lg font-semibold text-brown-deep">
            {MONTHS_FR[month]} {year}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="rounded-full border border-brown-deep/15 p-2 text-brown-deep hover:border-caramel hover:text-caramel"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* En-têtes jours */}
        <div className="mb-1 grid grid-cols-7 gap-1">
          {DAYS_FR.map((d) => (
            <div key={d} className="py-1 text-center font-sans text-[0.6rem] font-semibold uppercase tracking-widest text-ink/35">
              {d}
            </div>
          ))}
        </div>

        {/* Grille jours */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const date = new Date(year, month, day);
            const avail = isAvailable(date);
            const isSel = selDate?.toDateString() === date.toDateString();
            return (
              <button
                key={day}
                type="button"
                disabled={!avail}
                onClick={() => { setSelDate(date); setSelTime(null); }}
                className={`aspect-square rounded-xl text-center font-sans text-sm font-medium transition-all duration-150 ${
                  isSel
                    ? "bg-caramel font-bold text-cream shadow-warm"
                    : avail
                    ? "text-brown-deep hover:bg-caramel/15"
                    : "cursor-not-allowed text-ink/20"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Créneaux horaires */}
        {selDate && (
          <div className="mt-6">
            <p className="mb-3 font-sans text-sm font-semibold text-brown-deep">
              {formatDate(selDate)}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelTime(t)}
                  className={`rounded-xl border py-2.5 font-sans text-sm font-semibold transition-all duration-150 ${
                    selTime === t
                      ? "border-caramel bg-caramel text-cream shadow-warm"
                      : "border-brown-deep/15 text-brown-deep hover:border-caramel hover:text-caramel"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex-none border-t border-brown-deep/8 px-6 py-4 sm:px-8">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-none rounded-full border border-brown-deep/20 px-5 py-3.5 font-sans text-sm font-semibold text-brown-deep transition-colors hover:border-caramel hover:text-caramel"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!selDate || !selTime}
            onClick={() => selDate && selTime && onSelect(selDate, selTime)}
            className={`flex-1 rounded-full py-3.5 font-sans text-sm font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
              selDate && selTime
                ? "bg-brown-deep text-cream hover:bg-caramel"
                : "cursor-not-allowed bg-brown-deep/20 text-ink/30"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── *
 *  Étape 3 - Informations client                            *
 * ────────────────────────────────────────────────────────── */
function StepForm({
  booking,
  onSubmit,
  onBack,
}: {
  booking: { service: BookingService | null; date: Date | null; time: string | null };
  onSubmit: (info: { name: string; phone: string; email: string; notes: string; hasPhoto: boolean }) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCustom = booking.service?.id === "custom";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Your name is required";
    if (!phone.trim()) e.phone = "Your phone number is required";
    if (email.trim() && !email.includes("@")) e.email = "Invalid email";
    if (isCustom && !notes.trim()) e.notes = "Please describe the hairstyle you want";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) onSubmit({ name, phone, email, notes, hasPhoto: !!photoPreview });
  };

  const handlePhoto = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const inputClass =
    "w-full rounded-xl border border-brown-deep/20 bg-cream/50 px-4 py-3 font-sans text-sm text-brown-deep placeholder-ink/30 outline-none transition-all focus:border-caramel focus:ring-2 focus:ring-caramel/20";
  const labelClass = "mb-1 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink/60";

  return (
    <div className="flex h-full flex-col">
      <div className="flex-none px-6 pb-4 pt-6 sm:px-8">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-caramel">Step 3 / 4</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-brown-deep sm:text-3xl">
          Your details
        </h2>
        {/* Récapitulatif */}
        {booking.service && booking.date && booking.time && (
          <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-brown-deep/10 bg-cream/60 px-4 py-2">
            <span className="font-sans text-xs font-semibold text-brown-deep">{booking.service.name}</span>
            <span className="h-1 w-1 rounded-full bg-caramel" />
            <span className="font-sans text-xs text-ink/55">
              {formatDate(booking.date)} at {booking.time}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 pb-4 sm:px-8">
          {/* Name */}
          <div>
            <label className={labelClass}>Full name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Last"
              className={inputClass}
            />
            {errors.name && <p className="mt-1 font-sans text-xs text-red-500">{errors.name}</p>}
          </div>
          {/* Phone */}
          <div>
            <label className={labelClass}>Phone *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(773) 000-0000"
              className={inputClass}
            />
            {errors.phone && <p className="mt-1 font-sans text-xs text-red-500">{errors.phone}</p>}
          </div>
          {/* Email */}
          <div>
            <label className={labelClass}>Email address (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className={inputClass}
            />
            {errors.email && <p className="mt-1 font-sans text-xs text-red-500">{errors.email}</p>}
          </div>
          {/* Hairstyle description */}
          <div>
            <label className={labelClass}>
              {isCustom ? "Describe the hairstyle you want *" : "Describe your desired hairstyle (optional)"}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Style, desired length, color, allergies… write exactly what you want"
              rows={3}
              className={`${inputClass} resize-none`}
            />
            {errors.notes && <p className="mt-1 font-sans text-xs text-red-500">{errors.notes}</p>}
          </div>

          {/* Photo of the style */}
          <div>
            <label className={labelClass}>Photo of the style (optional)</label>
            {photoPreview ? (
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoPreview}
                  alt="Style photo preview"
                  className="h-20 w-20 rounded-xl border border-brown-deep/15 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="rounded-full border border-brown-deep/20 px-4 py-2 font-sans text-xs font-semibold text-brown-deep transition-colors hover:border-caramel hover:text-caramel"
                >
                  Remove photo
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brown-deep/20 bg-cream/40 px-4 py-5 font-sans text-sm text-ink/55 transition-colors hover:border-caramel hover:text-caramel">
                📷 Choose a photo of the style you want
                <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              </label>
            )}
            <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 font-sans text-[0.65rem] leading-relaxed text-red-700">
              🚫 Nudity or inappropriate photos are strictly prohibited. Any request containing
              one is ignored and the sender is blocked.
            </p>
            <p className="mt-1.5 font-sans text-[0.65rem] leading-relaxed text-ink/45">
              Your photo stays on your device. After tapping &ldquo;Send my request by
              text&rdquo;, simply attach it in your messaging app before sending.
            </p>
          </div>

          <p className="font-sans text-[0.65rem] text-ink/40">
            * Required fields. Your details are only used for your appointment.
          </p>
        </div>

        <div className="flex-none border-t border-brown-deep/8 px-6 py-4 sm:px-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex-none rounded-full border border-brown-deep/20 px-5 py-3.5 font-sans text-sm font-semibold text-brown-deep transition-colors hover:border-caramel hover:text-caramel"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-brown-deep py-3.5 font-sans text-sm font-bold uppercase tracking-[0.14em] text-cream transition-all duration-200 hover:bg-caramel"
            >
              Prepare my request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── *
 *  Étape 4 - Confirmation                                   *
 * ────────────────────────────────────────────────────────── */
function StepConfirmation({
  booking,
  onClose,
}: {
  booking: {
    service: BookingService | null;
    date: Date | null;
    time: string | null;
    name: string;
    phone: string;
    notes: string;
    hasPhoto: boolean;
  };
  onClose: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const isCustom = booking.service?.id === "custom";
  const smsBody = [
    "Hi Djehamie! I'm writing from your official website.",
    isCustom
      ? "I'd like to book a custom style."
      : `I'd like to book: ${booking.service?.name ?? "a hairstyle"}.`,
    booking.date && booking.time
      ? `Preferred time: ${formatDate(booking.date)} at ${booking.time}.`
      : "",
    `Name: ${booking.name}.`,
    booking.phone ? `Phone: ${booking.phone}.` : "",
    booking.notes ? `Style details: ${booking.notes}` : "",
    booking.hasPhoto ? "(I'm attaching a photo of the style.)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-10 text-center sm:px-12">
      {/* Icône SMS */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-caramel shadow-warm"
      >
        <svg className="h-9 w-9 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m-9 6l3.2-3.2A2 2 0 016.6 16H18a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14z" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-caramel">Step 4 / 4</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-brown-deep">
          Your request is ready!
        </h2>
        <p className="mt-3 font-sans text-sm text-ink/60">
          {booking.name ? `${booking.name.split(" ")[0]}, one` : "One"} last step: send your
          request by text. Djehamie replies to you personally to confirm the time and the price.
        </p>
      </motion.div>

      {/* Récapitulatif */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-7 w-full max-w-sm rounded-2xl border border-brown-deep/10 bg-cream/70 p-6 text-left"
      >
        <div className="space-y-3">
          <Row icon="✦" label="Service" value={booking.service?.name ?? "–"} />
          <Row
            icon="📅"
            label="Preferred time"
            value={booking.date ? `${formatDate(booking.date)} at ${booking.time ?? ""}` : "–"}
          />
          <Row icon="💬" label="Price" value="Quote-based, discussed directly with the braider" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-7 w-full max-w-sm"
      >
        {/* Les essentiels, juste avant l'envoi - impossible de passer à côté */}
        <div className="mb-4 rounded-2xl border border-caramel/30 bg-caramel/8 p-5 text-left">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-base font-semibold text-brown-deep">
              How it works at the salon
            </p>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="shrink-0 font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-caramel underline underline-offset-2 transition-colors hover:text-brown-deep"
            >
              {showAll ? "Show less" : "Read everything"}
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {bookingEssentials.map((e) => (
              <li key={e} className="flex gap-2.5 font-sans text-[0.72rem] leading-relaxed text-ink/70">
                <span className="mt-[0.3rem] h-1.5 w-1.5 shrink-0 rounded-full bg-caramel" />
                <span>{e}</span>
              </li>
            ))}
          </ul>

          {/* Tout le détail, déplié sur place : on ne quitte jamais la modale */}
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                key="all-policies"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3 border-t border-caramel/25 pt-4">
                  <div>
                    <p className="font-display text-sm font-semibold text-brown-deep">
                      {policyHighlight.title}
                    </p>
                    <p className="mt-1 font-sans text-[0.72rem] leading-relaxed text-ink/70">
                      {policyHighlight.body}
                    </p>
                    <p className="mt-1.5 font-sans text-[0.68rem] leading-relaxed text-caramel">
                      {policyHighlight.note}
                    </p>
                  </div>

                  {salonPolicies.map((p) => (
                    <div key={p.t}>
                      <p className="font-display text-sm font-semibold text-brown-deep">{p.t}</p>
                      <p className="mt-0.5 font-sans text-[0.72rem] leading-relaxed text-ink/70">
                        {p.d}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <label className="mt-4 flex cursor-pointer items-start gap-2.5 rounded-xl bg-white/70 p-3 transition-colors hover:bg-white">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(ev) => setAgreed(ev.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-caramel"
            />
            <span className="font-sans text-[0.72rem] font-semibold leading-relaxed text-brown-deep">
              I have read and understood how the salon works.
            </span>
          </label>
        </div>

        <a
          href={agreed ? smsLink(smsBody) : undefined}
          onClick={(ev) => { if (!agreed) ev.preventDefault(); }}
          aria-disabled={!agreed}
          className={`block w-full rounded-full py-4 font-sans text-sm font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
            agreed
              ? "bg-brown-deep text-cream hover:bg-caramel"
              : "cursor-not-allowed bg-brown-deep/20 text-ink/40"
          }`}
        >
          Send my request by text
        </a>
        {!agreed && (
          <p className="mt-2 font-sans text-[0.7rem] text-ink/50">
            Tick the box above to send your request.
          </p>
        )}
        {booking.hasPhoto && (
          <p className="mt-2 font-sans text-[0.7rem] text-caramel">
            📷 Don&apos;t forget to attach your style photo in the messaging app before sending!
          </p>
        )}
        <a
          href={`tel:${business.phone}`}
          className="mt-3 block w-full rounded-full border border-brown-deep/20 py-3.5 font-sans text-sm font-semibold text-brown-deep transition-colors hover:border-caramel hover:text-caramel"
        >
          Or call {business.phoneDisplay}
        </a>
        <p className="mt-4 rounded-xl bg-caramel/10 px-4 py-3 font-sans text-[0.7rem] leading-relaxed text-brown-deep">
          🔒 {business.phoneDisplay} is the salon&apos;s <strong>only official number</strong>.
          Only early-morning slots (before 8 AM) require half the price to reserve the slot,
          by Zelle to this number, and the Zelle request always comes from Djehamie herself.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full py-2 font-sans text-xs font-semibold text-ink/45 transition-colors hover:text-caramel"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-sm">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="font-sans text-[0.6rem] uppercase tracking-widest text-ink/40">{label}</p>
        <p className="font-sans text-sm font-semibold text-brown-deep">{value}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── *
 *  Progress bar                                              *
 * ────────────────────────────────────────────────────────── */
function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex h-0.5 gap-1.5">
      {[1, 2, 3, 4].map((s) => (
        <motion.div
          key={s}
          className={`h-full flex-1 rounded-full ${s <= step ? "bg-caramel" : "bg-brown-deep/15"}`}
          animate={{ opacity: s <= step ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────── *
 *  Modal principal                                           *
 * ────────────────────────────────────────────────────────── */
export function BookingModal() {
  const { isOpen, step, booking, closeBooking, setStep, setService, setDateTime, setClientInfo, resetBooking } =
    useBooking();

  const [dir, setDir] = useState(1);

  const goBack = useCallback(() => {
    setDir(-1);
    setStep((step > 1 ? step - 1 : 1) as 1 | 2 | 3 | 4);
  }, [step, setStep]);

  const handleClose = useCallback(() => {
    closeBooking();
    setTimeout(resetBooking, 400);
  }, [closeBooking, resetBooking]);

  // Keyboard escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-brown-deep/60 backdrop-blur-sm"
          />

          {/* Centering wrapper - flex keeps the panel centered on every screen size
              (framer-motion overwrites `transform`, so translate-based centering breaks) */}
          <div className="pointer-events-none fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            key="panel"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="pointer-events-auto flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:h-[88vh] sm:max-w-3xl sm:rounded-[2rem]"
          >
            {/* Header */}
            <div className="flex-none border-b border-brown-deep/8 px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-caramel">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4 text-caramel">
                      <path d="M7 4c0 4 10 4 10 8S7 16 7 20" />
                      <path d="M17 4c0 4-10 4-10 8s10 4 10 8" />
                    </svg>
                  </div>
                  <span className="font-display text-sm font-semibold text-brown-deep">Booking</span>
                </div>
                {/* Close */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brown-deep/15 text-ink/50 transition-colors hover:border-caramel hover:text-caramel"
                  aria-label="Close"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3">
                <ProgressBar step={step} />
              </div>
            </div>

            {/* Contenu par étape */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={dir} mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0 flex flex-col"
                  >
                    <StepServices
                      onSelect={(s) => { setDir(1); setService(s); }}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0 flex flex-col"
                  >
                    <StepCalendar
                      onSelect={(d, t) => { setDir(1); setDateTime(d, t); }}
                      onBack={() => { setDir(-1); setStep(1); }}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0 flex flex-col"
                  >
                    <StepForm
                      booking={booking}
                      onSubmit={(info) => { setDir(1); setClientInfo(info); }}
                      onBack={() => { setDir(-1); setStep(2); }}
                    />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0 overflow-y-auto"
                  >
                    <StepConfirmation booking={booking} onClose={handleClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

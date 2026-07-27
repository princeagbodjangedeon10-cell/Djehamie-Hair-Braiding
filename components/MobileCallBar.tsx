"use client";
import { business } from "@/lib/site";
import { PhoneIcon } from "./Icons";
import { BookingButton } from "./BookingButton";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brown-deep/10 bg-cream/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-2 gap-2 px-4 py-3">
        <a
          href={`tel:${business.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-brown-deep/25 py-3 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-brown-deep transition-colors hover:border-caramel hover:text-caramel"
        >
          <PhoneIcon className="h-4 w-4 text-caramel" /> Call
        </a>
        <BookingButton className="inline-flex items-center justify-center gap-2 rounded-full bg-brown-deep py-3 font-sans text-sm font-semibold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-brown-mid">
          Book
        </BookingButton>
      </div>
    </div>
  );
}

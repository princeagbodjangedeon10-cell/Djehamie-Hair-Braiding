"use client";
import React from "react";
import { useBooking } from "@/components/booking/BookingProvider";

interface BookingButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function BookingButton({ className = "", children }: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      onClick={openBooking}
      className={className}
    >
      {children}
    </button>
  );
}

"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export type BookingService = {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: string;
  description: string;
  img: string;
  tag?: string;
};

export type BookingState = {
  service: BookingService | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string;
  hasPhoto: boolean;
};

type BookingContextType = {
  isOpen: boolean;
  step: 1 | 2 | 3 | 4;
  booking: BookingState;
  openBooking: () => void;
  closeBooking: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  setService: (service: BookingService) => void;
  setDateTime: (date: Date, time: string) => void;
  setClientInfo: (info: { name: string; phone: string; email: string; notes: string; hasPhoto: boolean }) => void;
  resetBooking: () => void;
};

const BookingContext = createContext<BookingContextType | null>(null);

const INITIAL_STATE: BookingState = {
  service: null,
  date: null,
  time: null,
  name: "",
  phone: "",
  email: "",
  notes: "",
  hasPhoto: false,
};

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);

  const openBooking = useCallback(() => {
    setStep(1);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(INITIAL_STATE);
    setStep(1);
  }, []);

  const setService = useCallback((service: BookingService) => {
    setBooking((b) => ({ ...b, service }));
    setStep(2);
  }, []);

  const setDateTime = useCallback((date: Date, time: string) => {
    setBooking((b) => ({ ...b, date, time }));
    setStep(3);
  }, []);

  const setClientInfo = useCallback(
    (info: { name: string; phone: string; email: string; notes: string; hasPhoto: boolean }) => {
      setBooking((b) => ({ ...b, ...info }));
      setStep(4);
    },
    []
  );

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        step,
        booking,
        openBooking,
        closeBooking,
        setStep,
        setService,
        setDateTime,
        setClientInfo,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

const NOOP_CONTEXT: BookingContextType = {
  isOpen: false,
  step: 1,
  booking: { service: null, date: null, time: null, name: "", phone: "", email: "", notes: "", hasPhoto: false },
  openBooking: () => {},
  closeBooking: () => {},
  setStep: () => {},
  setService: () => {},
  setDateTime: () => {},
  setClientInfo: () => {},
  resetBooking: () => {},
};

export function useBooking() {
  const ctx = useContext(BookingContext);
  return ctx ?? NOOP_CONTEXT;
}

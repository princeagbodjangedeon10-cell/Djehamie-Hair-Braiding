"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = ({
  className = "",
  testimonials,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="w-72 rounded-3xl border border-brown-deep/10 bg-white p-7 shadow-card"
              >
                <p className="font-sans text-sm leading-relaxed text-ink/75">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-brown-deep/8 pt-5">
                  {image ? (
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-caramel/15 font-display text-sm font-semibold text-caramel">
                      {name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col leading-tight">
                    <span className="font-sans text-sm font-semibold text-brown-deep">{name}</span>
                    <span className="font-sans text-xs text-ink/50">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

"use client";

import { useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";

type TestimonialsKudaProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "testimonials-kuda" }
>;

export default function TestimonialsKuda({ eyebrow, heading, testimonials }: TestimonialsKudaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-cream max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">
        {/* Header row */}
        <div className="flex justify-between items-end mb-10 flex-wrap gap-5">
          <div>
            {eyebrow && (
              <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-[clamp(26px,3vw,40px)] font-extrabold tracking-[-0.02em] leading-[1.15] text-brand-secondary">
                {heading}
              </h2>
            )}
          </div>
          {/* Nav arrows */}
          <div className="flex gap-2 max-sm:mt-5">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary group"
            >
              <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] fill-none stroke-brand-secondary group-hover:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4L6 9l5 5"/>
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary group"
            >
              <svg viewBox="0 0 18 18" className="w-[18px] h-[18px] fill-none stroke-brand-secondary group-hover:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 4l5 5-5 5"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-5 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials?.map((t) => {
            const initial = t.name?.[0]?.toUpperCase() || "?";
            return (
              <div
                key={t._id}
                className="bg-white rounded-2xl p-7 min-w-[300px] max-w-[320px] flex-shrink-0 border border-brand-border max-sm:min-w-[260px] max-sm:p-[22px]"
              >
                <div className="text-brand-accentGold text-[14px] mb-[14px] tracking-[2px]">★★★★★</div>
                {t.quote && (
                  <p className="text-[15px] leading-[1.7] text-brand-secondary mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                )}
                <div className="flex items-center gap-3">
                  {t.avatar?.asset ? (
                    <Image
                      src={urlFor(t.avatar).width(80).height(80).url()}
                      alt={t.name || ""}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-heroBg flex items-center justify-center text-[16px] font-bold text-brand-primary flex-shrink-0">
                      {initial}
                    </div>
                  )}
                  <div>
                    <div className="text-[14px] font-bold text-brand-secondary">{t.name}</div>
                    {t.title && <div className="text-[12px] text-brand-muted">{t.title}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

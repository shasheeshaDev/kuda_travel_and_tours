"use client";

import { useState } from "react";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";

type Tours1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "tours-1" }
>;

// Cycling backgrounds matching the design's 5n colour pattern
const THUMB_BG = [
  "#edf0f5", // hero-bg blue-grey
  "#f0f4f1", // sage green
  "#faf3e8", // warm gold
  "#f5edf0", // soft rose
  "#ecf3f5", // soft blue
];

function resolveHref(button: any): string {
  if (!button) return "#";
  if (button.isExternal && button.href) return button.href;
  if (button.internalLink?.slug?.current) return `/${button.internalLink.slug.current}`;
  return "#";
}

export default function Tours1({ eyebrow, heading, description, tabs, ctaButton }: Tours1Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!tabs?.length) return null;

  const activeTab = tabs[activeIndex];

  return (
    <section id="tours" className="py-24 bg-white max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">

        {/* Section header */}
        <div className="text-center mb-0">
          {eyebrow && (
            <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-[clamp(28px,3.2vw,44px)] font-extrabold tracking-[-0.02em] leading-[1.15] text-brand-secondary">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-[17px] text-brand-muted max-w-[540px] mx-auto leading-[1.7] mt-4">
              {description}
            </p>
          )}
        </div>

        {/* Tab bar */}
        <div
          role="tablist"
          className="flex gap-2 flex-wrap justify-center my-10 p-[6px] bg-brand-cream rounded-[14px] border border-brand-border w-fit mx-auto max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:justify-start max-lg:max-w-full max-lg:scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab._key}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className={[
                "px-[22px] py-3 rounded-[10px] text-[14px] font-semibold whitespace-nowrap",
                "transition-all duration-200 ease-in-out border-none cursor-pointer",
                i === activeIndex
                  ? "bg-brand-primary text-white shadow-[0_4px_12px_rgba(71,69,70,0.18)]"
                  : "bg-transparent text-brand-muted hover:text-brand-secondary",
                "max-lg:px-[18px] max-lg:py-[10px] max-lg:text-[13px]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active tour panel */}
        {activeTab?.tours && activeTab.tours.length > 0 && (
          <div
            key={activeTab._key}
            className="grid grid-cols-3 gap-[18px] animate-[tourFadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3"
            style={{
              // inline animation keyframes via CSS variable trick — handled by global keyframe
            }}
          >
            {activeTab.tours.map((tour, idx) => (
              <div
                key={tour._key}
                className="group relative bg-white border border-brand-border rounded-[14px] px-6 py-6 flex gap-4 items-start overflow-hidden cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_12px_32px_rgba(71,69,70,0.08)] max-sm:px-5 max-sm:py-5"
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, #edf0f5 0%, transparent 60%)" }}
                />

                {/* Emoji thumbnail */}
                <div
                  className="relative z-10 w-14 h-14 flex-shrink-0 rounded-[12px] flex items-center justify-center text-[22px]"
                  style={{ background: THUMB_BG[idx % 5] }}
                >
                  {tour.emoji}
                </div>

                {/* Body */}
                <div className="relative z-10 flex-1 min-w-0">
                  <h4 className="text-[16px] font-bold text-brand-secondary leading-[1.35] mb-[6px]">
                    {tour.title}
                  </h4>
                  {tour.meta && (
                    <div className="flex items-center gap-[6px] text-[12px] text-brand-muted font-medium">
                      {tour.meta}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="relative z-10 w-[30px] h-[30px] rounded-full bg-brand-cream flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-brand-primary group-hover:translate-x-[3px]">
                  <svg viewBox="0 0 14 14" className="w-[14px] h-[14px] fill-none stroke-brand-secondary group-hover:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7h8M7 3l4 4-4 4"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {ctaButton?.label && (
          <div className="text-center mt-12">
            <Link
              href={resolveHref(ctaButton)}
              target={ctaButton.target ? "_blank" : undefined}
              className="inline-flex items-center gap-2 px-7 py-[14px] rounded-lg bg-brand-primary text-white text-[15px] font-semibold transition-all duration-200 hover:bg-brand-dark hover:-translate-y-px no-underline"
            >
              {ctaButton.label}
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}

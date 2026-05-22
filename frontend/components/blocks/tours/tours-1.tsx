"use client";

import { useState } from "react";
import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { submitTourBooking } from "@/app/actions/booking/action";

type Tours1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "tours-1" }
>;

type TourItem = NonNullable<
  NonNullable<NonNullable<Tours1Props["tabs"]>[number]["tours"]>[number]
>;

type DialogView = "detail" | "book" | "success";

const THUMB_BG = ["#edf0f5", "#f0f4f1", "#faf3e8", "#f5edf0", "#ecf3f5"];

const INPUT = [
  "w-full px-4 py-[13px] border border-brand-border rounded-lg",
  "text-[15px] text-brand-secondary font-plusJakartaSans",
  "placeholder:text-brand-muted bg-white outline-none",
  "focus:border-brand-primary transition-colors duration-200",
].join(" ");

function resolveHref(button: any): string {
  if (!button) return "#";
  if (button.isExternal && button.href) return button.href;
  if (button.internalLink?.slug?.current) return `/${button.internalLink.slug.current}`;
  return button.href || "#";
}

export default function Tours1({ eyebrow, heading, description, tabs, ctaButton }: Tours1Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openTour, setOpenTour]       = useState<TourItem | null>(null);
  const [view, setView]               = useState<DialogView>("detail");
  const [bookingRef, setBookingRef]   = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState("");

  if (!tabs?.length) return null;

  const activeTab = tabs[activeIndex];

  function handleOpenChange(open: boolean) {
    if (!open) {
      setOpenTour(null);
      setView("detail");
      setBookingRef("");
      setSubmitError("");
    }
  }

  async function handleBookingSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    const fd = new FormData(e.currentTarget);
    const result = await submitTourBooking({
      tourName: openTour?.title  ?? "",
      tourMeta: openTour?.meta   ?? "",
      name:     fd.get("name")     as string,
      email:    fd.get("email")    as string,
      phone:    fd.get("phone")    as string,
      dateFrom: fd.get("dateFrom") as string,
      dateTo:   fd.get("dateTo")   as string,
      note:     fd.get("note")     as string,
    });
    setIsSubmitting(false);
    if (result.success) {
      setBookingRef(result.reference!);
      setView("success");
    } else {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="tours" className="py-24 bg-white max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">

        {/* Section header */}
        <div className="text-center">
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
          className="flex gap-2 flex-wrap justify-center my-10 p-[6px] bg-brand-cream rounded-[14px] border border-brand-border w-fit mx-auto max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:justify-start max-lg:max-w-full"
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
                "transition-all duration-200 border-none cursor-pointer",
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

        {/* Tour grid */}
        {activeTab?.tours && activeTab.tours.length > 0 && (
          <div
            key={activeTab._key}
            className="grid grid-cols-3 gap-[18px] animate-[tourFadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3"
          >
            {activeTab.tours.map((tour, idx) => {
              const hasContent = tour.content && tour.content.length > 0;
              return (
                <button
                  key={tour._key}
                  type="button"
                  onClick={() => { setOpenTour(tour); setView("detail"); }}
                  className={[
                    "group relative bg-white border border-brand-border rounded-[14px]",
                    "px-6 py-6 flex gap-4 items-start overflow-hidden text-left w-full",
                    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_12px_32px_rgba(71,69,70,0.08)]",
                    "cursor-pointer max-sm:px-5 max-sm:py-5",
                  ].join(" ")}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, #edf0f5 0%, transparent 60%)" }}
                  />
                  <div
                    className="relative z-10 w-14 h-14 flex-shrink-0 rounded-[12px] flex items-center justify-center text-[22px]"
                    style={{ background: THUMB_BG[idx % 5] }}
                  >
                    {tour.emoji}
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <h4 className="text-[16px] font-bold text-brand-secondary leading-[1.35] mb-[6px]">
                      {tour.title}
                    </h4>
                    {tour.meta && (
                      <div className="text-[12px] text-brand-muted font-medium">{tour.meta}</div>
                    )}
                    {hasContent && (
                      <div className="mt-2 text-[12px] text-brand-accentBlue font-semibold">View details</div>
                    )}
                  </div>
                  <div className="relative z-10 w-[30px] h-[30px] rounded-full bg-brand-cream flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-brand-primary group-hover:translate-x-[3px]">
                    <svg viewBox="0 0 14 14" className="w-[14px] h-[14px] fill-none stroke-brand-secondary group-hover:stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7h8M7 3l4 4-4 4"/>
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
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

      {/* ── DIALOG ─────────────────────────────────────────────────────────── */}
      <Dialog open={!!openTour || view === "success"} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl p-0 gap-0 border-brand-border overflow-hidden max-h-[90vh] flex flex-col">

          {/* ── TOUR DETAIL VIEW ── */}
          {openTour && view === "detail" && (
            <>
              <DialogHeader className="flex-shrink-0 border-b border-brand-border px-8 py-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex-shrink-0 rounded-[12px] flex items-center justify-center text-[24px]" style={{ background: THUMB_BG[0] }}>
                    {openTour.emoji}
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <DialogTitle className="text-[20px] font-bold text-brand-secondary leading-tight mb-1">
                      {openTour.title}
                    </DialogTitle>
                    {openTour.meta && (
                      <p className="text-[13px] text-brand-muted font-medium">{openTour.meta}</p>
                    )}
                  </div>
                </div>
              </DialogHeader>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-8 py-7
                [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:text-brand-secondary [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-[16px] [&_h3]:font-bold [&_h3]:text-brand-secondary [&_h3]:mt-5 [&_h3]:mb-2
                [&_h4]:text-[15px] [&_h4]:font-semibold [&_h4]:text-brand-secondary [&_h4]:mt-4 [&_h4]:mb-2
                [&_p]:text-[15px] [&_p]:text-brand-muted [&_p]:leading-[1.75] [&_p]:mb-4
                [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:text-[15px] [&_li]:text-brand-muted [&_li]:mb-1.5
                [&_ol]:pl-5 [&_ol]:mb-4
                [&_strong]:text-brand-secondary [&_strong]:font-semibold
                [&_blockquote]:border-l-4 [&_blockquote]:border-brand-border [&_blockquote]:pl-4 [&_blockquote]:italic">
                {openTour.content && openTour.content.length > 0
                  ? <PortableTextRenderer value={openTour.content as any} />
                  : <p className="text-[15px] text-brand-muted">No details available for this tour yet.</p>
                }
              </div>

              <div className="flex-shrink-0 border-t border-brand-border px-8 py-5">
                <button
                  type="button"
                  onClick={() => setView("book")}
                  className="w-full px-7 py-[14px] rounded-lg bg-brand-primary text-white text-[15px] font-semibold transition-colors duration-200 hover:bg-brand-dark cursor-pointer border-none"
                >
                  Book This Tour
                </button>
              </div>
            </>
          )}

          {/* ── BOOKING FORM VIEW ── */}
          {openTour && view === "book" && (
            <>
              <DialogHeader className="flex-shrink-0 border-b border-brand-border px-8 py-5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => { setView("detail"); setSubmitError(""); }}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-brand-border hover:border-brand-primary transition-colors cursor-pointer bg-transparent"
                    aria-label="Back to tour details"
                  >
                    <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 fill-none stroke-brand-secondary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 7H3M7 11l-4-4 4-4"/>
                    </svg>
                  </button>
                  <div>
                    <DialogTitle className="text-[17px] font-bold text-brand-secondary leading-tight">
                      Book — {openTour.title}
                    </DialogTitle>
                    {openTour.meta && (
                      <p className="text-[12px] text-brand-muted">{openTour.meta}</p>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <form
                onSubmit={handleBookingSubmit}
                className="flex-1 overflow-y-auto flex flex-col"
              >
                <div className="flex-1 px-8 py-6 flex flex-col gap-4">

                  {/* Name */}
                  <div>
                    <label className="block text-[13px] font-semibold text-brand-secondary mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input name="name" type="text" required placeholder="e.g. Sarah Miller" className={INPUT} />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <div>
                      <label className="block text-[13px] font-semibold text-brand-secondary mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input name="email" type="email" required placeholder="you@email.com" className={INPUT} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-brand-secondary mb-1.5">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input name="phone" type="tel" required placeholder="+94 77 123 4567" className={INPUT} />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    <div>
                      <label className="block text-[13px] font-semibold text-brand-secondary mb-1.5">
                        From Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="dateFrom"
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className={INPUT + " cursor-pointer"}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-brand-secondary mb-1.5">
                        To Date
                      </label>
                      <input
                        name="dateTo"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className={INPUT + " cursor-pointer"}
                      />
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-[13px] font-semibold text-brand-secondary mb-1.5">
                      Note
                    </label>
                    <textarea
                      name="note"
                      rows={3}
                      placeholder="Group size, dietary requirements, special requests…"
                      className={INPUT + " resize-y min-h-[88px]"}
                    />
                  </div>

                  {/* Error */}
                  {submitError && (
                    <p className="text-[14px] text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      {submitError}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 border-t border-brand-border px-8 py-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-7 py-[14px] rounded-lg bg-brand-primary text-white text-[15px] font-semibold transition-colors duration-200 hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer border-none"
                  >
                    {isSubmitting ? "Sending…" : "Submit Booking Request"}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── SUCCESS VIEW ── */}
          {view === "success" && (
            <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
              {/* Checkmark */}
              <div className="w-16 h-16 rounded-full bg-[#edf0f5] flex items-center justify-center mb-6">
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#474546"/>
                  <path d="M9 16.5l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h2 className="text-[22px] font-extrabold text-brand-secondary mb-2">Booking Request Sent!</h2>
              <p className="text-[15px] text-brand-muted max-w-[340px] mb-8 leading-[1.7]">
                We&apos;ll review your request and get back to you within 24 hours to confirm.
              </p>

              {/* Reference */}
              <div className="bg-brand-heroBg rounded-[12px] px-8 py-5 mb-8 w-full max-w-[320px]">
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-1">
                  Booking Reference
                </p>
                <p className="text-[26px] font-extrabold text-brand-primary tracking-[0.06em]">
                  {bookingRef}
                </p>
                <p className="text-[12px] text-brand-muted mt-1">
                  A confirmation has been sent to your email.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="px-7 py-[12px] rounded-lg border border-brand-border text-brand-secondary text-[14px] font-semibold hover:border-brand-primary hover:text-brand-primary transition-colors duration-200 cursor-pointer bg-transparent"
              >
                Close
              </button>
            </div>
          )}

        </DialogContent>
      </Dialog>

    </section>
  );
}

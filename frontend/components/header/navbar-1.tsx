"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { HEADER_QUERYResult } from "@/sanity.types";
import { cn } from "@/lib/utils";

// Types derived directly from the query result — these have the GROQ-computed href
type NavLink = Extract<
  NonNullable<NonNullable<HEADER_QUERYResult>["links"]>[number],
  { _type: "link-with-label" }
>;
type CtaButton = NonNullable<NonNullable<HEADER_QUERYResult>["ctaLinks"]>[number];

interface Navbar1Props {
  className?: string;
  navigation: HEADER_QUERYResult;
}

export default function Navbar1({ className, navigation }: Navbar1Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const pathname = usePathname();

  // Section anchor links (#who, #offer…) navigate home + section when not on home page
  const resolveHref = (href: string | null | undefined) => {
    if (!href) return "#";
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Extract only flat link-with-label items for the nav (skip link-groups)
  const navLinks = (navigation?.links ?? []).filter(
    (l): l is NavLink => l._type === "link-with-label"
  );

  const ctaButton: CtaButton | undefined = navigation?.ctaLinks?.[0];

  return (
    <>
      {/* ── STICKY NAV ──────────────────────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-[100] bg-white/95 backdrop-blur-[10px]",
          "border-b border-brand-border transition-shadow duration-300",
          scrolled && "shadow-[0_2px_20px_rgba(0,0,0,0.07)]",
          className
        )}
      >
        <div className="max-w-[1160px] mx-auto px-10 h-[68px] flex items-center justify-between max-lg:px-6 max-sm:px-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            {navigation?.logo?.asset?.url ? (
              <Link href="/">
                <Image
                  src={navigation.logo.asset.url}
                  alt={navigation.logo.alt ?? "Kuda Travel & Tours"}
                  width={150}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                  unoptimized
                />
              </Link>
            ) : (
              <Link href="/" className="text-[15px] font-bold text-brand-secondary no-underline">
                {navigation?.siteName ?? "Kuda Travel & Tours"}
              </Link>
            )}
          </div>

          {/* Desktop nav links */}
          {navLinks.length > 0 && (
            <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link._key}>
                  <Link
                    href={resolveHref(link.href)}
                    target={link.target ? "_blank" : "_self"}
                    className="text-[14px] font-medium text-brand-secondary opacity-75 hover:opacity-100 transition-opacity duration-200 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Desktop CTA + hamburger */}
          <div className="flex items-center gap-4">
            {ctaButton?.label && (
              <Link
                href={resolveHref(ctaButton.href)}
                target={ctaButton.target ? "_blank" : "_self"}
                className="hidden lg:inline-block px-[22px] py-[10px] rounded-[6px] bg-brand-primary text-white text-[14px] font-semibold no-underline transition-colors duration-200 hover:bg-brand-dark"
              >
                {ctaButton.label}
              </Link>
            )}

            {/* Hamburger — visible below lg breakpoint */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((p) => !p)}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1 bg-transparent border-none cursor-pointer"
            >
              <span className={cn("block h-[2px] w-full bg-brand-secondary rounded-sm transition-all duration-300", isMenuOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("block h-[2px] w-full bg-brand-secondary rounded-sm transition-all duration-300", isMenuOpen && "opacity-0")} />
              <span className={cn("block h-[2px] w-full bg-brand-secondary rounded-sm transition-all duration-300", isMenuOpen && "-translate-y-[7px] -rotate-45")} />
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE MENU ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 bottom-0 z-[99]",
          "flex flex-col px-7 py-8 gap-1 overflow-y-auto",
          "bg-white/[0.98] backdrop-blur-[12px]",
          "transition-all duration-300",
          isMenuOpen
            ? "top-[68px] opacity-100 pointer-events-auto"
            : "top-[68px] opacity-0 pointer-events-none -translate-y-2"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link._key}
            href={resolveHref(link.href)}
            target={link.target ? "_blank" : "_self"}
            onClick={() => setIsMenuOpen(false)}
            className="text-[20px] font-bold text-brand-secondary py-4 border-b border-brand-border block no-underline hover:text-brand-primary transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}

        {ctaButton?.label && (
          <Link
            href={resolveHref(ctaButton.href)}
            target={ctaButton.target ? "_blank" : "_self"}
            onClick={() => setIsMenuOpen(false)}
            className="mt-6 bg-brand-primary text-white text-center text-[16px] font-bold py-4 rounded-[10px] no-underline block hover:bg-brand-dark transition-colors duration-200"
          >
            {ctaButton.label}
          </Link>
        )}
      </div>
    </>
  );
}

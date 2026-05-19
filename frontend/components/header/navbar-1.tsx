"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import type { SETTINGS_QUERYResult, HEADER_QUERYResult } from "@/sanity.types";
import type { LinkWithLabel as SanityLink, LinkGroup as SanityLinkGroup } from "@/sanity.types";
import { cn } from "@/lib/utils";

type NavigationItem = (SanityLink | SanityLinkGroup) & { _key: string };

const isLinkGroup = (item: NavigationItem): item is SanityLinkGroup & { _key: string } =>
  item._type === "link-group";

interface Navbar1Props {
  className?: string;
  settings: SETTINGS_QUERYResult;
  navigation: HEADER_QUERYResult;
}

export default function Navbar1({ className, settings, navigation }: Navbar1Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Section anchor links (#who, #offer…) navigate to home + section when not on home
  const resolveHref = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // First CTA link used as the "Book a Tour" button
  const ctaButton = navigation?.ctaLinks?.[0] as any;

  return (
    <>
      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "sticky top-0 z-[100] bg-white/95 backdrop-blur-[10px] border-b border-brand-border transition-shadow duration-300",
          scrolled && "shadow-[0_2px_20px_rgba(0,0,0,0.07)]",
          className
        )}
      >
        <div
          className="max-w-[1160px] mx-auto px-10 h-[68px] flex items-center justify-between
                     max-lg:px-6 max-sm:px-4"
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            {settings?.logo ? (
              <Link href="/">
                <Image
                  src={urlFor(settings.logo).url()}
                  alt={settings.logo.alt || "Kuda Travel & Tours"}
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
            ) : (
              <Link href="/" className="text-[15px] font-bold text-brand-secondary">
                {settings?.siteName ?? "Kuda Travel & Tours"}
              </Link>
            )}
          </div>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8 list-none">
            {navigation?.links?.map((item) => {
              const navItem = item as NavigationItem;
              if (isLinkGroup(navItem)) return null; // flat links only for this design
              const link = navItem as SanityLink & { _key: string };
              return (
                <li key={link._key}>
                  <Link
                    href={resolveHref(link.href || "#")}
                    target={link.target ? "_blank" : "_self"}
                    className="text-[14px] font-medium text-brand-secondary opacity-75 hover:opacity-100 transition-opacity duration-200 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + hamburger */}
          <div className="flex items-center gap-4">
            {ctaButton?.label && (
              <Link
                href={resolveHref(ctaButton.href || "#cta")}
                target={ctaButton.target ? "_blank" : "_self"}
                className="hidden lg:inline-block px-[22px] py-[10px] rounded-[6px] bg-brand-primary text-white text-[14px] font-semibold no-underline transition-colors duration-200 hover:bg-brand-dark"
              >
                {ctaButton.label}
              </Link>
            )}

            {/* Hamburger — tablet/mobile only */}
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setIsMenuOpen((p) => !p)}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1 bg-transparent border-none cursor-pointer"
            >
              <span
                className={cn(
                  "block h-[2px] w-full bg-brand-secondary rounded-sm transition-all duration-300",
                  isMenuOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-full bg-brand-secondary rounded-sm transition-all duration-300",
                  isMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-full bg-brand-secondary rounded-sm transition-all duration-300",
                  isMenuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ───────────────────────────────────────────────────── */}
      {/* Design: drops down from nav, full-width overlay below the sticky bar */}
      <div
        className={cn(
          "lg:hidden fixed left-0 right-0 bottom-0 z-[99] bg-white/[0.98] backdrop-blur-[12px]",
          "flex flex-col px-7 py-8 gap-1 overflow-y-auto",
          "transition-all duration-300",
          isMenuOpen ? "top-[68px] opacity-100 pointer-events-auto" : "top-[68px] opacity-0 pointer-events-none -translate-y-2"
        )}
      >
        {navigation?.links?.map((item) => {
          const navItem = item as NavigationItem;
          if (isLinkGroup(navItem)) return null;
          const link = navItem as SanityLink & { _key: string };
          return (
            <Link
              key={link._key}
              href={resolveHref(link.href || "#")}
              target={link.target ? "_blank" : "_self"}
              onClick={() => setIsMenuOpen(false)}
              className="text-[20px] font-bold text-brand-secondary py-4 border-b border-brand-border block no-underline hover:text-brand-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          );
        })}

        {ctaButton?.label && (
          <Link
            href={resolveHref(ctaButton.href || "#cta")}
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

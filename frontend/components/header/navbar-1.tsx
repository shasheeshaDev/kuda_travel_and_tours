"use client";

import { useState, useEffect, useMemo } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import type {
  SETTINGS_QUERYResult,
  HEADER_QUERYResult,
} from "@/sanity.types";
import type { LinkWithLabel as SanityLink, LinkGroup as SanityLinkGroup, ButtonVariant } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Button from "../blocks/shared/button";

type SanityLinkIcon = SanityLink & {
  iconVariant?: string;
  title?: string;
  description?: string;
};

type NavigationItem = (SanityLink | SanityLinkGroup | SanityLinkIcon) & {
  _key: string;
  buttonVariant?: ButtonVariant;
  title?: string;
};

interface Navbar1Props {
  className?: string;
  settings: SETTINGS_QUERYResult;
  navigation: HEADER_QUERYResult;
}

const isLinkGroup = (
  item: NavigationItem
): item is SanityLinkGroup & { _key: string } => {
  return item._type === "link-group";
};

export default function Navbar1({
  className,
  settings,
  navigation,
}: Navbar1Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentPositionUp, setCurrentPositionUp] = useState(true);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    setCurrentScrollY(window.scrollY < 0 ? 0 : window.scrollY);

    const handleScroll = () => {
      const newScrollY = window.scrollY < 0 ? 0 : window.scrollY;

      if (newScrollY < 10) {
        setCurrentPositionUp(true);
        setIsVisible(true);
      } else if (newScrollY > scrollY) {
        setCurrentPositionUp(false);
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setScrollY(newScrollY);
      setCurrentScrollY(newScrollY);
    };
    setScrollY(window.scrollY < 0 ? 0 : window.scrollY);

    setHeaderVisible(isVisible || isMenuOpen);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  useEffect(() => {
    if (currentScrollY > 10) {
      setCurrentPositionUp(false);
    } else {
      setCurrentPositionUp(true);
    }
  }, [currentScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const isLight = useMemo(() => {
    return currentPositionUp || isMenuOpen;
  }, [currentPositionUp, isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
          currentPositionUp ? "bg-transparent" : "bg-background shadow-sm",
          headerVisible ? "translate-y-0" : "-translate-y-full",
          isMenuOpen && "!bg-transparent shadow-none",
          className
        )}
      >
        <div className="header-wrp py-4 xl:py-6">
          <div className="container mx-auto w-full grid gap-5 grid-cols-4 lg:grid-cols-12 justify-between items-center">
            {/* Logo */}
            <div className="logo-wrp col-span-2 lg:col-span-2 relative flex flex-row items-center gap-16">
              <div className="logo-wrp relative h-10 z-10">
                {settings?.logo && (
                  <Link href="/">
                    <Image
                      src={urlFor(settings.logo).url()}
                      className={cn(
                        "h-full w-auto object-contain object-center transition-opacity duration-300",
                        isLight ? "opacity-100" : "opacity-100"
                      )}
                      alt={settings.logo.alt || "Logo"}
                      width={150}
                      height={40}
                    />
                  </Link>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className={cn(
              "nav-wrp hidden lg:flex relative flex-row items-center",
              navigation?.ctaLinks && navigation.ctaLinks.length > 0 ? "justify-center col-span-2 lg:col-span-8" : "justify-end col-span-2 lg:col-span-10"
            )}>
              {navigation?.links && (
                <nav className={cn(
                  "w-fit h-fit rounded-md p-1 transition-all duration-300",
                  isLight ? "bg-white/40" : "bg-black/10"
                )}>
                  <ul className="flex w-fit items-center justify-between">
                    {navigation.links.map((item) => {
                      const navItem = item as NavigationItem;

                      if (isLinkGroup(navItem)) {
                        return (
                          <li
                            key={navItem._key}
                            className={cn(
                              "relative group nav-parent",
                              isMenuOpen ? "opacity-0" : "opacity-100"
                            )}
                          >
                            <button
                              type="button"
                              className={cn(
                                "px-2 py-1 text-sm rounded-md bg-transparent transition-all duration-200 flex items-center",
                                isLight
                                  ? "text-white hover:bg-white hover:text-brand-secondary"
                                  : "text-foreground hover:bg-brand-primary hover:text-brand-white"
                              )}
                            >
                              {navItem.title}
                              <ChevronDown className="inline-block ml-1 w-4 h-4 transition-transform duration-200 group-[.nav-parent]:group-hover:rotate-180" />
                            </button>
                            {navItem.links && navItem.links.length > 0 && (
                              <div
                                className={cn(
                                  "absolute w-40 top-full -left-2 opacity-0 group-[.nav-parent]:group-hover:opacity-100 transition duration-200 pointer-events-none group-hover:pointer-events-auto",
                                  isVisible ? "pt-2" : "pt-4"
                                )}
                              >
                                <ul className="bg-brand-white text-text-default p-2 py-2 flex flex-col gap-2 rounded-md min-w-[200px] shadow-lg">
                                  {navItem.links.map((subItem) => (
                                    <li key={subItem._key} className="last:mb-0">
                                      <Link
                                        href={subItem.href || "#"}
                                        className="block px-3 py-1.5 text-sm rounded-md hover:bg-brand-primary hover:text-brand-white transition-all duration-200"
                                        target={subItem.target ? "_blank" : "_self"}
                                      >
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        );
                      }

                      return (
                        <li
                          key={navItem._key}
                          className={cn(
                            isMenuOpen ? "opacity-0" : "opacity-100"
                          )}
                        >
                          <Link
                            href={navItem.href || "#"}
                            target={navItem.target ? "_blank" : "_self"}
                            className={cn(
                              "px-2 py-1 text-sm rounded-md bg-transparent transition-all duration-200",
                              isLight
                                ? "text-white hover:bg-white hover:text-brand-secondary"
                                : "text-foreground hover:bg-brand-primary hover:text-brand-white"
                            )}
                          >
                            {navItem.label || navItem.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
            </div>

            {/* CTA Buttons & Mobile Menu Trigger */}
            <div className={cn(
              "button-wrp col-span-2 lg:col-span-2 flex-row justify-end",
              navigation?.ctaLinks && navigation.ctaLinks.length > 0 ? "hidden lg:flex" : "hidden"
            )}>
              {navigation?.ctaLinks && navigation.ctaLinks.length > 0 && (
                <div className="action-buttons-wrp hidden lg:flex flex-row justify-center items-center gap-4">
                  {navigation.ctaLinks.map((cta) => (
                    <Button key={cta._key} button={cta} />
                  ))}
                </div>
              )}

              
            </div>
            {navigation?.links && navigation.links.length > 0 && (
              <div className={cn("flex lg:hidden flex-row justify-end" ,navigation?.ctaLinks && navigation.ctaLinks.length > 0 ? "col-span-2 lg:col-span-8" : "col-span-2 lg:col-span-10")}>
                <div
                  className="mobile-menu-trigger-wrp aspect-square flex lg:hidden flex-row justify-center items-center gap-6 cursor-pointer"
                  onClick={toggleMenu}
                >
                  <div className="trigger-btn aspect-2/2 group flex flex-col gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "line w-[40px] h-[2px] transition-all duration-200 ease-in-out rounded-full",
                          isLight && !isMenuOpen ? "bg-brand-white" : "bg-brand-secondary",
                          i === 0 && isMenuOpen && "rotate-45 translate-y-[10px]",
                          i === 1 && isMenuOpen && "opacity-0",
                          i === 2 && isMenuOpen && "-rotate-45 -translate-y-[10px]"
                        )}
                      />
                    ))}
                  </div>
                </div>
                </div>
              )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="block lg:hidden w-full relative z-40">
        <div
          className={cn(
            "bg-secondary-opacity-80 z-[15] w-full h-[100dvh] block fixed top-0 left-0 backdrop-blur-lg transform transition-all duration-700 ease-in-out",
            isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          )}
        />
        <div
          className={cn(
            "fixed z-20 lg:z-40 top-0 right-0 w-full md:w-1/2 h-[100dvh] bg-brand-white drop-shadow-btnShadow transform transition-transform duration-700 delay-200 flex flex-col justify-between",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mobile-menu-wrp pt-[72px] lg:pt-0">
            <ul className="flex flex-col gap-2 py-4 md:py-8 md:pt-0 px-4 md:px-8">
              {navigation?.links?.map((item, index) => {
                const navItem = item as NavigationItem;
                const hasChildren = isLinkGroup(navItem) && (navItem.links?.length ?? 0) > 0;
                const isOpen = openIndex === index;

                return (
                  <li key={navItem._key} className="parent-nav-link-wrp">
                    <div
                      className={cn(
                        "parent-nav-link-inner-wrp flex items-center justify-between cursor-pointer transition-all text-secondary-10",
                        isOpen && "text-primary-foreground"
                      )}
                      onClick={() => hasChildren ? toggleAccordion(index) : null}
                    >
                      {isLinkGroup(navItem) ? (
                        <button
                          type="button"
                          className="parent-nav-link text-brand-secondary inline-block leading-tight text-[28px] font-pylon-light transition-all relative after:transition-all after:duration-200 after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-primary hover:after:w-full hover:text-brand-primary text-left"
                        >
                          {navItem.title}
                        </button>
                      ) : (
                        <Link
                          href={navItem.href || "#"}
                          className="parent-nav-link text-brand-secondary inline-block leading-tight text-[28px] font-pylon-light transition-all relative after:transition-all after:duration-200 after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-primary hover:after:w-full hover:text-brand-primary"
                          target={navItem.target ? "_blank" : "_self"}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {navItem.label || navItem.title}
                        </Link>
                      )}
                      {hasChildren && (
                        <ChevronDown
                          className={cn(
                            "ml-2 w-6 h-6 transition-all",
                            isOpen && "rotate-180 text-primary-foreground"
                          )}
                        />
                      )}
                    </div>

                    {hasChildren && isLinkGroup(navItem) && (
                      <ul
                        className={cn(
                          "transition-all overflow-hidden flex flex-col duration-300 ease-in-out",
                          isOpen ? "max-h-96 opacity-100 my-4" : "max-h-0 opacity-0"
                        )}
                      >
                        {navItem.links?.map((sub) => (
                          <li key={sub._key} className="nav-link-wrp inline-block [&+.nav-link-wrp]:mt-1">
                            <Link
                              href={sub.href || "#"}
                              className="nav-link inline-block text-xl leading-tight transition-all text-brand-secondary hover:text-brand-primary relative after:transition-all after:duration-200 after:content-[''] after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-brand-primary hover:after:w-full"
                              target={sub.target ? "_blank" : "_self"}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="action-buttons-wrp py-4 md:py-8 px-4 md:px-8">
            {navigation?.ctaLinks && navigation.ctaLinks.length > 0 && (
              <div className="flex flex-col gap-4" onClick={() => setIsMenuOpen(false)}>
                {navigation.ctaLinks.map((cta) => (
                    <Button key={cta._key} button={cta} className="w-full [&_.label-block]:w-full" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
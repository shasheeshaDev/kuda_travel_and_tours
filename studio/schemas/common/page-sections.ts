/**
 * Canonical list of all page section IDs used across the site.
 * Keep this in sync with the `id` attribute on each block component.
 * Used in link-with-label and button schemas for the "Page Section" anchor field.
 */
export const PAGE_SECTIONS = [
  { title: "Who We Are",           value: "who"          },
  { title: "Services (What We Offer)", value: "offer"     },
  { title: "Tour Packages",        value: "tours"        },
  { title: "How It Works",         value: "how"          },
  { title: "Statistics",           value: "stats"        },
  { title: "Testimonials",         value: "testimonials" },
  { title: "Book a Tour (CTA)",    value: "cta"          },
  { title: "FAQ",                  value: "faq"          },
] as const;

/**
 * Kuda Travel & Tours — Content Seed Script
 *
 * Inserts all homepage content from the design mockup into Sanity.
 * Safe to re-run: uses createOrReplace, so existing docs are updated, not duplicated.
 *
 * Prerequisites
 * ─────────────
 * 1. In Sanity dashboard → API → Tokens → create an "Editor" token.
 * 2. Add it to studio/.env.local:
 *      SANITY_API_WRITE_TOKEN=<your-editor-token>
 *
 * Usage (from project root)
 * ──────────────────────────
 *   pnpm seed
 *
 * Or directly from the studio directory:
 *   pnpm run seed-content
 */

import dotenv from "dotenv";
import { resolve } from "path";
import { createClient, type SanityClient } from "@sanity/client";

// Load studio/.env.local when run from the studio directory
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// ─── CLIENT ─────────────────────────────────────────────────────────────────

const client: SanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION ?? "2026-05-14",
  useCdn: false,
});

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function link(key: string, label: string, href: string) {
  return { _type: "link-with-label", _key: key, label, isExternal: true, href, target: false };
}

function linkGroup(key: string, title: string, links: ReturnType<typeof link>[]) {
  return { _type: "link-group", _key: key, title, links };
}

async function upsert(doc: Record<string, unknown>) {
  const result = await client.createOrReplace(doc as any);
  console.log(`  ✓ ${doc._type}  →  ${result._id}`);
  return result;
}

// ─── DOCUMENTS ───────────────────────────────────────────────────────────────

const SETTINGS = {
  _id: "kuda-settings",
  _type: "settings",
  siteName: "Kuda Travel & Tours",
  phone: "+94 77 123 4567",
  whatsappNumber: "94771234567",
  email: "info@kudatravels.com",
  address: "Colombo, Sri Lanka",
};

const HEADER = {
  _id: "kuda-header",
  _type: "header",
  links: [
    link("nav-about",    "About",    "#who"),
    link("nav-services", "Services", "#offer"),
    link("nav-process",  "Process",  "#how"),
    link("nav-reviews",  "Reviews",  "#testimonials"),
    link("nav-faq",      "FAQ",      "#faq"),
  ],
  ctaLinks: [
    {
      _type: "button",
      _key: "cta-book",
      label: "Book a Tour",
      buttonVariant: "default",
      buttonSize: "sm",
      isExternal: true,
      href: "#cta",
      target: false,
    },
  ],
};

const FOOTER = {
  _id: "kuda-footer",
  _type: "footer",
  description:
    "Sri Lanka's trusted travel & tour partner — expert drivers, custom itineraries, and seamless journeys island-wide.",
  links: [
    linkGroup("col-services", "Services", [
      link("fl-day",     "Day Tours",         "#offer"),
      link("fl-multi",   "Multi-Day Tours",   "#offer"),
      link("fl-airport", "Airport Transfers", "#offer"),
      link("fl-city",    "City Excursions",   "#offer"),
      link("fl-group",   "Group Travel",      "#offer"),
      link("fl-vehicle", "Vehicle Hire",      "#offer"),
    ]),
    linkGroup("col-company", "Company", [
      link("fc-about",   "About Us",     "#who"),
      link("fc-how",     "How It Works", "#how"),
      link("fc-reviews", "Reviews",      "#testimonials"),
      link("fc-faq",     "FAQ",          "#faq"),
    ]),
  ],
};

const TESTIMONIALS = [
  {
    _id: "kuda-t-sarah",
    _type: "testimonial",
    name: "Sarah M.",
    title: "UK — Family Tour, 5 days",
    quote:
      "Kuda made our family trip to Ella absolutely magical. Our driver knew every secret viewpoint and the whole experience was completely stress-free.",
  },
  {
    _id: "kuda-t-ravi",
    _type: "testimonial",
    name: "Ravi K.",
    title: "Singapore — Airport Transfer",
    quote:
      "Booked a last-minute airport transfer and Kuda was on time, professional, and the car was spotless. Will definitely use them for our full tour next year.",
  },
  {
    _id: "kuda-t-anna",
    _type: "testimonial",
    name: "Anna T.",
    title: "Germany — Group Tour, 7 days",
    quote:
      "Our group of 8 travelled from Colombo to Kandy to Nuwara Eliya — every detail was handled. The itinerary was perfect and our driver was wonderful company.",
  },
  {
    _id: "kuda-t-james",
    _type: "testimonial",
    name: "James W.",
    title: "Australia — Solo Traveller",
    quote:
      "I've used Kuda three times now. Consistent, reliable, and genuinely friendly. They recommended spots I'd never have found on my own — true local knowledge.",
  },
  {
    _id: "kuda-t-nadia",
    _type: "testimonial",
    name: "Nadia F.",
    title: "France — Couple's Tour, 4 days",
    quote:
      "Incredible service from start to finish. The booking was easy, communication was fast, and the tour itself exceeded every expectation. Highly recommend.",
  },
];

function buildHomePage(testimonialIds: string[]) {
  const btn = (
    label: string,
    href: string,
    variant: string = "default",
    size: string = "sm"
  ) => ({
    _type: "button",
    label,
    buttonVariant: variant,
    buttonSize: size,
    isExternal: true,
    href,
    target: false,
  });

  return {
    _id: "kuda-home",
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "index" },
    blocks: [
      // ── 1. HERO ───────────────────────────────────────────────────────────
      {
        _type: "hero-kuda",
        _key: "blk-hero",
        eyebrow: "Sri Lanka's trusted travel partner",
        heading: "Your journey, perfectly planned.",
        description:
          "Comfortable vehicles, expert local drivers, and tailor-made itineraries — for day trips, island tours, and everything in between.",
        primaryButton: btn("Plan Your Journey", "#cta", "default", "lg"),
        secondaryButton: btn("See Services", "#offer", "outline", "lg"),
      },

      // ── 2. TRUST STRIP ────────────────────────────────────────────────────
      {
        _type: "trust-strip",
        _key: "blk-trust",
        label: "Trusted for",
        items: [
          { _key: "ti-1", text: "Day Tours" },
          { _key: "ti-2", text: "Multi-Day Trips" },
          { _key: "ti-3", text: "Airport Transfers" },
          { _key: "ti-4", text: "Group Travel" },
          { _key: "ti-5", text: "City Excursions" },
        ],
      },

      // ── 3. WHO WE ARE ─────────────────────────────────────────────────────
      {
        _type: "who-we-are",
        _key: "blk-who",
        eyebrow: "Who We Are",
        heading: "Local knowledge, seamless journeys",
        description:
          "Kuda Travel & Tours was built on one simple idea — that exploring Sri Lanka should be effortless. We connect travellers with experienced local drivers and handcrafted itineraries, so you can focus on the experience, not the logistics.",
        checkItems: [
          { _key: "ci-1", text: "Professional, licensed drivers with deep local knowledge" },
          { _key: "ci-2", text: "Custom itineraries tailored to your pace and interests" },
          { _key: "ci-3", text: "Well-maintained, air-conditioned vehicles for all group sizes" },
          { _key: "ci-4", text: "Island-wide coverage — coast to mountains and everywhere between" },
          { _key: "ci-5", text: "24/7 support for any changes to your plan" },
        ],
      },

      // ── 4. SERVICES GRID ──────────────────────────────────────────────────
      {
        _type: "services-grid",
        _key: "blk-services",
        eyebrow: "What We Offer",
        heading: "Every kind of journey, covered.",
        description:
          "From a quick airport transfer to a multi-week island adventure — we have the right option for every traveller.",
        services: [
          {
            _key: "sv-1",
            iconKey: "day-tours",
            title: "Day Tours",
            description:
              "Full-day guided experiences to a single region or destination — curated stops, comfortable ride, local insights included.",
          },
          {
            _key: "sv-2",
            iconKey: "multi-day",
            title: "Multi-Day Tours",
            description:
              "Immersive multi-day itineraries across Sri Lanka — planned end-to-end with accommodation guidance, routes and more.",
          },
          {
            _key: "sv-3",
            iconKey: "airport",
            title: "Airport Transfers",
            description:
              "Reliable, punctual pick-up and drop-off at any Sri Lankan airport. Meet & greet service included as standard.",
          },
          {
            _key: "sv-4",
            iconKey: "city",
            title: "City Excursions",
            description:
              "Curated city tours of Colombo, Kandy, Galle and more — culture, cuisine, and hidden gems with a local guide.",
          },
          {
            _key: "sv-5",
            iconKey: "group",
            title: "Group Travel",
            description:
              "Spacious vehicles for families, corporate groups, and guided group tours — any size, fully managed.",
          },
          {
            _key: "sv-6",
            iconKey: "vehicle",
            title: "Vehicle Hire",
            description:
              "Hire any vehicle from our fleet with a professional driver — by the day or by the trip, for as long as you need.",
          },
        ],
      },

      // ── 5. HOW IT WORKS ───────────────────────────────────────────────────
      {
        _type: "how-it-works",
        _key: "blk-how",
        eyebrow: "How It Works",
        heading: "From enquiry to arrival in four easy steps.",
        description:
          "Getting on the road with Kuda is simple. We handle all the planning — you just enjoy the journey.",
        ctaButton: btn("Start Planning", "#cta", "default", "sm"),
        steps: [
          {
            _key: "st-1",
            title: "Get in Touch",
            description:
              "Contact us via phone, WhatsApp, or the enquiry form with your travel details and preferences.",
          },
          {
            _key: "st-2",
            title: "Plan Together",
            description:
              "We'll craft an itinerary around your dates, destinations, group size and budget — shared for your approval.",
          },
          {
            _key: "st-3",
            title: "Confirm & Pay",
            description:
              "Review your personalised plan, confirm the booking and make a simple advance payment to secure your spot.",
          },
          {
            _key: "st-4",
            title: "Enjoy the Ride",
            description:
              "Your driver arrives on time, ready to go. Sit back and let Kuda take care of everything from here.",
          },
        ],
      },

      // ── 6. STATS ──────────────────────────────────────────────────────────
      {
        _type: "stats-1",
        _key: "blk-stats",
        headline:
          "We're changing how Sri Lanka is explored, one journey at a time.",
        stats: [
          { _key: "s-1", value: "500+", label: "Tours completed across Sri Lanka" },
          { _key: "s-2", value: "98%",  label: "Customers who rate us 5 stars" },
          { _key: "s-3", value: "12+",  label: "Years of travel expertise" },
          { _key: "s-4", value: "24/7", label: "Support, always reachable" },
        ],
      },

      // ── 7. TESTIMONIALS ───────────────────────────────────────────────────
      {
        _type: "testimonials-kuda",
        _key: "blk-testimonials",
        eyebrow: "Testimonials",
        heading: "What our travellers say",
        testimonials: testimonialIds.map((id, i) => ({
          _type: "reference",
          _ref: id,
          _key: `tref-${i}`,
        })),
      },

      // ── 8. CTA FORM ───────────────────────────────────────────────────────
      {
        _type: "cta-form",
        _key: "blk-cta",
        eyebrow: "Ready to explore?",
        heading: "Plan your Sri Lanka journey today.",
        description:
          "Tell us where you want to go. We'll take care of the rest — vehicles, routes, drivers, and every detail in between.",
      },

      // ── 9. FAQ ────────────────────────────────────────────────────────────
      {
        _type: "faq-1",
        _key: "blk-faq",
        eyebrow: "FAQ",
        heading: "Questions? We've got answers.",
        description:
          "Anything else on your mind — just reach out and we'll be happy to help.",
        contactEmail: "info@kudatravels.com",
        faqs: [
          {
            _key: "fq-1",
            question: "How far in advance should I book my tour?",
            answer:
              "We recommend booking at least 2–3 days in advance for day tours and 1–2 weeks ahead for multi-day trips, especially during peak seasons. That said, we often accommodate last-minute bookings — just get in touch and we'll do our best.",
          },
          {
            _key: "fq-2",
            question: "Do you provide airport pick-up and drop-off?",
            answer:
              "Yes! We offer airport transfers to and from Bandaranaike International Airport (CMB) and all regional airports in Sri Lanka. Our drivers will meet you at arrivals with a name board, assist with luggage, and get you to your destination comfortably.",
          },
          {
            _key: "fq-3",
            question: "Can I customise my itinerary?",
            answer:
              "Absolutely. Every Kuda tour is built around what you want — your preferred destinations, pace, cuisine interests, and budget. We'll draft an itinerary, you review it, and we refine until it's perfect. There's no off-the-shelf package here.",
          },
          {
            _key: "fq-4",
            question: "What vehicles do you have?",
            answer:
              "Our fleet includes air-conditioned sedans (up to 3 passengers), SUVs (up to 5), luxury minivans (up to 8), and coaches for larger groups (up to 30+). All vehicles are well-maintained and driver-operated.",
          },
          {
            _key: "fq-5",
            question: "How do payments work?",
            answer:
              "We typically require a small advance payment to confirm your booking, with the balance due at the start or end of your tour. We accept bank transfers, online payments, and cash. Full details will be confirmed when you book.",
          },
          {
            _key: "fq-6",
            question: "What if my plans change?",
            answer:
              "Life happens — we get it. Our team is available 24/7 to help adjust your itinerary, change dates, or handle any unexpected situations. We pride ourselves on being flexible and responsive for our travellers.",
          },
        ],
      },
    ],

    // SEO
    meta: {
      metaTitle: "Kuda Travel & Tours — Sri Lanka",
      metaDescription:
        "Sri Lanka's trusted travel partner. Expert drivers, custom itineraries, day tours, multi-day trips, airport transfers and more.",
    },
  };
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  // Validate token
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error(
      "\n✗ SANITY_API_WRITE_TOKEN is not set.\n" +
        "  1. Go to https://www.sanity.io/manage → your project → API → Tokens\n" +
        "  2. Create an Editor token\n" +
        "  3. Add SANITY_API_WRITE_TOKEN=<token> to studio/.env.local\n"
    );
    process.exit(1);
  }

  console.log(
    `\nSeeding Sanity  →  project: ${process.env.SANITY_STUDIO_PROJECT_ID}  dataset: ${process.env.SANITY_STUDIO_DATASET}\n`
  );

  // 1 — Settings
  console.log("Settings");
  await upsert(SETTINGS);

  // 2 — Header
  console.log("\nHeader");
  await upsert(HEADER);

  // 3 — Footer
  console.log("\nFooter");
  await upsert(FOOTER);

  // 4 — Testimonials
  console.log("\nTestimonials");
  const testimonialIds: string[] = [];
  for (const t of TESTIMONIALS) {
    const result = await upsert(t);
    testimonialIds.push(result._id);
  }

  // 5 — Home page
  console.log("\nHome page");
  await upsert(buildHomePage(testimonialIds));

  console.log("\n✓ Seed complete!\n");
  console.log("Next steps:");
  console.log("  • Upload the Kuda logo in Settings → Logo");
  console.log("  • Run `pnpm dev` to start the local dev servers");
  console.log("  • Open http://localhost:3000 to preview the site\n");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err.message ?? err);
  process.exit(1);
});

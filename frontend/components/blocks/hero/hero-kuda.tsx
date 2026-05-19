import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";

type HeroKudaProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-kuda" }
>;

function resolveHref(button: any): string {
  if (!button) return "#";
  if (button.isExternal && button.href) return button.href;
  if (button.internalLink?.slug?.current) return `/${button.internalLink.slug.current}`;
  return "#";
}

export default function HeroKuda({ eyebrow, heading, description, primaryButton, secondaryButton }: HeroKudaProps) {
  const primaryHref = resolveHref(primaryButton);
  const secondaryHref = resolveHref(secondaryButton);

  return (
    <section className="bg-brand-heroBg pt-[90px] overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        {/* Text */}
        <div className="pb-20 max-lg:pb-12">
          {eyebrow && (
            <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
              {eyebrow}
            </span>
          )}
          <h1 className="text-[clamp(36px,4.5vw,58px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-brand-secondary mb-5">
            {heading}
          </h1>
          {description && (
            <p className="text-[17px] text-brand-muted font-normal max-w-[420px] mb-9 leading-[1.7]">
              {description}
            </p>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            {primaryButton?.label && (
              <Link
                href={primaryHref}
                target={primaryButton.target ? "_blank" : undefined}
                className="inline-flex items-center gap-2 px-7 py-[14px] rounded-lg bg-brand-primary text-white text-[15px] font-semibold transition-all duration-200 hover:bg-brand-dark hover:-translate-y-px"
              >
                {primaryButton.label}
              </Link>
            )}
            {secondaryButton?.label && (
              <Link
                href={secondaryHref}
                target={secondaryButton.target ? "_blank" : undefined}
                className="inline-flex items-center gap-2 px-7 py-[14px] rounded-lg bg-transparent text-brand-secondary text-[15px] font-semibold border border-brand-border transition-all duration-200 hover:border-brand-primary hover:text-brand-primary"
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>
        </div>

        {/* Van illustration */}
        <div className="flex justify-center items-end max-lg:hidden">
          <svg className="w-full max-w-[440px]" viewBox="0 0 440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="220" cy="370" rx="140" ry="14" fill="#c8cdd6" opacity="0.4"/>
            <rect x="60" y="340" width="320" height="28" rx="6" fill="#dde1e8"/>
            <rect x="100" y="351" width="40" height="6" rx="3" fill="white" opacity="0.7"/>
            <rect x="200" y="351" width="40" height="6" rx="3" fill="white" opacity="0.7"/>
            <rect x="300" y="351" width="40" height="6" rx="3" fill="white" opacity="0.7"/>
            <rect x="80" y="255" width="280" height="100" rx="18" fill="#474546"/>
            <path d="M108 255 L126 210 L330 210 L352 255 Z" fill="#5a5859"/>
            <rect x="136" y="218" width="56" height="30" rx="6" fill="#a8c5d4" opacity="0.85"/>
            <rect x="202" y="218" width="56" height="30" rx="6" fill="#a8c5d4" opacity="0.85"/>
            <rect x="268" y="218" width="48" height="30" rx="6" fill="#a8c5d4" opacity="0.85"/>
            <path d="M330 210 L352 255 L340 255 L320 218 Z" fill="#b8d0de" opacity="0.75"/>
            <rect x="356" y="260" width="24" height="14" rx="4" fill="#e8d47a"/>
            <rect x="356" y="278" width="24" height="10" rx="3" fill="#f0e8b0" opacity="0.8"/>
            <rect x="60" y="262" width="18" height="14" rx="4" fill="#c0392b" opacity="0.8"/>
            <circle cx="320" cy="340" r="34" fill="#2d2b2c"/>
            <circle cx="320" cy="340" r="22" fill="#474546"/>
            <circle cx="320" cy="340" r="10" fill="#2d2b2c"/>
            <circle cx="320" cy="340" r="4" fill="#8a8788"/>
            <circle cx="140" cy="340" r="34" fill="#2d2b2c"/>
            <circle cx="140" cy="340" r="22" fill="#474546"/>
            <circle cx="140" cy="340" r="10" fill="#2d2b2c"/>
            <circle cx="140" cy="340" r="4" fill="#8a8788"/>
            <line x1="200" y1="255" x2="200" y2="340" stroke="#2d2b2c" strokeWidth="2.5" opacity="0.6"/>
            <line x1="268" y1="255" x2="268" y2="340" stroke="#2d2b2c" strokeWidth="2.5" opacity="0.6"/>
            <rect x="222" y="294" width="20" height="5" rx="2.5" fill="#8a8788"/>
            <rect x="288" y="294" width="20" height="5" rx="2.5" fill="#8a8788"/>
            <rect x="130" y="207" width="180" height="6" rx="3" fill="#3a3839"/>
            <circle cx="310" cy="90" r="44" fill="#5a8fa8"/>
            <path d="M310 44 C285 44 266 63 266 88 C266 115 310 148 310 148 C310 148 354 115 354 88 C354 63 335 44 310 44 Z" fill="#5a8fa8"/>
            <circle cx="310" cy="86" r="16" fill="white"/>
            <ellipse cx="310" cy="152" rx="18" ry="6" fill="#5a8fa8" opacity="0.25"/>
            <path d="M310 152 C310 180 280 190 250 200 C230 208 220 220 215 238" stroke="#5a8fa8" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" opacity="0.5"/>
            <circle cx="380" cy="60" r="5" fill="#d4a853"/>
            <circle cx="55" cy="130" r="4" fill="#d4a853" opacity="0.7"/>
            <circle cx="400" cy="180" r="3" fill="#5a8fa8" opacity="0.6"/>
            <path d="M70 80 L73 88 L81 88 L75 93 L77 101 L70 96 L63 101 L65 93 L59 88 L67 88 Z" fill="#d4a853" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

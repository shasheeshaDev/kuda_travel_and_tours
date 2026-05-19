import Link from "next/link";
import { PAGE_QUERYResult } from "@/sanity.types";

type HowItWorksProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "how-it-works" }
>;

function resolveHref(button: any): string {
  if (!button) return "#";
  if (button.isExternal && button.href) return button.href;
  if (button.internalLink?.slug?.current) return `/${button.internalLink.slug.current}`;
  return "#";
}

export default function HowItWorks({ eyebrow, heading, description, ctaButton, steps }: HowItWorksProps) {
  return (
    <section id="how" className="py-24 bg-white max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start max-lg:gap-12">
          {/* Left */}
          <div>
            {eyebrow && (
              <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] leading-[1.15] mb-4 text-brand-secondary">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-[16px] text-brand-muted leading-[1.75] mb-8">{description}</p>
            )}
            {ctaButton?.label && (
              <Link
                href={resolveHref(ctaButton)}
                target={ctaButton.target ? "_blank" : undefined}
                className="inline-flex items-center gap-2 px-7 py-[14px] rounded-lg bg-brand-primary text-white text-[15px] font-semibold transition-all duration-200 hover:bg-brand-dark hover:-translate-y-px mb-10"
              >
                {ctaButton.label}
              </Link>
            )}

            {/* Steps */}
            {steps && steps.length > 0 && (
              <div className="flex flex-col mt-10">
                {steps.map((step, i) => (
                  <div
                    key={step._key}
                    className={`flex gap-5 py-7 ${i < steps.length - 1 ? "border-b border-brand-border" : ""}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-primary text-white text-[15px] font-bold flex items-center justify-center flex-shrink-0 mt-[2px]">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold mb-[6px] text-brand-secondary">{step.title}</h4>
                      {step.description && (
                        <p className="text-[14px] text-brand-muted leading-[1.65]">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — phone mockup illustration */}
          <div className="bg-brand-heroBg rounded-[20px] p-10 flex items-center justify-center min-h-[420px] max-lg:min-h-[280px] max-lg:p-7 max-sm:hidden">
            <svg viewBox="0 0 340 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[300px]">
              <rect x="100" y="20" width="140" height="240" rx="20" fill="white" filter="drop-shadow(0 8px 32px rgba(0,0,0,0.10))"/>
              <rect x="100" y="20" width="140" height="240" rx="20" fill="none" stroke="#e8e6e4" strokeWidth="1.5"/>
              <rect x="112" y="40" width="116" height="200" rx="10" fill="#f5f7fa"/>
              <rect x="120" y="55" width="70" height="26" rx="8" fill="#474546"/>
              <text x="155" y="71" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fill="white" fontWeight="600">Hi! Plan a tour?</text>
              <rect x="130" y="90" width="86" height="26" rx="8" fill="#5a8fa8"/>
              <text x="173" y="106" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fill="white" fontWeight="600">Sure! Tell us more</text>
              <rect x="120" y="126" width="80" height="26" rx="8" fill="#474546"/>
              <text x="160" y="142" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8" fill="white" fontWeight="600">3 days, Ella + Kandy</text>
              <rect x="118" y="164" width="100" height="64" rx="8" fill="white" filter="drop-shadow(0 2px 8px rgba(0,0,0,0.08))"/>
              <rect x="126" y="172" width="50" height="5" rx="2.5" fill="#474546"/>
              <rect x="126" y="182" width="36" height="4" rx="2" fill="#c8c5c6"/>
              <rect x="126" y="192" width="44" height="4" rx="2" fill="#c8c5c6"/>
              <rect x="126" y="202" width="30" height="4" rx="2" fill="#c8c5c6"/>
              <rect x="182" y="172" width="28" height="16" rx="4" fill="#5a8fa8"/>
              <text x="196" y="183" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="7" fill="white" fontWeight="700">Plan ✓</text>
              <rect x="148" y="24" width="44" height="6" rx="3" fill="#e8e6e4"/>
              <rect x="30" y="295" width="280" height="8" rx="4" fill="#dde1e8"/>
              <rect x="55" y="260" width="140" height="50" rx="10" fill="#474546"/>
              <path d="M72 260 L84 230 L175 230 L187 260 Z" fill="#5a5859"/>
              <rect x="90" y="236" width="30" height="18" rx="4" fill="#a8c5d4" opacity="0.85"/>
              <rect x="128" y="236" width="30" height="18" rx="4" fill="#a8c5d4" opacity="0.85"/>
              <rect x="166" y="236" width="18" height="18" rx="4" fill="#a8c5d4" opacity="0.75"/>
              <circle cx="90" cy="295" r="18" fill="#2d2b2c"/>
              <circle cx="90" cy="295" r="10" fill="#474546"/>
              <circle cx="170" cy="295" r="18" fill="#2d2b2c"/>
              <circle cx="170" cy="295" r="10" fill="#474546"/>
              <rect x="195" y="270" width="14" height="10" rx="3" fill="#e8d47a"/>
              <line x1="270" y1="220" x2="270" y2="290" stroke="#474546" strokeWidth="2.5"/>
              <path d="M270 220 L300 230 L270 240 Z" fill="#5a8fa8"/>
              <circle cx="40" cy="240" r="4" fill="#d4a853" opacity="0.7"/>
              <circle cx="300" cy="215" r="5" fill="#d4a853" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

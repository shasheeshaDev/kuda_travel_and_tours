import { PAGE_QUERYResult } from "@/sanity.types";
import DynamicForm from "@/components/forms/dynamic-form";

type CtaFormProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "cta-form" }
>;

export default function CtaForm({ eyebrow, heading, description, form }: CtaFormProps) {
  return (
    <section id="cta" className="py-24 bg-brand-heroBg max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center max-lg:gap-10">

          {/* Form side */}
          <div>
            {eyebrow && (
              <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-[clamp(28px,3.5vw,46px)] font-extrabold tracking-[-0.02em] leading-[1.12] mb-[18px] text-brand-secondary">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-[17px] text-brand-muted leading-[1.7] mb-8">
                {description}
              </p>
            )}

            {form?.selectedFormSheet && form?.selectedFormConfig ? (
              <DynamicForm formSettings={form as any} />
            ) : (
              <p className="text-[14px] text-brand-muted italic">
                No form configured — select a Form Sheet and Form Config in the Studio.
              </p>
            )}
          </div>

          {/* Suitcase illustration */}
          <div className="flex items-center justify-center max-lg:hidden">
            <svg viewBox="0 0 320 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[300px]">
              <rect x="80" y="160" width="160" height="140" rx="16" fill="#474546"/>
              <rect x="80" y="160" width="160" height="140" rx="16" fill="none" stroke="#3a3839" strokeWidth="2"/>
              <path d="M130 160 L130 140 C130 130 190 130 190 140 L190 160" stroke="#5a5859" strokeWidth="7" strokeLinecap="round" fill="none"/>
              <rect x="80" y="218" width="160" height="12" fill="#3a3839"/>
              <circle cx="106" cy="302" r="10" fill="#2d2b2c"/>
              <circle cx="214" cy="302" r="10" fill="#2d2b2c"/>
              <rect x="112" y="175" width="96" height="28" rx="6" fill="#5a5859"/>
              <rect x="118" y="181" width="50" height="5" rx="2.5" fill="#8a8788"/>
              <rect x="118" y="191" width="36" height="4" rx="2" fill="#6a6869"/>
              <rect x="92" y="248" width="40" height="28" rx="4" fill="#5a8fa8"/>
              <rect x="95" y="251" width="34" height="4" rx="2" fill="white" opacity="0.5"/>
              <rect x="95" y="259" width="24" height="3" rx="1.5" fill="white" opacity="0.4"/>
              <rect x="95" y="265" width="28" height="3" rx="1.5" fill="white" opacity="0.3"/>
              <path d="M160 60 C142 60 130 72 130 86 C130 108 160 138 160 138 C160 138 190 108 190 86 C190 72 178 60 160 60 Z" fill="#5a8fa8"/>
              <circle cx="160" cy="85" r="14" fill="white"/>
              <circle cx="160" cy="85" r="7" fill="#5a8fa8"/>
              <ellipse cx="160" cy="142" rx="14" ry="5" fill="#5a8fa8" opacity="0.2"/>
              <line x1="160" y1="147" x2="160" y2="158" stroke="#5a8fa8" strokeWidth="2" strokeDasharray="4 3" opacity="0.5"/>
              <circle cx="60" cy="100" r="5" fill="#d4a853" opacity="0.7"/>
              <circle cx="268" cy="130" r="4" fill="#d4a853" opacity="0.6"/>
              <circle cx="56" cy="260" r="3.5" fill="#5a8fa8" opacity="0.5"/>
              <circle cx="274" cy="280" r="5" fill="#d4a853" opacity="0.5"/>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}

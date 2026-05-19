import { PAGE_QUERYResult } from "@/sanity.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "faq-1" }
>;

export default function Faq1({ eyebrow, heading, description, contactEmail, faqs }: Faq1Props) {
  return (
    <section id="faq" className="py-24 bg-white max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-start max-lg:gap-10">
          {/* Left */}
          <div>
            {eyebrow && (
              <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.02em] leading-[1.15] mb-4 text-brand-secondary">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-[15px] text-brand-muted leading-[1.7] mt-3">{description}</p>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="inline-block mt-6 text-[14px] font-semibold text-brand-primary border-b border-brand-primary pb-[2px] hover:opacity-75 transition-opacity"
              >
                {contactEmail} →
              </a>
            )}
          </div>

          {/* Right — accordion */}
          {faqs && faqs.length > 0 && (
            <Accordion type="single" collapsible className="flex flex-col">
              {faqs.map((faq) => (
                <AccordionItem key={faq._key} value={faq._key} className="border-b border-brand-border">
                  <AccordionTrigger className="py-[22px] text-[16px] font-semibold text-brand-secondary hover:text-brand-primary text-left no-underline hover:no-underline [&>svg]:hidden max-sm:text-[14px]">
                    <span className="flex justify-between items-center w-full gap-4">
                      {faq.question}
                      <span className="w-7 h-7 rounded-full border border-brand-border flex items-center justify-center flex-shrink-0 transition-all duration-200 group-data-[state=open]:bg-brand-primary group-data-[state=open]:border-brand-primary">
                        <svg viewBox="0 0 14 14" className="w-[14px] h-[14px] stroke-brand-secondary fill-none group-data-[state=open]:stroke-white transition-transform duration-200 group-data-[state=open]:rotate-45" strokeWidth="2" strokeLinecap="round">
                          <path d="M7 1v12M1 7h12"/>
                        </svg>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-brand-muted leading-[1.75] pb-[22px] max-sm:text-[14px]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
}

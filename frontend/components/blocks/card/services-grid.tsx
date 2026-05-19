import { PAGE_QUERYResult } from "@/sanity.types";

type ServicesGridProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "services-grid" }
>;

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "day-tours": (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
      <circle cx="13" cy="13" r="10" stroke="#5a8fa8" strokeWidth="1.8"/>
      <path d="M13 7v6l4 2" stroke="#5a8fa8" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  "multi-day": (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
      <path d="M4 13h18M4 7h18M4 19h12" stroke="#5a8fa8" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  airport: (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
      <path d="M22 16.5v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1A19.5 19.5 0 014.7 12a19.8 19.8 0 01-3.1-8.7A2 2 0 013.6 1.3H6.6a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L7.9 8.4a16 16 0 006 6l1.3-.9a2 2 0 012.1-.5c.9.3 1.9.6 2.8.7A2 2 0 0122 16.5z" stroke="#5a8fa8" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  city: (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
      <path d="M13 2C8 2 4 6 4 11c0 7.5 9 13 9 13s9-5.5 9-13c0-5-4-9-9-9z" stroke="#5a8fa8" strokeWidth="1.8"/>
      <circle cx="13" cy="11" r="3" stroke="#5a8fa8" strokeWidth="1.8"/>
    </svg>
  ),
  group: (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#5a8fa8" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke="#5a8fa8" strokeWidth="1.8"/>
      <path d="M23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8" stroke="#5a8fa8" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  vehicle: (
    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[26px] h-[26px]">
      <rect x="1" y="3" width="15" height="13" stroke="#5a8fa8" strokeWidth="1.8" rx="2"/>
      <path d="M16 8h4l3 5v3h-7V8z" stroke="#5a8fa8" strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="5.5" cy="19.5" r="2.5" stroke="#5a8fa8" strokeWidth="1.8"/>
      <circle cx="18.5" cy="19.5" r="2.5" stroke="#5a8fa8" strokeWidth="1.8"/>
    </svg>
  ),
};

export default function ServicesGrid({ eyebrow, heading, description, services }: ServicesGridProps) {
  return (
    <section id="offer" className="py-24 bg-brand-cream max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">
        {/* Header */}
        <div className="text-center mb-14">
          {eyebrow && (
            <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-[clamp(28px,3.2vw,44px)] font-extrabold tracking-[-0.02em] leading-[1.15] mb-4 text-brand-secondary">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-[17px] text-brand-muted max-w-[540px] mx-auto leading-[1.7]">
              {description}
            </p>
          )}
        </div>

        {/* Grid */}
        {services && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-sm:gap-3">
            {services.map((service, i) => (
              <div
                key={service._key}
                className="bg-white rounded-2xl px-7 py-8 border border-brand-border transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[6px] hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] max-sm:px-5 max-sm:py-6"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="w-[52px] h-[52px] rounded-[14px] bg-brand-heroBg flex items-center justify-center mb-5">
                  {SERVICE_ICONS[service.iconKey || ""] || SERVICE_ICONS["city"]}
                </div>
                {service.title && (
                  <h3 className="text-[17px] font-bold mb-[10px] leading-normal text-brand-secondary">
                    {service.title}
                  </h3>
                )}
                {service.description && (
                  <p className="text-[14px] text-brand-muted leading-[1.7]">
                    {service.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

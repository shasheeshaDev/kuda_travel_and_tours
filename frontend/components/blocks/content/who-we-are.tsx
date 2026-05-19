import { PAGE_QUERYResult } from "@/sanity.types";

type WhoWeAreProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "who-we-are" }
>;

export default function WhoWeAre({ eyebrow, heading, description, checkItems }: WhoWeAreProps) {
  return (
    <section id="who" className="py-24 bg-white max-lg:py-16 max-sm:py-13">
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-lg:gap-10">
          {/* Map illustration */}
          <div className="bg-brand-sageBg rounded-[20px] aspect-[4/3] flex items-center justify-center overflow-hidden max-lg:max-h-[280px] max-sm:max-h-[220px]">
            <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[85%] h-[85%]">
              <rect x="20" y="20" width="380" height="280" rx="16" fill="white"/>
              <rect x="20" y="20" width="380" height="280" rx="16" fill="none" stroke="#e8e6e4" strokeWidth="1.5"/>
              <line x1="20" y1="80" x2="400" y2="80" stroke="#f0eeec" strokeWidth="1"/>
              <line x1="20" y1="140" x2="400" y2="140" stroke="#f0eeec" strokeWidth="1"/>
              <line x1="20" y1="200" x2="400" y2="200" stroke="#f0eeec" strokeWidth="1"/>
              <line x1="20" y1="260" x2="400" y2="260" stroke="#f0eeec" strokeWidth="1"/>
              <line x1="100" y1="20" x2="100" y2="300" stroke="#f0eeec" strokeWidth="1"/>
              <line x1="180" y1="20" x2="180" y2="300" stroke="#f0eeec" strokeWidth="1"/>
              <line x1="260" y1="20" x2="260" y2="300" stroke="#f0eeec" strokeWidth="1"/>
              <line x1="340" y1="20" x2="340" y2="300" stroke="#f0eeec" strokeWidth="1"/>
              <path d="M60 260 C80 240 100 220 140 200 C180 180 200 160 240 140 C280 120 320 110 360 90" stroke="#dde1e8" strokeWidth="12" strokeLinecap="round"/>
              <path d="M60 260 C80 240 100 220 140 200 C180 180 200 160 240 140 C280 120 320 110 360 90" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 8"/>
              <path d="M80 240 C110 215 150 195 200 170 C240 150 290 125 340 100" stroke="#5a8fa8" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 6"/>
              <circle cx="80" cy="240" r="14" fill="#474546"/>
              <circle cx="80" cy="240" r="6" fill="white"/>
              <circle cx="340" cy="100" r="18" fill="#5a8fa8"/>
              <path d="M340 82 C328 82 320 90 320 100 C320 115 340 132 340 132 C340 132 360 115 360 100 C360 90 352 82 340 82 Z" fill="#5a8fa8"/>
              <circle cx="340" cy="99" r="7" fill="white"/>
              <rect x="188" y="154" width="36" height="18" rx="5" fill="#474546"/>
              <rect x="194" y="148" width="24" height="10" rx="3" fill="#5a5859"/>
              <circle cx="196" cy="172" r="6" fill="#2d2b2c"/>
              <circle cx="218" cy="172" r="6" fill="#2d2b2c"/>
              <rect x="40" y="252" width="60" height="20" rx="4" fill="white"/>
              <text x="70" y="265" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" fill="#474546">Colombo</text>
              <rect x="310" y="108" width="60" height="20" rx="4" fill="white"/>
              <text x="340" y="121" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="700" fill="#5a8fa8">Ella</text>
            </svg>
          </div>

          {/* Content */}
          <div>
            {eyebrow && (
              <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-brand-muted mb-[14px]">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-[clamp(26px,3vw,40px)] font-extrabold tracking-[-0.02em] leading-[1.15] mb-[18px] text-brand-secondary">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-[16px] text-brand-muted leading-[1.75] mb-7">{description}</p>
            )}
            {checkItems && checkItems.length > 0 && (
              <ul className="flex flex-col gap-3">
                {checkItems.map((item) => (
                  <li key={item._key} className="flex items-start gap-3 text-[15px] font-medium text-brand-secondary">
                    <span
                      className="w-5 h-5 rounded-full bg-brand-primary flex-shrink-0 mt-[1px]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 10l3.5 3.5L15 7' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      }}
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

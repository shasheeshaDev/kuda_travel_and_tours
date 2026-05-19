import { PAGE_QUERYResult } from "@/sanity.types";

type TrustStripProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "trust-strip" }
>;

export default function TrustStrip({ label, items }: TrustStripProps) {
  if (!items?.length) return null;

  return (
    <div className="bg-white border-b border-brand-border py-5">
      <div className="max-w-[1160px] mx-auto px-10 flex items-center gap-10 flex-wrap max-lg:px-6 max-sm:px-4 max-sm:flex-col max-sm:gap-3 max-sm:items-start">
        {label && (
          <span className="text-[13px] text-brand-muted font-medium whitespace-nowrap">{label}</span>
        )}
        <div className="flex gap-8 items-center flex-wrap max-sm:gap-3">
          {items.map((item) => (
            <div key={item._key} className="flex items-center gap-2 text-[14px] font-semibold text-brand-secondary">
              <span className="w-2 h-2 rounded-full bg-brand-accentBlue flex-shrink-0" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

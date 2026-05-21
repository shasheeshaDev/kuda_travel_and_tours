import { PAGE_QUERYResult } from "@/sanity.types";

// Kuda block components
import HeroKuda         from "@/components/blocks/hero/hero-kuda";
import TrustStrip       from "@/components/blocks/hero/trust-strip";
import WhoWeAre         from "@/components/blocks/content/who-we-are";
import ServicesGrid     from "@/components/blocks/card/services-grid";
import HowItWorks       from "@/components/blocks/content/how-it-works";
import Stats1           from "@/components/blocks/stats/stats-1";
import TestimonialsKuda from "@/components/blocks/testimonial/testimonials-kuda";
import CtaForm          from "@/components/blocks/form/cta-form";
import Faq1             from "@/components/blocks/faq/faq-1";
import Tours1           from "@/components/blocks/tours/tours-1";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];

const componentMap: Record<string, React.ComponentType<any>> = {
  "hero-kuda":        HeroKuda,
  "trust-strip":      TrustStrip,
  "who-we-are":       WhoWeAre,
  "services-grid":    ServicesGrid,
  "how-it-works":     HowItWorks,
  "stats-1":          Stats1,
  "testimonials-kuda": TestimonialsKuda,
  "tours-1":          Tours1,
  "cta-form":         CtaForm,
  "faq-1":            Faq1,
};

export default function Blocks({
  blocks,
  searchParams,
}: {
  blocks: Block[];
  searchParams?: Promise<{ page?: string }>;
}) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        const blockWithKey = block as Block & { _key: string };

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`No component for block type: ${block._type}`);
          }
          return <div data-type={block._type} key={blockWithKey._key} />;
        }

        return (
          <Component
            {...(block as any)}
            key={blockWithKey._key}
            searchParams={searchParams}
          />
        );
      })}
    </>
  );
}

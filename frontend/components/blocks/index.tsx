import { PAGE_QUERYResult } from "@/sanity.types";

// Banner components
import HeroBanner from "@/components/blocks/banner/hero-banner";

// Card components
import CardOption1 from "@/components/blocks/card/card-option-1";
import CardOption2 from "@/components/blocks/card/card-option-2";
import CardOption3 from "@/components/blocks/card/card-option-3";
import CardOption4 from "@/components/blocks/card/card-option-4";
import CardOption5 from "@/components/blocks/card/card-option-5";

// Content components
import ContentOption1 from "@/components/blocks/content/content-option-1";
import ContentOption2 from "@/components/blocks/content/content-option-2";
import ContentOption3 from "@/components/blocks/content/content-option-3";
import ContentOption4 from "@/components/blocks/content/content-option-4";

// Form components
import Form1 from "@/components/blocks/form/form1";

// Testimonial components
import TestimonialOption1 from "@/components/blocks/testimonial/testimonial-option-1";

// Video components
import VideoOption1 from "@/components/blocks/video/video-option-1";

// Collection components
import CollectionBlock1 from "@/components/blocks/collection/collection-block-1";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];

// Component map for rendering blocks
// Using Record<string, ComponentType> to handle block types that may not be
// fully represented in generated types due to GROQ conditional projection limitations
const componentMap: Record<string, React.ComponentType<any>> = {
  // Banner blocks
  "banner-1": HeroBanner,

  // Card blocks
  "card-1": CardOption1,
  "card-2": CardOption2,
  "card-3": CardOption3,
  "card-4": CardOption4,
  "card-5": CardOption5,

  // Content blocks
  "content-1": ContentOption1,
  "content-2": ContentOption2,
  "content-3": ContentOption4,
  "content-4": ContentOption3,

  // Form blocks
  "form-1": Form1,

  // Testimonial blocks
  "testimonial-1": TestimonialOption1,

  // Video blocks
  "video-1": VideoOption1,

  // Collection blocks
  "collection-1": CollectionBlock1,
};

export default function Blocks({
  blocks,
  searchParams,
}: {
  blocks: Block[];
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        // All blocks have _key at runtime (added by Sanity), even if not in all type definitions
        const blockWithKey = block as Block & { _key: string };

        if (!Component) {
          // Fallback for development/debugging of new component types
          console.warn(
            `No component implemented for block type: ${block._type}`
          );
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

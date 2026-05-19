import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";
import { imageQuery } from "./shared/image";

// Kuda block queries
import { heroKudaQuery }       from "./hero/hero-kuda";
import { trustStripQuery }     from "./hero/trust-strip";
import { whoWeAreQuery }       from "./content/who-we-are";
import { servicesGridQuery }   from "./card/services-grid";
import { howItWorksQuery }     from "./content/how-it-works";
import { stats1Query }         from "./stats/stats-1";
import { testimonialsKudaQuery } from "./testimonial/testimonials-kuda";
import { ctaFormQuery }        from "./form/cta-form";
import { faq1Query }           from "./faq/faq-1";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    isGlobalBanner,
    bannerImage{
      ${imageQuery}
    },
    bannerContent{
      eyebrowHeading,
      heading,
      description
    },
    isPrefooterCta,
    blocks[]{
      ${heroKudaQuery},
      ${trustStripQuery},
      ${whoWeAreQuery},
      ${servicesGridQuery},
      ${howItWorksQuery},
      ${stats1Query},
      ${testimonialsKudaQuery},
      ${ctaFormQuery},
      ${faq1Query},
    },
    ${metaQuery},
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;

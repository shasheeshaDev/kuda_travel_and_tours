import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";
import { imageQuery } from "./shared/image";
import { sectionHeaderQuery } from "./section-header";
import { content1Query } from "./content/content1";
import { content2Query } from "./content/content2";
import { content3Query } from "./content/content3";
import { content4Query } from "./content/content4";
import { card1Query } from "./card/card1";
import { card2Query } from "./card/card2";
import { card3Query } from "./card/card3";
import { card4Query } from "./card/card4";
import { card5Query } from "./card/card5";
import { form1Query } from "./form/form1";
import { banner1Query } from "./banner/banner1";
import { banner2Query } from "./banner/banner2";
import { testimonial1Query } from "./testimonial/testimonial1";
import { collection1Query } from "./collection/collection1";
import { map1Query } from "./map/map1";
import { video1Query } from "./video/video1";

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
      ${sectionHeaderQuery},
      ${content1Query},
      ${content2Query},
      ${content3Query},
      ${content4Query},
      ${card1Query},
      ${card2Query},
      ${card3Query},
      ${card4Query},
      ${card5Query},
      ${form1Query},
      ${banner1Query},
      ${banner2Query},
      ${testimonial1Query},
      ${collection1Query},
      ${map1Query},
      ${video1Query},
    },
    ${metaQuery},
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;

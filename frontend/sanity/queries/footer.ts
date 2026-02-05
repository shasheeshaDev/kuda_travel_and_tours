import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { socialMediaLinksQuery } from "./shared/social-media";
import { imageQuery } from "./shared/image";

export const FOOTER_QUERY = groq`
  *[_type == "footer"][0]{
    _type,
    description,
    background,
    "footerLogo": *[_type == "settings"][0].footerLogo{
      ${imageQuery}
    },
    ${socialMediaLinksQuery},
    links[]{
      ${linkQuery},
      title,
      _type == "link-group" => {
        links[]{
          ${linkQuery}
        }
      }
    },
    bottomLinks[]{
      ${linkQuery}
    },
  }
`;

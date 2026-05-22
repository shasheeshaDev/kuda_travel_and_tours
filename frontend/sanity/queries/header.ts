import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { imageQuery } from "./shared/image";

export const HEADER_QUERY = groq`
  *[_type == "header"][0]{
    _type,
    "logo": *[_type == "settings"][0].siteLogo{
      ${imageQuery}
    },
    "siteName": *[_type == "settings"][0].siteName,
    links[]{
      ${linkQuery},
      _type == "link-group" => {
        links[]{
          ${linkQuery}
        }
      }
    },
    ctaLinks[]{
      ${linkQuery}
    },
  }
`;

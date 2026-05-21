import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { imageQuery } from "./shared/image";

export const FOOTER_QUERY = groq`
  *[_type == "footer"][0]{
    _type,
    footerLogo{
      ${imageQuery}
    },
    description,
    links[]{
      ${linkQuery},
      title,
      _type == "link-group" => {
        links[]{
          ${linkQuery}
        }
      }
    },
  }
`;

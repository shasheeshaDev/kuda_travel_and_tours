import { imageQuery } from "../shared/image";

export const testimonialsKudaQuery = `
  _type == "testimonials-kuda" => {
    _type,
    _key,
    eyebrow,
    heading,
    testimonials[]-> {
      _id,
      name,
      title,
      quote,
      avatar {
        ${imageQuery}
      },
    },
  }
`;

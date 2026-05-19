import { buttonQuery } from "../shared/button";

export const heroKudaQuery = `
  _type == "hero-kuda" => {
    _type,
    _key,
    eyebrow,
    heading,
    description,
    primaryButton {
      ${buttonQuery}
    },
    secondaryButton {
      ${buttonQuery}
    },
  }
`;

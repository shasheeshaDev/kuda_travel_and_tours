import { buttonQuery } from "../shared/button";

export const howItWorksQuery = `
  _type == "how-it-works" => {
    _type,
    _key,
    eyebrow,
    heading,
    description,
    ctaButton {
      ${buttonQuery}
    },
    steps[] {
      _key,
      title,
      description,
    },
  }
`;

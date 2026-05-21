import { buttonQuery } from "../shared/button";

export const tours1Query = `
  _type == "tours-1" => {
    _type,
    _key,
    eyebrow,
    heading,
    description,
    tabs[] {
      _key,
      label,
      tours[] {
        _key,
        emoji,
        title,
        meta,
      },
    },
    ctaButton {
      ${buttonQuery}
    },
  }
`;

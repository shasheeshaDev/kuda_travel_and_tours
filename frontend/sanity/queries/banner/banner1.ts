import { backgroundQuery } from "../shared/background";
import { buttonQuery } from "../shared/button";
import { socialMediaLinksQuery } from "../shared/social-media";

export const banner1Query = `
  _type == "banner-1" => {
    _type,
    _key,
    padding,
    eyebrowHeading,
    heading,
    subText,
    buttons[]{
      ${buttonQuery}
    },
    ${socialMediaLinksQuery},
    background {
      ${backgroundQuery}
    }
  }
`;

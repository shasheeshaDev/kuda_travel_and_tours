import { buttonQuery } from "../shared/button";
import { bodyQuery } from "../shared/body";

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
        route,
        content[]{
          ${bodyQuery}
        },
      },
    },
    ctaButton {
      ${buttonQuery}
    },
    bookingFormConfig->{
      toEmail,
      ccEmails,
      bccEmails,
      fromName,
      formSubject,
    },
  }
`;

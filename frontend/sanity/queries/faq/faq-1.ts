export const faq1Query = `
  _type == "faq-1" => {
    _type,
    _key,
    eyebrow,
    heading,
    description,
    contactEmail,
    faqs[] {
      _key,
      question,
      answer,
    },
  }
`;

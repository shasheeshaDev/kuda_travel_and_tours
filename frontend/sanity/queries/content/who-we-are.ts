export const whoWeAreQuery = `
  _type == "who-we-are" => {
    _type,
    _key,
    eyebrow,
    heading,
    description,
    checkItems[] {
      _key,
      text,
    },
  }
`;

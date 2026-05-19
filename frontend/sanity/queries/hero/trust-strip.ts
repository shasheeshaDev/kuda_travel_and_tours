export const trustStripQuery = `
  _type == "trust-strip" => {
    _type,
    _key,
    label,
    items[] {
      _key,
      text,
    },
  }
`;

export const stats1Query = `
  _type == "stats-1" => {
    _type,
    _key,
    headline,
    stats[] {
      _key,
      value,
      label,
    },
  }
`;

export const servicesGridQuery = `
  _type == "services-grid" => {
    _type,
    _key,
    eyebrow,
    heading,
    description,
    services[] {
      _key,
      iconKey,
      title,
      description,
    },
  }
`;

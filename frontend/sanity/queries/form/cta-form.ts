export const ctaFormQuery = `
  _type == "cta-form" => {
    _type,
    _key,
    eyebrow,
    heading,
    description,
    form {
      selectedFormConfig ->{
        ...
      },
      selectedFormSheet ->{
        ...
      }
    }
  }
`;

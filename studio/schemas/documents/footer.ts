import { defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "footerLogo",
      type: "image",
      title: "Footer Logo",
      description: "Use the white/inverted version of the logo for the dark footer background.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Brand Description",
      description: "Short tagline shown below the footer logo.",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Link Columns",
      description: "Add link groups to create columns (e.g. Services, Company).",
      of: [{ type: "link-group" }],
    }),
    // defineField({
    //   name: "bottomLinks",
    //   title: "Bottom Links",
    //   type: "array",
    //   of: [{ type: "link-with-label" }],
    // }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});

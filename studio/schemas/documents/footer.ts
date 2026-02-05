import { defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "background",
      type: "image",
      title: "Background Image",
      options: {
        hotspot: true,
      },
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
      title: "Description"
    }),
    defineField({
      name: "socialMediaLinks",
      type: "social-media-links",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link-with-label" }, { type: "link-group" }],
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

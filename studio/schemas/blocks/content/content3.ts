import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "content-3",
  type: "object",
  title: "Content 3",
  description: "",
  icon: Images,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "block-settings",
      title: "Block Settings",
    },
  ],
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      group: "block-settings",
    }),
    defineField({
      name: "contentBlock",
      type: "column-builder",
      title: "Content Block",
      description: "",
      group: "content",
    }),
    defineField({
      name: "imageBlock",
      type: "image",
      title: "Image Block",
      description: "",
      group: "content",
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
  ],
  preview: {
    prepare() {
      return {
        title: "Content 3",
        subtitle: "Left Image and Right Content",
      };
    },
  },
});

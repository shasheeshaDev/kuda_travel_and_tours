import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "content-1",
  type: "object",
  title: "Content 1",
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
      name: "eyebrowHeading",
      type: "string",
      title: "Eyebrow Heading",
      description: "",
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      description: "",
      group: "content",
    }),
    defineField({
      name: "description",
      type: "block-content",
      title: "Content",
      description:
        "",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title1: "heading",
      title2: "eyebrowHeading",
      title3: "description.0.children.0.text",
    },
    prepare({ title1, title2, title3 }) {
      return {
        title: "Content 1",
        subtitle: title1 || title2 || title3 || "No Title",
      };
    },
  },
});

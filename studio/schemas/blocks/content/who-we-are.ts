import { defineType, defineField } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "who-we-are",
  type: "object",
  title: "Who We Are",
  icon: Users,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      group: "block-settings",
    }),
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      group: "content",
      initialValue: "Who We Are",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: "content",
    }),
    defineField({
      name: "checkItems",
      type: "array",
      title: "Check List Items",
      group: "content",
      of: [
        {
          type: "object",
          name: "checkItem",
          fields: [
            defineField({ name: "text", type: "string", title: "Text", validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: "text" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Who We Are" };
    },
  },
});

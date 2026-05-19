import { defineType, defineField } from "sanity";
import { BarChart2 } from "lucide-react";

export default defineType({
  name: "stats-1",
  type: "object",
  title: "Stats Section",
  icon: BarChart2,
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
      name: "headline",
      type: "string",
      title: "Headline",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      group: "content",
      of: [
        {
          type: "object",
          name: "statItem",
          fields: [
            defineField({
              name: "value",
              type: "string",
              title: "Value",
              description: "e.g. '500+' or '98%' or '24/7'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Label",
              description: "e.g. 'Tours completed across Sri Lanka'",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }) {
      return { title: title || "Stats Section" };
    },
  },
});

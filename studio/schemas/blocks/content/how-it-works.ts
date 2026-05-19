import { defineType, defineField } from "sanity";
import { ListOrdered } from "lucide-react";

export default defineType({
  name: "how-it-works",
  type: "object",
  title: "How It Works",
  icon: ListOrdered,
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
      initialValue: "How It Works",
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
      name: "ctaButton",
      type: "button",
      title: "CTA Button",
      group: "content",
    }),
    defineField({
      name: "steps",
      type: "array",
      title: "Steps",
      group: "content",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "title", type: "string", title: "Step Title", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", type: "text", title: "Step Description" }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "How It Works" };
    },
  },
});

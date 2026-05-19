import { defineType, defineField } from "sanity";
import { Rocket } from "lucide-react";

export default defineType({
  name: "hero-kuda",
  type: "object",
  title: "Hero — Kuda",
  icon: Rocket,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "block-settings", title: "Block Settings" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description: "Small label above the heading (e.g. 'Sri Lanka's trusted travel partner')",
      group: "content",
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
      name: "primaryButton",
      type: "button",
      title: "Primary Button",
      group: "content",
    }),
    defineField({
      name: "secondaryButton",
      type: "button",
      title: "Secondary Button",
      group: "content",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Hero — Kuda" };
    },
  },
});

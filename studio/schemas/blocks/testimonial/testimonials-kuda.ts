import { defineType, defineField } from "sanity";
import { MessageSquare } from "lucide-react";

export default defineType({
  name: "testimonials-kuda",
  type: "object",
  title: "Testimonials — Kuda",
  icon: MessageSquare,
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
      initialValue: "Testimonials",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      initialValue: "What our travellers say",
    }),
    defineField({
      name: "testimonials",
      type: "array",
      title: "Testimonials",
      group: "content",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Testimonials — Kuda" };
    },
  },
});

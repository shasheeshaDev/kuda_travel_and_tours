import { defineType, defineField } from "sanity";
import { Send } from "lucide-react";

export default defineType({
  name: "cta-form",
  type: "object",
  title: "CTA Enquiry Form",
  icon: Send,
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
      initialValue: "Ready to explore?",
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
      name: "form",
      type: "form",
      title: "Form",
      description: "Select the form fields and email configuration for this enquiry form",
      group: "content",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "CTA Enquiry Form" };
    },
  },
});

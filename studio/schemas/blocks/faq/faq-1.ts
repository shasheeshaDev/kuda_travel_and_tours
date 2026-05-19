import { defineType, defineField } from "sanity";
import { HelpCircle } from "lucide-react";

export default defineType({
  name: "faq-1",
  type: "object",
  title: "FAQ Section",
  icon: HelpCircle,
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
      initialValue: "FAQ",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      initialValue: "Questions? We've got answers.",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: "content",
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
      description: "Email link shown below the FAQ heading",
      group: "content",
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQ Items",
      group: "content",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question", type: "string", title: "Question", validation: (Rule) => Rule.required() }),
            defineField({ name: "answer", type: "text", title: "Answer", validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "FAQ Section" };
    },
  },
});

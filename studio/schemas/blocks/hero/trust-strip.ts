import { defineType, defineField } from "sanity";
import { Star } from "lucide-react";

export default defineType({
  name: "trust-strip",
  type: "object",
  title: "Trust Strip",
  icon: Star,
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: "Leading text (e.g. 'Trusted for')",
      initialValue: "Trusted for",
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Trust Items",
      of: [
        {
          type: "object",
          name: "trustItem",
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
    prepare() {
      return { title: "Trust Strip" };
    },
  },
});

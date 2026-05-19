import { defineType, defineField } from "sanity";
import { LayoutGrid } from "lucide-react";

const SERVICE_ICONS = [
  { title: "Day Tours (clock)", value: "day-tours" },
  { title: "Multi-Day Tours (list)", value: "multi-day" },
  { title: "Airport Transfers (phone)", value: "airport" },
  { title: "City Excursions (pin)", value: "city" },
  { title: "Group Travel (people)", value: "group" },
  { title: "Vehicle Hire (truck)", value: "vehicle" },
];

export default defineType({
  name: "services-grid",
  type: "object",
  title: "Services Grid",
  icon: LayoutGrid,
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
      initialValue: "What We Offer",
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
      name: "services",
      type: "array",
      title: "Services",
      group: "content",
      of: [
        {
          type: "object",
          name: "serviceCard",
          fields: [
            defineField({
              name: "iconKey",
              type: "string",
              title: "Icon",
              options: {
                list: SERVICE_ICONS,
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", type: "text", title: "Description" }),
          ],
          preview: {
            select: { title: "title", subtitle: "iconKey" },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Services Grid" };
    },
  },
});

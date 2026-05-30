import { defineType, defineField } from "sanity";
import { Map } from "lucide-react";

export default defineType({
  name: "tours-1",
  type: "object",
  title: "Tour Packages",
  icon: Map,
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
      initialValue: "Tour Packages",
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
      name: "tabs",
      type: "array",
      title: "Tour Tabs",
      group: "content",
      description: "Each tab groups tours by duration (e.g. Day Tours, 1 Night / 2 Days …)",
      of: [
        {
          type: "object",
          name: "tourTab",
          title: "Tab",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Tab Label",
              description: "e.g. Day Tours, 1 Night / 2 Days",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "tours",
              type: "array",
              title: "Tours",
              of: [
                {
                  type: "object",
                  name: "tourItem",
                  title: "Tour",
                  fields: [
                    defineField({
                      name: "emoji",
                      type: "string",
                      title: "Emoji / Icon",
                      description: "A single emoji to represent this tour (e.g. 🏙️ 🏖️ 🛕)",
                      validation: (Rule) => Rule.required().max(4),
                    }),
                    defineField({
                      name: "title",
                      type: "string",
                      title: "Tour Name",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "meta",
                      type: "string",
                      title: "Meta",
                      description: "Short descriptor — duration and theme (e.g. 1 day · Capital highlights)",
                    }),
                    defineField({
                      name: "route",
                      type: "string",
                      title: "Route",
                      description: "Journey route — separate stops with →  (e.g. Colombo → Galle → Colombo)",
                    }),
                    defineField({
                      name: "content",
                      type: "block-content",
                      title: "Popup Content",
                      description: "Rich text shown in the popup when this tour card is clicked.",
                    }),
                  ],
                  preview: {
                    select: { title: "title", subtitle: "meta", media: "emoji" },
                    prepare({ title, subtitle, media }) {
                      return { title: `${media || "🗺️"} ${title}`, subtitle };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "label", items: "tours" },
            prepare({ title, items }) {
              const count = items?.length ?? 0;
              return {
                title,
                subtitle: `${count} tour${count !== 1 ? "s" : ""}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "ctaButton",
      type: "button",
      title: "CTA Button",
      group: "content",
    }),
    defineField({
      name: "bookingFormConfig",
      type: "reference",
      title: "Booking Form Config",
      description: "Controls the email recipient, CC, BCC, subject and sender name for tour booking requests. Create one under Forms → Form Configurations.",
      to: [{ type: "formConfig" }],
      group: "block-settings",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Tour Packages" };
    },
  },
});

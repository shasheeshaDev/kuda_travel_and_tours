import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "footerLogo",
      type: "image",
      title: "Footer Logo",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "siteName",
      type: "string",
      description: "The name of your site",
      validation: (Rule) => Rule.required().error("Site name is required"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone Number",
      description: "Phone number displayed in the footer (e.g. +94 77 123 4567)",
    }),
    defineField({
      name: "whatsappNumber",
      type: "string",
      title: "WhatsApp Number",
      description: "WhatsApp number in international format without spaces or + (e.g. 94771234567) — used for the WhatsApp chat button",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Contact Email",
      description: "Primary contact email displayed in footer and FAQ",
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Address",
      description: "Business address displayed in footer",
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      media: "logo",
    },
    prepare({ title, media }) {
      return {
        title: title || "Site Settings",
        media,
      };
    },
  },
});

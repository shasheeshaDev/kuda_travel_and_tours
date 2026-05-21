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
      title: "Site Logo",
      description: "Header logo. Recommended height: 32 px. Upload SVG or PNG with transparent background.",
      options: { hotspot: true },
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
      title: "Site Name",
      description: "Displayed in the browser tab and as fallback when no logo is set.",
      validation: (Rule) => Rule.required().error("Site name is required"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone Number",
      description: "Displayed in the footer (e.g. +94 77 123 4567)",
    }),
    defineField({
      name: "whatsappNumber",
      type: "string",
      title: "WhatsApp Number",
      description: "Digits only, no spaces or + sign (e.g. 94771234567). Used for the WhatsApp chat button.",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Contact Email",
      description: "Displayed in the footer and FAQ section.",
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Address",
      description: "Displayed in the footer.",
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

import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "banner-1",
  type: "object",
  title: "Banner 1",
  description: "Banner 1: Hero Banner",
  icon: Images,
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "block-settings",
      title: "Block Settings",
    },
  ],
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      group: "block-settings",
    }),
    defineField({
      name: "eyebrowHeading",
      type: "string",
      title: "Eyebrow Heading",
      description: "",
      group: "content",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      description: "",
      group: "content",
    }),
    defineField({
      name: "subText",
      type: "text",
      title: "Sub Text",
      description: "",
      group: "content",
    }),
    defineField({
      name: "buttons",
      type: "button-group",
      group: "content",
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "socialMediaLinks",
      type: "social-media-links",
      group: "content",
    }),
    defineField({
      name: "background",
      type: "background",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title1: "heading",
      title2: "eyebrowHeading",
      title3: "subText",
    },
    prepare({ title1, title2, title3 }) {
      return {
        title: "Banner 1",
        subtitle: title1 || title2 || title3 || "No Title",
      };
    },
  },
});

import { defineField, defineType } from "sanity";
import { PAGE_SECTIONS } from "./page-sections";

export default defineType({
  name: "button",
  type: "object",
  title: "Button",
  fields: [
    defineField({
      name: "buttonVariant",
      type: "button-variant",
      title: "Button Variant",
    }),
    defineField({
      name: "buttonSize",
      type: "string",
      title: "Button Size",
      initialValue: "sm",
      options: {
        list: [
          { title: "Large", value: "lg" },
          { title: "Small", value: "sm" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => !["primary", "secondary"].includes(parent?.buttonVariant),
    }),
    defineField({
      name: "isExternal",
      type: "boolean",
      title: "Is External",
      initialValue: false,
    }),

    // ── Internal link ─────────────────────────────────────────────────────
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Page",
      to: [{ type: "page" }, { type: "post" }],
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: "anchor",
      type: "string",
      title: "Page Section",
      description: "Scroll directly to a specific section on the target page.",
      options: {
        list: PAGE_SECTIONS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      hidden: ({ parent }) => parent?.isExternal === true,
    }),

    // ── External link ─────────────────────────────────────────────────────
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      hidden: ({ parent }) => !parent?.isExternal,
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "target",
      type: "boolean",
      title: "Open in new tab",
      hidden: ({ parent }) => !parent?.isExternal,
    }),

    // ── Common ────────────────────────────────────────────────────────────
    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
      description: "The description of the link. Used for navigation items.",
    }),
  ],
});

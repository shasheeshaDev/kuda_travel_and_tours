import { Heading2, Type, Link2, Tag, List, ListOrdered } from "lucide-react";
import { defineField, defineArrayMember, defineType } from "sanity";
import { ICON_VARIANTS } from "./icon-variants";

const headingBlock = defineType({
  name: "headingBlock",
  type: "object",
  title: "Heading",
  icon: Heading2,
  fields: [
    defineField({
      name: "headingLevel",
      type: "string",
      title: "Heading Level",
      options: {
        list: [
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
          { title: "H5", value: "h5" },
          { title: "H6", value: "h6" },
        ],
        layout: "dropdown",
      },
      initialValue: "h2",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingText",
      type: "string",
      title: "Heading Text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      headingLevel: "headingLevel",
      headingText: "headingText",
    },
    prepare: ({ headingLevel, headingText }) => ({
      title: headingText || "Untitled Heading",
      subtitle: headingLevel?.toUpperCase() || "Heading",
      media: Heading2,
    }),
  },
});

const bodyBlock = defineType({
  name: "bodyBlock",
  type: "object",
  title: "Body Content",
  icon: Type,
  fields: [
    defineField({
      name: "content",
      type: "block-content",
      title: "Body Content",
    }),
  ],
  preview: {
    select: {
      content: "content",
    },
    prepare: ({ content }) => {
      const block = content?.find((blk: any) => blk._type === 'block' && blk.children);
      const text = block?.children?.map((child: any) => child.text).join('') || '';
      const preview = text.length > 60 ? text.substring(0, 60) + '...' : text;

      return {
        title: "Body Content",
        subtitle: preview || "Empty content",
        media: Type,
      };
    },
  },
});

const introContent = defineType({
  name: "introContentBlock",
  type: "object",
  title: "Intro Content",
  icon: Link2,
  fields: [


    defineField({
      name: "eyebrowHeading",
      type: "string",
      title: "Eyebrow Heading",
      description: "Small text displayed above the main heading",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as any;
          if (parent?.isIntroContent && value && value.length > 50) {
            return "Eyebrow heading should be 50 characters or less.";
          }
          return true;
        }),
    }),

    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      description: "Main heading text",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as any;
          if (parent?.isIntroContent && !value) {
            return "Heading is required when intro content is enabled.";
          }
          if (value && value.length > 150) {
            return "Heading should be 150 characters or less.";
          }
          return true;
        }),
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Supporting description text",
      validation: (Rule) => Rule.max(500).warning("Description should be 500 characters or less."),
    }),
  ],
  preview: {
    select: {
      title1: "heading",
      title2: "eyebrowHeading",
      title3: "description",
    },
    prepare: ({ title1, title2, title3 }) => ({
      title: "Intro Content",
      subtitle: title1 || title2 || title3 || "No content",
      media: Link2,
    }),
  },
});

const unorderedList = defineType({
  name: "unorderedList",
  type: "object",
  title: "Unordered List",
  icon: List,
  fields: [
    defineField({
      name: "listItems",
      type: "array",
      title: "List Items",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) => Rule.min(1).error("At least one list item is required"),
    }),
  ],
  preview: {
    select: {
      listItems: "listItems",
    },
    prepare: ({ listItems }) => ({
      title: "Unordered List",
      subtitle: listItems?.length
        ? `${listItems.length} item${listItems.length > 1 ? "s" : ""}`
        : "No items",
      media: List,
    }),
  },
});

const orderedList = defineType({
  name: "orderedList",
  type: "object",
  title: "Ordered List",
  icon: ListOrdered,
  fields: [
    defineField({
      name: "listItems",
      type: "array",
      title: "List Items",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) => Rule.min(1).error("At least one list item is required"),
    }),
  ],
  preview: {
    select: {
      listItems: "listItems",
    },
    prepare: ({ listItems }) => ({
      title: "Ordered List",
      subtitle: listItems?.length
        ? `${listItems.length} item${listItems.length > 1 ? "s" : ""}`
        : "No items",
      media: ListOrdered,
    }),
  },
});

const buttonGroupBlock = defineType({
  name: "buttonGroupBlock",
  type: "object",
  title: "Button Group",
  icon: Link2,
  fields: [
    defineField({
      name: "buttons",
      type: "array",
      title: "Buttons",
      of: [
        defineField({
          name: "button",
          type: "button",
        }),
      ],
      validation: (Rule) => Rule.min(1).error("At least one button is required"),
    }),
  ],
  preview: {
    select: {
      buttons: "buttons",
    },
    prepare: ({ buttons }) => ({
      title: "Button Group",
      subtitle: buttons && buttons.length > 0
        ? `${buttons.length} button${buttons.length > 1 ? 's' : ''}`
        : "No buttons",
      media: Link2,
    }),
  },
});

const tagBlock = defineType({
  name: "tagBlock",
  type: "object",
  title: "Tag",
  icon: Tag,
  fields: [
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Tag Label",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              label: "label",
            },
            prepare: ({ label }) => ({
              title: label || "Untitled Tag",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      tags: "tags",
    },
    prepare: ({ tags }) => {
      const tagLabels = tags?.map((tag: any) => tag.label).filter(Boolean).join(", ");
      return {
        title: "Tags",
        subtitle: tagLabels || "No tags",
        media: Tag,
      };
    },
  },
});

const contactLink = defineType({
  name: "contactLinkBlock",
  type: "object",
  title: "Contact Link",
  icon: Link2,
  fields: [
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "iconVariant",
              type: "string",
              title: "Icon Variant",
              options: {
                list: ICON_VARIANTS.map(({ title, value }) => ({ title, value })),
              },
              initialValue: "none",
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Label",
              description: "Label for the link",
            }),
            defineField({
              name: "isExternal",
              type: "boolean",
              title: "Is External",
              initialValue: false,
            }),
            defineField({
              name: "internalLink",
              type: "reference",
              title: "Internal Link",
              to: [{ type: "page" }, { type: "post" }],
              hidden: ({ parent }) => parent?.isExternal,
            }),
            defineField({
              name: "href",
              title: "href",
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
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              label: "label",
            },
            prepare: ({ label }) => ({
              title: label || "Untitled Tag",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      tags: "Contact Links",
    },
    prepare: ({ tags }) => {
      const tagLabels = tags?.map((tag: any) => tag.label).filter(Boolean).join(", ");
      return {
        title: "Contact Links",
        subtitle: tagLabels || "No links",
        media: Link2,
      };
    },
  },
});

export const columnBuilderBlocks = [
  headingBlock,
  introContent,
  bodyBlock,
  buttonGroupBlock,
  tagBlock,
  contactLink,
  unorderedList,
  orderedList,
];

export const columnBuilder = defineType({
  name: "column-builder",
  type: "array",
  of: [
    defineArrayMember(headingBlock),
    defineArrayMember(introContent),
    defineArrayMember(unorderedList),
    defineArrayMember(orderedList),
    defineArrayMember(bodyBlock),
    defineArrayMember(buttonGroupBlock),
    defineArrayMember(tagBlock),
    defineArrayMember(contactLink),
  ],
});
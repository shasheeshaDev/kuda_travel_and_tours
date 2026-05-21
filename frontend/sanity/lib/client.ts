import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  // "previewDrafts" shows the latest content (draft if available, published otherwise).
  // Use "published" in production to never expose unpublished content.
  perspective: process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "published" : "previewDrafts",
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_STUDIO_URL,
    filter: (props) => {
      // Disable stega for specific field names that commonly need cleaning
      const fieldsToDisableStega = [
        "buttonVariant",
        "stackAlign",
        "sectionWidth",
        "size",
        "weight",
        "element",
        "tag",
        "iconVariant",
        "gridColumns",
      ];
      if (fieldsToDisableStega.includes(props.sourcePath.at(-1) as string)) {
        return false;
      }
      return props.filterDefault(props);
    },
  },
});

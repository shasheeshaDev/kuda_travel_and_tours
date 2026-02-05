import React from "react";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import Button from "./button";

type Content2Block = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-2" }
>;

type ColumnBuilderBlock = NonNullable<Content2Block["contentBlock"]>[number];

interface ColumnBuilderRendererProps {
  blocks: ColumnBuilderBlock[] | null;
  className?: string;
}

export default function ColumnBuilderRenderer({
  blocks,
  className,
}: ColumnBuilderRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className={className}>
      {blocks.map((block) => {
        switch (block._type) {
          case "headingBlock":
            const headingLevel = block.headingLevel || "h2";
            return React.createElement(
              headingLevel,
              { key: block._key, className: "mb-4" },
              block.headingText
            );

          case "introContentBlock":
            return (
              <div key={block._key} className="intro-content mb-9 lg:mb-16">
                {block.eyebrowHeading && (
                  <h5 className="eyebrow-heading mb-5">
                    {block.eyebrowHeading}
                  </h5>
                )}
                {block.heading && (
                  <h2 className="">{block.heading}</h2>
                )}
                {block.description && (
                  <p className="">{block.description}</p>
                )}
              </div>
            );

          case "bodyBlock":
            return (
              <div
                key={block._key}
                className="body-content"
              >
                {block.content && <PortableTextRenderer value={block.content} />}
              </div>
            );

          case "unorderedList":
            return (
              <ul key={block._key} className="list-disc list-inside mb-4">
                {block.listItems?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            );

          case "orderedList":
            return (
              <ol key={block._key} className="list-decimal list-inside mb-4">
                {block.listItems?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            );

          case "buttonGroupBlock":
            return (
              <div key={block._key} className="button-content mt-8">
                {block.buttons?.map((button) => (
                  <Button key={button._key} button={button} />
                ))}
              </div>
            );

          case "tagBlock":
            return (
              <div key={block._key} className="tags-content flex flex-wrap gap-2 mt-4">
                {block.tags?.map((tag) => (
                  <span
                    key={tag._key}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            );

          case "contactLinkBlock":
            return (
              <div key={block._key} className="contact-links mt-4">
                {block.links?.map((link) => (
                  <a
                    key={link._key}
                    href={link.href || "#"}
                    target={link.target ? "_blank" : undefined}
                    rel={link.target ? "noopener noreferrer" : undefined}
                    className="block mb-2 text-lg hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

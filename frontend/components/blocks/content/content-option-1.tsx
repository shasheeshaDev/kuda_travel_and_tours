import { PAGE_QUERYResult } from "@/sanity.types";
import PortableTextRenderer from "@/components/portable-text-renderer";

type ContentOption1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-1" }
>;

const ContentOption1 = ({
  eyebrowHeading,
  heading,
  description,
}: ContentOption1Props) => {
  return (
    <section className="content-option-1 pt-[80px] pb-[40px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-5">
          <div className="col-span-4 sm:col-span-8 lg:col-span-6">
            <div className="intro-content">
              {eyebrowHeading && (
                <h5 className="eyebrow-heading mb-5">
                  {eyebrowHeading}
                </h5>
              )}
              {heading && (
                <h2 className="">{heading}</h2>
              )}
            </div>
          </div>
          <div className="col-span-4 sm:col-span-8 lg:col-span-6">
            {description && (
              <div className="body-content [&_p]:mb-5 [&_p]:last:mb-0">
                <PortableTextRenderer value={description} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentOption1;

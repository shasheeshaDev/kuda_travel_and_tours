"use client";

import Image from "next/image";
import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Icon from "@/components/blocks/shared/icon";
import Button from "@/components/blocks/shared/button";

type HeroBannerProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "banner-1" }
>;

const HeroBanner = ({
  eyebrowHeading,
  heading,
  subText,
  buttons,
  socialMediaLinks,
  background,
}: HeroBannerProps) => {
  return (
    <section className="hero-banner py-36 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#191919]/30 after:z-10 relative">
      {background?.backgroundType === "image" && background.backgroundImage?.asset && (
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src={urlFor(background.backgroundImage).url()}
            className="w-full h-full object-cover"
            alt=""
            width={1920}
            height={1080}
          />
        </div>
      )}
      {background?.backgroundType === "video" && (
        <div className="absolute top-0 left-0 w-full h-full z-0">
          {background.videoSource === "upload" && background.uploadedVideo?.asset?.url && (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={
                background.thumbnailImage?.asset
                  ? urlFor(background.thumbnailImage).url()
                  : undefined
              }
            >
              <source src={background.uploadedVideo.asset.url} type={background.uploadedVideo.asset.mimeType || "video/mp4"} />
            </video>
          )}
          {background.videoSource === "youtube" && background.youtubeUrl && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeId(background.youtubeUrl)}?autoplay=1&mute=1&loop=1&controls=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
          {background.videoSource === "vimeo" && background.vimeoUrl && (
            <iframe
              className="w-full h-full"
              src={`https://player.vimeo.com/video/${getVimeoId(background.vimeoUrl)}?autoplay=1&muted=1&loop=1&background=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      )}
      <div className="container mx-auto">
        <div className="relative z-20">
          <div className="text-content-wrapper max-w-[840px] xl:max-w-[1060px]">
            {eyebrowHeading && (
              <h5 className="eyebrow-heading text-brand-white mb-7">{eyebrowHeading}</h5>
            )}
            {heading && (
              <h1 className="display-heading mb-7">{heading}</h1>
            )}
            {subText && (
              <p className="para text-brand-white max-w-[852px]">{subText}</p>
            )}
          </div>
          {buttons && buttons.length > 0 && (
            <div className="action-button mt-10 flex flex-wrap gap-4">
              {buttons.map((button) => (
                <Button key={button._key} button={button} />
              ))}
            </div>
          )}
          {socialMediaLinks && socialMediaLinks.length > 0 && (
            <div className="social-media-links mt-8">
              <ul className="flex items-center justify-between w-fit gap-1">
                {socialMediaLinks.map((social) => (
                  <li key={social._key}>
                    <a
                      href={social.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-full bg-white/25"
                    >
                      {social.platform &&
                        <Icon className="w-6 h-6" iconVariant={social.platform} />
                      }
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper functions to extract video IDs
function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : "";
}

function getVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
  return match ? match[1] : "";
}

export default HeroBanner;

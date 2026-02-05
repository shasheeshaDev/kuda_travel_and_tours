import { fetchSanitySettings, fetchSanityFooter } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { FOOTER_QUERYResult, SETTINGS_QUERYResult } from "@/sanity.types";
import Icon from "../blocks/shared/icon";

interface Footer2Props {
  className?: string;
}

export default async function Footer2({ className }: Footer2Props) {
  const settings: SETTINGS_QUERYResult = await fetchSanitySettings();
  const footer: FOOTER_QUERYResult = await fetchSanityFooter();

  return (
    <footer className="w-full rounded-t-[64px] bg-[#191919] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[75%] z-0">
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#191919] to-[#191919]/60 z-10"></span>
        {footer?.background &&
          <Image src={urlFor(footer?.background).url()} className="w-full h-full object-cover object-top" alt={footer.background.alt || ""} width={1920} height={1080} />
        }
      </div>
      <div className="container mx-auto relative z-10">
        <div className="cta-section mt-20">
          <div className="w-full flex items-center justify-between gap-16">
            <div className="text-content-wrapper">
              <h2 className="font-bold text-5xl max-w-[700px] mb-3">Find Your Space to Slow Down</h2>
              <p className="font-medium text-lg max-w-[948px]">Explore the Adaaran collection and discover a retreat that aligns with your way of travelling—calm, considered, and intentionally designed.</p>
            </div>
            <button className="cta-button">Get Started</button>
          </div>
        </div>
        <div className="logo-bar-wrapper mt-20">
          <div className="logo-wrapper">
            {footer?.footerLogo &&
              <Image src={urlFor(footer?.footerLogo).url()} className="h-16 w-fit" alt={footer?.footerLogo.alt || ""} width={100} height={100} />
            }
          </div>
        </div>
        <div className="footer-content-wrapper grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-5 mt-10">
          <div className="colomn-one col-span-4 sm:col-span-8 lg:col-span-4">
            <div className="flex flex-col items-start justify-between max-w-[343px]">
              {footer?.description &&
                <p className="text-brand-white">{footer.description}</p>
              }
              {footer?.socialMediaLinks &&
                <div className="social-media-links mt-12">
                  <ul className="flex items-center justify-between w-fit gap-1">
                    {footer.socialMediaLinks.length > 0 && footer.socialMediaLinks.map((socialMedia) => {
                      return (
                        <li key={socialMedia._key}><a href="#" className="group transition-all block p-3 rounded-full bg-brand-white/25 hover:bg-brand-white"><Icon className="h-6 w-6 group-hover:invert" iconVariant={socialMedia.platform || "circle"} /></a></li>
                      )
                    })}
                  </ul>
                </div>
              }
            </div>
          </div>
          <div className="colomn-two col-span-4 sm:col-span-8 lg:col-span-8 grid grid-cols-3 gap-5">
            {footer?.links && footer.links.length > 0 && footer.links.map((colomn) => {
              return (
                <div key={colomn._key} className="block-one">
                  {colomn._type === "link-group" &&
                    <h5 className="font-bold text-2xl text-brand-white">{colomn.title}</h5>
                  }
                  {colomn._type === "link-group" && colomn.links && colomn.links.length > 0 &&
                    <ul className="flex flex-col items-start w-fit gap-5 mt-6">
                      {colomn.links?.map((link) => {
                        return (
                          <li key={link._key}><a className="text-brand-white relative block after:content-[''] after:absolute after:bottom-0 after:left-0 after:transition-all after:w-0 hover:after:w-full after:h-[2px] after:rounded-full after:bg-brand-white " href={link.href || "#"}>{link.label}</a></li>
                        )
                      })}
                    </ul>
                  }
                  {colomn._type === "link-with-label" &&
                    <li><a className="text-brand-white relative block after:content-[''] after:absolute after:bottom-0 after:left-0 after:transition-all after:w-0 hover:after:w-full after:h-[2px] after:rounded-full after:bg-brand-white " href={colomn.href || "#"}>{colomn.label}</a></li>
                  }
                </div>
              )
            })}
          </div>
        </div>
        <div className="copy-right flex flex-col items-center justify-between border-t border-[#373737] py-5 mt-20">
          <p className="text-center text-xs md:text-sm font-medium text-brand-white">Copyright @2026 Adaaran - All Rights Reserved</p>
          <p className="text-center text-xs md:text-sm font-medium text-brand-white">Web Solution By <a className="font-bold text-brand-white" href="https://elevatehospitality.com/">Elevate Hospitality</a> & <a className="font-bold text-brand-white" href="https://shashathink.com/">ShashaThink</a></p>
        </div>
      </div>
    </footer>
  );
}

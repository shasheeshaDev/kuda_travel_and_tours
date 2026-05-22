import { fetchSanitySettings, fetchSanityFooter } from "@/sanity/lib/fetch";
import Image from "next/image";
import { FOOTER_QUERYResult, SETTINGS_QUERYResult } from "@/sanity.types";
import FooterLink from "./footer-link";

export default async function Footer2() {
  const settings: SETTINGS_QUERYResult = await fetchSanitySettings();
  const footer: FOOTER_QUERYResult = await fetchSanityFooter();

  // Use footer's own logo first; fall back to the header logo from settings
  const footerLogoUrl =
    (footer as any)?.footerLogo?.asset?.url ??
    settings?.siteLogo?.asset?.url ??
    null;
  const footerLogoAlt =
    (footer as any)?.footerLogo?.alt ??
    settings?.siteLogo?.alt ??
    settings?.siteName ??
    "Kuda Travel & Tours";

  const footerLinkCols = (footer?.links ?? []).filter((l) => l._type === "link-group");

  return (
    <footer className="bg-brand-dark pt-16 pb-8">
      {/* Top grid */}
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4 grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12 max-lg:grid-cols-2 max-lg:gap-9 max-sm:grid-cols-1 max-sm:gap-7">
        {/* Brand column */}
        <div>
          {footerLogoUrl && (
            <Image
              src={footerLogoUrl}
              alt={footerLogoAlt}
              width={150}
              height={44}
              className="h-11 w-auto object-contain mb-4"
              unoptimized
            />
          )}
          {footer?.description && (
            <p className="text-[14px] text-white/65 leading-[1.7] max-w-[260px]">
              {footer.description}
            </p>
          )}
        </div>

        {/* Link columns from Sanity footer links */}
        {footerLinkCols.map((col) => (
          <div key={col._key}>
            {"title" in col && col.title && (
              <h5 className="text-[13px] font-bold text-white tracking-[0.06em] uppercase mb-4">
                {col.title}
              </h5>
            )}
            {"links" in col && col.links && col.links.length > 0 && (
              <ul className="flex flex-col gap-[10px]">
                {col.links.map((link) => (
                  <li key={link._key}>
                    <FooterLink
                      href={link.href || "#"}
                      className="text-[14px] text-white/55 no-underline transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact column — from settings */}
        {(settings?.phone || settings?.email || settings?.whatsappNumber || settings?.address) && (
          <div>
            <h5 className="text-[13px] font-bold text-white tracking-[0.06em] uppercase mb-4">Contact</h5>
            <ul className="flex flex-col gap-[10px]">
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-[14px] text-white/55 transition-colors duration-200 hover:text-white">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="text-[14px] text-white/55 transition-colors duration-200 hover:text-white">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.whatsappNumber && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    WhatsApp Us
                  </a>
                </li>
              )}
              {settings.address && (
                <li>
                  <span className="text-[14px] text-white/55">{settings.address}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1160px] mx-auto px-10 max-lg:px-6 max-sm:px-4 border-t border-white/10 pt-6 flex justify-between items-center max-sm:flex-col max-sm:gap-2 max-sm:text-center">
        <p className="text-[13px] text-white/65">
          © {new Date().getFullYear()} {settings?.siteName || "Kuda Travel & Tours"}. All rights reserved.
        </p>
        <p className="text-[13px] text-white/65">
          Web Solution by{" "}
          <a href="https://enrolsolutions.com" className="text-white/85 font-semibold hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            Enrol Solutions
          </a>
          {" "}&nbsp;·&nbsp;{" "}
          Design by{" "}
          <a href="https://shashathink.com" className="text-white/85 font-semibold hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            ShshaThink
          </a>
        </p>
      </div>
    </footer>
  );
}

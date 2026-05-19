"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

// Resolves section anchor links (#who, #offer…) to /#who, /#offer
// when the visitor is not on the home page, so they navigate home first.
export default function FooterLink({ href, children, className, target, rel }: FooterLinkProps) {
  const pathname = usePathname();
  const resolvedHref = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  return (
    <Link href={resolvedHref} className={className} target={target} rel={rel}>
      {children}
    </Link>
  );
}

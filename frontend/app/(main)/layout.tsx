import Header from "@/components/header";
import Footer2 from "@/components/footer/footer-2";
import WhatsAppFab from "@/components/global/whatsapp-fab";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import { fetchSanitySettings } from "@/sanity/lib/fetch";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSanitySettings();

  return (
    <>
      <Header />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer2 />
      <WhatsAppFab whatsappNumber={settings?.whatsappNumber} />
    </>
  );
}

import { type SchemaTypeDefinition } from "sanity";

// ── Documents ──────────────────────────────────────────────────────────────
import page       from "./schemas/documents/page";
import post       from "./schemas/documents/post";
import collection from "./schemas/documents/collection";
import author     from "./schemas/documents/author";
import category   from "./schemas/documents/category";
import faq        from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";
import header     from "./schemas/documents/header";
import footer     from "./schemas/documents/footer";
import settings   from "./schemas/documents/settings";
import banner     from "./schemas/documents/banner";

// ── Shared objects ────────────────────────────────────────────────────────
import blockContent  from "./schemas/common/block-content";
import link          from "./schemas/common/link";
import button        from "./schemas/common/button";
import buttonGroup   from "./schemas/common/button-group";
import linkGroup     from "./schemas/common/link-group";
import { buttonVariant } from "./schemas/common/button-variant";
import sectionPadding    from "./schemas/common/section-padding";
import { columnBuilder, columnBuilderBlocks } from "./schemas/common/column-builder";
import socialMediaLinks  from "./schemas/common/social-media-link";
import video        from "./schemas/common/video";
import background   from "./schemas/common/background";
import introContent from "./schemas/common/intro-content";

// ── Form infrastructure (used by cta-form block) ──────────────────────────
import form       from "./schemas/blocks/form/form";
import formConfig from "./schemas/blocks/form/form-config";
import formSheet  from "./schemas/blocks/form/form-sheet";
import formField  from "./schemas/blocks/form/form-input";

// ── Kuda blocks ───────────────────────────────────────────────────────────
import heroKuda        from "./schemas/blocks/hero/hero-kuda";
import trustStrip      from "./schemas/blocks/hero/trust-strip";
import whoWeAre        from "./schemas/blocks/content/who-we-are";
import servicesGrid    from "./schemas/blocks/card/services-grid";
import howItWorks      from "./schemas/blocks/content/how-it-works";
import stats1          from "./schemas/blocks/stats/stats-1";
import testimonialsKuda from "./schemas/blocks/testimonial/testimonials-kuda";
import ctaForm         from "./schemas/blocks/form/cta-form";
import faq1            from "./schemas/blocks/faq/faq-1";
import tours1          from "./schemas/blocks/tours/tours-1";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page, post, collection, author, category,
    faq, testimonial, header, footer, settings, banner,

    // Shared objects
    introContent, video, background, blockContent,
    link, button, buttonGroup, linkGroup, socialMediaLinks,
    buttonVariant, sectionPadding,
    columnBuilder, ...columnBuilderBlocks,

    // Form infrastructure
    form, formConfig, formSheet, formField,

    // Kuda blocks
    heroKuda, trustStrip, whoWeAre, servicesGrid,
    howItWorks, stats1, testimonialsKuda, ctaForm, faq1, tours1,
  ],
};

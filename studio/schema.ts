import { type SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import collection from "./schemas/documents/collection";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";
import header from "./schemas/documents/header";
import footer from "./schemas/documents/footer";
import settings from "./schemas/documents/settings";
import banner from "./schemas/documents/banner";

// Schema UI shared objects
import blockContent from "./schemas/common/block-content";
import link from "./schemas/common/link";
import button from "./schemas/common/button";
import buttonGroup from "./schemas/common/button-group";
import linkGroup from "./schemas/common/link-group";
import { buttonVariant } from "./schemas/common/button-variant";
import sectionPadding from "./schemas/common/section-padding";
import { columnBuilder, columnBuilderBlocks } from "./schemas/common/column-builder";
import socialMediaLinks from "./schemas/common/social-media-link";
import video from "./schemas/common/video";
import background from "./schemas/common/background";
import introContent from "./schemas/common/intro-content";
// Video
import video1 from "./schemas/blocks/video/video1";
// Content
import content1 from "./schemas/blocks/content/content1";
import content2 from "./schemas/blocks/content/content2";
import content3 from "./schemas/blocks/content/content3";
import content4 from "./schemas/blocks/content/content4";
// Form Components
import form from "./schemas/blocks/form/form";
import formConfig from "./schemas/blocks/form/form-config";
import formSheet from "./schemas/blocks/form/form-sheet";
import formField from "./schemas/blocks/form/form-input";
// Form
import form1 from "./schemas/blocks/form/form1";
// Banner
import banner1 from "./schemas/blocks/banner/banner1";
import banner2 from "./schemas/blocks/banner/banner2";
// Card
import card1 from "./schemas/blocks/card/card1";
import card2 from "./schemas/blocks/card/card2";
import card3 from "./schemas/blocks/card/card3";
import card4 from "./schemas/blocks/card/card4";
import card5 from "./schemas/blocks/card/card5";
// Testimonial
import testimonial1 from "./schemas/blocks/testimonial/testimonial1";
// Collection
import collection1 from "./schemas/blocks/collection/collection1";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    page,
    post,
    collection,
    author,
    category,
    faq,
    testimonial,
    header,
    footer,
    settings,
    banner,
    // shared objects
    introContent,
    video,
    background,
    blockContent,
    link,
    button,
    buttonGroup,
    linkGroup,
    socialMediaLinks,
    buttonVariant,
    sectionPadding,
    columnBuilder,
    ...columnBuilderBlocks,
    // All Blocks - Start
    // Banner
    banner1,
    banner2,
    // Card
    card1,
    card2,
    card3,
    card4,
    card5,
    // Video
    video1,
    // Content
    content1,
    content2,
    content3,
    content4,
    // Testimonial
    testimonial1,
    // Collection
    collection1,
    // Form Components
    form,
    formConfig,
    formSheet,
    formField,
    // Form
    form1,
  ],
};

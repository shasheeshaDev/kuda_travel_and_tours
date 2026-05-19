/**
 * Typography Configuration
 *
 * This file defines typography styles for all text elements in the application.
 *
 * ## Adding New Fonts
 *
 * 1. Import the font in app/layout.tsx using next/font:
 *    ```ts
 *    import { Playfair_Display } from "next/font/google";
 *    const fontDisplay = Playfair_Display({ variable: "--font-display" });
 *    ```
 *
 * 2. Add the variable to the body className in layout.tsx:
 *    ```ts
 *    className={cn("...", fontSans.variable, fontDisplay.variable)}
 *    ```
 *
 * 3. Add the font to style/configs/font.config.ts:
 *    ```ts
 *    export const fonts = {
 *      sans: "var(--font-sans)",
 *      display: "var(--font-display)",
 *    };
 *    ```
 *
 * 4. Use the font in your block configuration below:
 *    ```ts
 *    h1: {
 *      fontFamily: bp(fonts.display),
 *      ...
 *    }
 *    ```
 *
 * ## Using Colors from colors.config.ts
 *
 * Import and use color variables instead of hardcoded hex values:
 *    ```ts
 *    import { color, brandColors } from "./colors.config";
 *
 *    h1: {
 *      color: bp(color.brand.primary),        // Using color helper
 *      color: bp(brandColors.foreground),     // Direct import
 *      color: bp(color.pdp.gardenGreen[500]), // PDP color scale
 *    }
 *    ```
 */
import { fonts } from "./font.config";
import { colors } from "./colors.config";

// Helper types for breakpoint values
type BreakpointValues = {
  default: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

// Block configuration structure
type BlockConfig = {
  fontFamily?: BreakpointValues;
  fontSize?: BreakpointValues;
  fontWeight?: BreakpointValues;
  lineHeight?: BreakpointValues;
  color?: BreakpointValues;
  marginBottom?: BreakpointValues;
  textDecoration?: BreakpointValues;
  transition?: BreakpointValues;
};

// Helper function to create breakpoint values
const bp = (value: string): BreakpointValues => ({
  default: value,
  sm: value,
  md: value,
  lg: value,
  xl: value,
  "2xl": value,
});

// Helper function to create responsive breakpoint values
const bpResponsive = (
  defaultVal: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
  xl2?: string,
): BreakpointValues => ({
  default: defaultVal,
  sm: sm || defaultVal,
  md: md || sm || defaultVal,
  lg: lg || md || sm || defaultVal,
  xl: xl || lg || md || sm || defaultVal,
  "2xl": xl2 || xl || lg || md || sm || defaultVal,
});

// Main configuration interface
export interface TypographyBlockConfig {
  blocks: {
    // Anchor
    anchor: BlockConfig;

    // Headings
    h1: BlockConfig;
    h2: BlockConfig;
    h3: BlockConfig;
    h4: BlockConfig;
    h5: BlockConfig;
    h6: BlockConfig;

    //span
    span: BlockConfig;

    // Paragraphs
    xsPara: BlockConfig;
    sPara: BlockConfig;
    para: BlockConfig;
    lPara: BlockConfig;
    xlPara: BlockConfig;

    // Special
    eyebrowHeading: BlockConfig;
    menuItem: BlockConfig;
    subMenuItem: BlockConfig;
    ctaHeading: BlockConfig;
    ctaPara: BlockConfig;
    mainListItem: BlockConfig;
    subListItem: BlockConfig;

    [key: string]: BlockConfig; // Allow dynamic blocks
  };
}

// Configuration
// ** bpResponsive("defaultVal", "sm", "md", "lg", "xl", "2xl") -->> ** style based on breakpoints **
// ** bp("defaultVal") ------------------------------------------->> ** style for all breakpoints **
export const typographyBlockConfig: TypographyBlockConfig = {
  blocks: {
    // Anchor
    anchor: {
      fontFamily: bp(fonts.plusJakartaSans),
      color: bp(colors.brand.secondary),
      textDecoration: bp("none"),
      transition: bp("color 0.2s ease"),
    },

    //span
    span: {
      fontFamily: bp(fonts.plusJakartaSans),
    },

    // Headings — Plus Jakarta Sans throughout, matching Kuda design
    h1: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("32px", "36px", "40px", "52px", "58px", "58px"),
      fontWeight: bp("800"),
      lineHeight: bp("110%"),
      color: bp(colors.brand.secondary),
    },

    h2: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("28px", "28px", "32px", "40px", "44px", "44px"),
      fontWeight: bp("800"),
      lineHeight: bp("115%"),
      color: bp(colors.brand.secondary),
    },

    h3: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("20px", "20px", "22px", "26px", "28px", "28px"),
      fontWeight: bp("700"),
      lineHeight: bp("130%"),
      color: bp(colors.brand.secondary),
    },

    h4: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("18px"),
      fontWeight: bp("700"),
      lineHeight: bp("130%"),
      color: bp(colors.brand.secondary),
    },

    h5: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("16px"),
      fontWeight: bp("600"),
      lineHeight: bp("130%"),
      color: bp(colors.brand.secondary),
    },

    h6: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("14px"),
      fontWeight: bp("600"),
      lineHeight: bp("130%"),
      color: bp(colors.brand.secondary),
    },

    displayHeading: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("36px", "46px", "52px", "64px", "72px", "72px"),
      fontWeight: bp("800"),
      lineHeight: bp("100%"),
      color: bp(colors.brand.secondary),
    },

    // Paragraphs
    xsPara: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("12px"),
      fontWeight: bp("400"),
      lineHeight: bp("20px"),
      color: bp(colors.brand.muted),
    },

    sPara: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("14px"),
      fontWeight: bp("400"),
      lineHeight: bp("24px"),
      color: bp(colors.brand.muted),
    },

    para: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("15px", "15px", "16px", "16px", "17px", "17px"),
      fontWeight: bp("400"),
      lineHeight: bp("170%"),
      color: bp(colors.brand.muted),
    },

    lPara: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("18px"),
      fontWeight: bp("400"),
      lineHeight: bp("170%"),
      color: bp(colors.brand.muted),
    },

    xlPara: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("17px", "18px", "18px", "19px", "20px", "20px"),
      fontWeight: bp("400"),
      lineHeight: bp("170%"),
      color: bp(colors.brand.muted),
    },

    // Special
    eyebrowHeading: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("12px"),
      fontWeight: bp("600"),
      lineHeight: bp("normal"),
      color: bp(colors.brand.muted),
    },

    menuItem: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("24px", "24px", "24px", "14px", "15px", "15px"),
      fontWeight: bp("500"),
      lineHeight: bpResponsive("36px", "36px", "36px", "24px", "24px", "24px"),
      color: bp(colors.brand.secondary),
    },

    subMenuItem: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("20px", "20px", "20px", "13px", "14px", "14px"),
      fontWeight: bp("400"),
      lineHeight: bpResponsive("32px", "32px", "32px", "22px", "22px", "22px"),
      color: bp(colors.brand.muted),
    },

    ctaHeading: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("28px", "32px", "36px", "42px", "46px", "46px"),
      fontWeight: bp("800"),
      lineHeight: bp("112%"),
      color: bp(colors.brand.secondary),
    },

    ctaPara: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("17px"),
      fontWeight: bp("400"),
      lineHeight: bp("170%"),
      color: bp(colors.brand.muted),
    },

    mainListItem: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("15px"),
      fontWeight: bp("500"),
      lineHeight: bp("160%"),
      color: bp(colors.brand.secondary),
    },

    subListItem: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("14px"),
      fontWeight: bp("400"),
      lineHeight: bp("160%"),
      color: bp(colors.brand.muted),
    },
  },
};

// Export helper functions and fonts
export { bp, bpResponsive, fonts };

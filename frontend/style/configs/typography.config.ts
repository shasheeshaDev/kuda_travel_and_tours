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
      fontFamily: bp(fonts.poppins),
      color: bp(colors.brand.secondary), // Using brand color
      textDecoration: bp("none"),
      transition: bp("color 0.3s ease"),
    },

    //span
    span: {
      fontFamily: bp(fonts.poppins),
    },

    // Headings
    h1: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("36px", "36px", "40px", "60px", "60px", "60px"),
      fontWeight: bp("700"),
      lineHeight: bp("100%"),
      color: bp(colors.brand.white),
    },

    h2: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("32px", "32px", "32px", "46px", "52px", "52px"),
      fontWeight: bp("700"),
      lineHeight: bp("125%"),
      color: bp(colors.brand.secondary),
    },

    h3: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("30px"),
      fontWeight: bp("500"),
      lineHeight: bp("40px"),
      color: bp(colors.brand.secondary),
    },

    h4: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("20px"),
      fontWeight: bp("500"),
      lineHeight: bp("100%"),
      color: bp(colors.brand.secondary),
    },

    h5: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bp("20px"),
      fontWeight: bp("500"),
      lineHeight: bp("100%"),
      color: bp(colors.brand.secondary),
    },

    h6: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("18px", "18px", "18px", "18px", "20px", "20px"),
      fontWeight: bp("500"),
      lineHeight: bp("100%"),
      color: bp(colors.brand.secondary),
    },

    displayHeading: {
      fontFamily: bp(fonts.plusJakartaSans),
      fontSize: bpResponsive("32px", "46px", "40px", "62px", "72px", "72px"),
      fontWeight: bp("700"),
      lineHeight: bp("100%"),
      color: bp(colors.brand.white),
    },

    // Paragraphs
    xsPara: {
      fontFamily: bp(fonts.poppins),
      fontSize: bp("12px"),
      fontWeight: bp("400"),
      lineHeight: bp("20px"),
      color: bp(colors.brand.primary), // Using brand color
    },

    sPara: {
      fontFamily: bp(fonts.poppins),
      fontSize: bp("16px"),
      fontWeight: bp("400"),
      lineHeight: bp("28px"),
      color: bp(colors.brand.primary), // Using brand color
    },

    para: {
      fontFamily: bp(fonts.poppins),
      fontSize: bpResponsive("14px","16px"),
      fontWeight: bp("400"),
      lineHeight: bp("24px"),
      color: bp(colors.brand.secondary), // Using brand color
    },

    lPara: {
      fontFamily: bp(fonts.poppins),
      fontSize: bp("20px"),
      fontWeight: bp("400"),
      lineHeight: bp("28px"),
    },

    xlPara: {
      fontFamily: bp(fonts.poppins),
      fontSize: bpResponsive("18px", "20px", "20px", "20px", "20px", "20px"),
      fontWeight: bp("400"),
      lineHeight: bp("32px"),
      color: bp(colors.brand.secondary), // Using brand color
    },

    // Special
    eyebrowHeading: {
      fontFamily: bp(fonts.poppins),
      fontSize: bpResponsive("18px", "24px"),
      fontWeight: bpResponsive("500","500","500","600"),
      lineHeight: bp("28px"),
      color: bp(colors.brand.primary), // Using brand color
    },

    menuItem: {
      fontFamily: bp(fonts.poppins),
      fontSize: bpResponsive("24px", "24px", "24px", "14px", "16px", "16px"),
      fontWeight: bp("500"),
      lineHeight: bpResponsive("36px", "36px", "36px", "24px", "28px", "28px"),
      color: bp(colors.brand.secondary), // Using brand color
    },

    subMenuItem: {
      fontFamily: bp(fonts.poppins),
      fontSize: bpResponsive("24px", "24px", "24px", "14px", "14px", "14px"),
      fontWeight: bp("400"),
      lineHeight: bpResponsive("36px", "36px", "36px", "24px", "24px", "24px"),
      color: bp(colors.brand.secondary), // Using brand color
    },

    ctaHeading: {
      fontFamily: bp(fonts.poppins),
      fontSize: bpResponsive("36px", "36px", "36px", "36px", "60px", "60px"),
      fontWeight: bp("700"),
      lineHeight: bpResponsive("48px", "48px", "48px", "64px", "80px", "80px"),
      color: bp(colors.brand.primary), // Using brand color
    },

    ctaPara: {
      fontFamily: bp(fonts.poppins),
      fontSize: bp("16px"),
      fontWeight: bp("400"),
      lineHeight: bp("28px"),
      color: bp(colors.brand.secondary), // Using brand color
    },

    mainListItem: {
      fontFamily: bp(fonts.poppins),
      fontSize: bp("16px"),
      fontWeight: bp("400"),
      lineHeight: bp("28px"),
      color: bp(colors.brand.secondary), // Using brand color
    },

    subListItem: {
      fontFamily: bp(fonts.poppins),
      fontSize: bp("16px"),
      fontWeight: bp("400"),
      lineHeight: bp("28px"),
      color: bp(colors.brand.secondary), // Using brand color
    },
  },
};

// Export helper functions and fonts
export { bp, bpResponsive, fonts };

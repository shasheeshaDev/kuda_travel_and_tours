/**
 * Font Configuration
 *
 * Defines font families using CSS custom properties.
 * These variables are set in layout.tsx using next/font
 *
 * Usage in typography.config.ts:
 * fontFamily: fonts.sans
 * fontFamily: fonts.spaceGrotesk
 */

export const fonts = {
	// sans: "var(--font-sans)",
	poppins: "var(--font-poppins)",
  plusJakartaSans: "var(--font-plus-jakarta-sans)",
} as const;

export type FontFamily = typeof fonts[keyof typeof fonts];

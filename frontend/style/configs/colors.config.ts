/**
 * Color Configuration
 *
 * Defines all brand colors, icon colors, and PDP color scales
 * used throughout the Kuda Travel & Tours application.
 *
 * Usage in components:
 * - Tailwind classes: bg-brand-primary, text-brand-secondary
 * - Color scales: bg-pdp-sandstone-300, text-pdp-garden-green-500
 *
 * Usage in config files (typography.config.ts, container.config.ts, etc.):
 * ```ts
 * import { brandColors, pdpGardenGreen, color } from "./colors.config";
 *
 * // Direct reference
 * color: bp(brandColors.primary)
 * color: bp(pdpGardenGreen[500])
 *
 * // Using helper function
 * color: bp(color.brand.primary)
 * color: bp(color.pdp.gardenGreen[500])
 * ```
 */

export const brandColors = {
	primary: "#474546",    // charcoal — main brand colour
	secondary: "#1a1819",  // near-black text
	dark: "#2d2b2c",       // darker charcoal (hover, footer bg)
	tertiary: "#faf8f5",   // warm cream
	white: "#FFFFFF",
	black: "#000000",
	muted: "#767374",      // muted text
	border: "#e8e6e4",
	cream: "#faf8f5",
	heroBg: "#edf0f5",     // hero / section background
	sageBg: "#f0f4f1",     // sage-green light section bg
	accentBlue: "#5a8fa8", // accent slate-blue
	accentGold: "#d4a853", // accent gold (star ratings)
} as const;


/**
 * Combined color configuration for Tailwind
 */
export const colors = {
	brand: brandColors,
} as const;

/**
 * Structured color object for use in config files
 * Provides easier access to colors with proper TypeScript support
 */

export type BrandColor = keyof typeof brandColors;
export type ColorScale = keyof typeof colors;

/**
 * Color Configuration
 *
 * Defines all brand colors, icon colors, and PDP color scales
 * used throughout the Dudley Park application.
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
	primary: "#FFBB00",
	secondary: "#2B2B2B",
	tertiary: "#F1F2F6",
	white: "#FFFFFF",
	black: "#000000",
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

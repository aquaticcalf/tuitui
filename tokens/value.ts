export const color_value = /^(#[0-9a-fA-F]{3,8}|rgb\(.*\)|rgba\(.*\)|hsl\(.*\)|oklch\(.*\))$/
export const radius_value = /^\d+(\.\d+)?(rem|px|em)$/

export const radius_scales = {
  "--radius-sm": 0.6,
  "--radius-md": 0.8,
  "--radius-lg": 1.0,
  "--radius-xl": 1.4,
  "--radius-2xl": 1.8,
  "--radius-3xl": 2.2,
  "--radius-4xl": 2.6,
}

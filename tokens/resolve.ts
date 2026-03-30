import { scope, type } from "arktype"

import { color_value, radius_value, radius_scales } from "./value"

const { resolved_theme } = scope({
  color_value,
  radius_value,

  color_theme: {
    "--background": "color_value",
    "--foreground": "color_value",
    "--card": "color_value",
    "--card-foreground": "color_value",
    "--popover": "color_value",
    "--popover-foreground": "color_value",
    "--primary": "color_value",
    "--primary-foreground": "color_value",
    "--secondary": "color_value",
    "--secondary-foreground": "color_value",
    "--muted": "color_value",
    "--muted-foreground": "color_value",
    "--accent": "color_value",
    "--accent-foreground": "color_value",
    "--destructive": "color_value",
    "--border": "color_value",
    "--input": "color_value",
    "--ring": "color_value",
  },

  chart_theme: {
    "--chart-1": "color_value",
    "--chart-2": "color_value",
    "--chart-3": "color_value",
    "--chart-4": "color_value",
    "--chart-5": "color_value",
  },

  sidebar_theme: {
    "--sidebar": "color_value",
    "--sidebar-foreground": "color_value",
    "--sidebar-primary": "color_value",
    "--sidebar-primary-foreground": "color_value",
    "--sidebar-accent": "color_value",
    "--sidebar-accent-foreground": "color_value",
    "--sidebar-border": "color_value",
    "--sidebar-ring": "color_value",
  },

  radius_theme: type({
    "--radius": radius_value,
    "--radius-sm": type(radius_value).optional(),
    "--radius-md": type(radius_value).optional(),
    "--radius-lg": type(radius_value).optional(),
    "--radius-xl": type(radius_value).optional(),
    "--radius-2xl": type(radius_value).optional(),
    "--radius-3xl": type(radius_value).optional(),
    "--radius-4xl": type(radius_value).optional(),
  }).pipe((input: { "--radius": string } & Record<string, string | undefined>) => {
    const match = input["--radius"]!.match(/^(\d+(?:\.\d+)?)(rem|px|em)$/)!
    const [, num, unit] = match
    const filled = { ...input } as Record<string, string>
    for (const [key, scale] of Object.entries(radius_scales)) {
      if (filled[key] === undefined) {
        filled[key] = `${(parseFloat(num!) * scale).toFixed(4)}${unit}`
      }
    }
    return filled
  }),

  resolved_theme: "color_theme & chart_theme & sidebar_theme & radius_theme",
}).export()

export type resolved_theme = typeof resolved_theme.infer

export function resolve_theme(raw: unknown): resolved_theme {
  const theme = resolved_theme(raw)
  if (theme instanceof type.errors) throw new Error(theme.summary)
  return theme
}

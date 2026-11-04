export interface Viewport {
  x: number
  y: number
  scale: number
}

export const MIN_SCALE = 0.1
export const MAX_SCALE = 3

export const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))

/** Zoom around a screen-space point so that point stays fixed. */
export function zoomAt(v: Viewport, px: number, py: number, factor: number): Viewport {
  const scale = clampScale(v.scale * factor)
  const k = scale / v.scale
  return { scale, x: px - (px - v.x) * k, y: py - (py - v.y) * k }
}

export function fitToScreen(
  content: { width: number; height: number },
  screen: { width: number; height: number },
  padding = 40,
): Viewport {
  const scale = clampScale(
    Math.min(
      (screen.width - padding * 2) / content.width,
      (screen.height - padding * 2) / content.height,
    ),
  )
  return {
    scale,
    x: (screen.width - content.width * scale) / 2,
    y: (screen.height - content.height * scale) / 2,
  }
}

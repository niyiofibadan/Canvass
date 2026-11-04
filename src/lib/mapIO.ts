import type { MapData } from '../types'

const isStr = (v: unknown): v is string => typeof v === 'string'
const isStrArr = (v: unknown): v is string[] => Array.isArray(v) && v.every(isStr)
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isArrOf = (v: unknown, fn: (x: Record<string, unknown>) => boolean) =>
  Array.isArray(v) && v.every((x) => isObj(x) && fn(x))

export function isMapData(v: unknown): v is MapData {
  if (!isObj(v) || !isObj(v.company)) return false
  const c = v.company
  return (
    isStr(c.name) &&
    isStr(c.personInCharge) &&
    isStr(c.reportsTo) &&
    isStrArr(c.directReports) &&
    isArrOf(
      v.frames,
      (f) => isStr(f.id) && isStr(f.title) && typeof f.number === 'number' && isStrArr(f.bullets),
    ) &&
    isArrOf(v.library, (g) => isStr(g.id) && isStr(g.title) && isStrArr(g.toolIds)) &&
    isArrOf(
      v.pillars,
      (p) =>
        isStr(p.id) &&
        isStr(p.title) &&
        isStr(p.objective) &&
        typeof p.number === 'number' &&
        isArrOf(
          p.sections,
          (s) =>
            isStr(s.id) &&
            isStr(s.title) &&
            isStrArr(s.toolIds) &&
            isArrOf(s.blocks, (b) => isStr(b.id) && isStr(b.heading) && isStrArr(b.bullets)),
        ),
    )
  )
}

export const exportMap = (map: MapData): string => JSON.stringify(map, null, 2)

export function parseMap(text: string): MapData {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('File is not valid JSON')
  }
  if (!isMapData(data)) throw new Error('File is not a valid Canvass map')
  return data
}

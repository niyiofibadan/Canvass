import { uid } from '../lib/id'
import type { Block, Company, Frame, MapData, Pillar, Section, ToolCategoryId } from '../types'

/** Pure operations on the map. The store wraps these with history + persistence. */

const mapPillar = (m: MapData, pid: string, fn: (p: Pillar) => Pillar): MapData => ({
  ...m,
  pillars: m.pillars.map((p) => (p.id === pid ? fn(p) : p)),
})

const mapSection = (m: MapData, pid: string, sid: string, fn: (s: Section) => Section): MapData =>
  mapPillar(m, pid, (p) => ({ ...p, sections: p.sections.map((s) => (s.id === sid ? fn(s) : s)) }))

export const updateCompany = (m: MapData, patch: Partial<Company>): MapData => ({
  ...m,
  company: { ...m.company, ...patch },
})

export const updateFrame = (m: MapData, id: string, patch: Partial<Frame>): MapData => ({
  ...m,
  frames: m.frames.map((f) => (f.id === id ? { ...f, ...patch } : f)),
})

export const updatePillar = (m: MapData, id: string, patch: Partial<Pillar>): MapData =>
  mapPillar(m, id, (p) => ({ ...p, ...patch }))

export const updateSection = (
  m: MapData,
  pid: string,
  sid: string,
  patch: Partial<Section>,
): MapData => mapSection(m, pid, sid, (s) => ({ ...s, ...patch }))

export const addSection = (m: MapData, pid: string): MapData =>
  mapPillar(m, pid, (p) => ({
    ...p,
    sections: [
      ...p.sections,
      {
        id: uid('s'),
        title: 'New section',
        blocks: [{ id: uid('b'), heading: 'Describe...', bullets: ['Describe...'] }],
        toolIds: [],
      },
    ],
  }))

export const removeSection = (m: MapData, pid: string, sid: string): MapData =>
  mapPillar(m, pid, (p) => ({ ...p, sections: p.sections.filter((s) => s.id !== sid) }))

export const addBlock = (m: MapData, pid: string, sid: string): MapData =>
  mapSection(m, pid, sid, (s) => ({
    ...s,
    blocks: [...s.blocks, { id: uid('b'), heading: 'Describe...', bullets: ['Describe...'] }],
  }))

export const removeBlock = (m: MapData, pid: string, sid: string, bid: string): MapData =>
  mapSection(m, pid, sid, (s) => ({ ...s, blocks: s.blocks.filter((b) => b.id !== bid) }))

export const updateBlock = (
  m: MapData,
  pid: string,
  sid: string,
  bid: string,
  patch: Partial<Block>,
): MapData =>
  mapSection(m, pid, sid, (s) => ({
    ...s,
    blocks: s.blocks.map((b) => (b.id === bid ? { ...b, ...patch } : b)),
  }))

const addUnique = (ids: string[], id: string) => (ids.includes(id) ? ids : [...ids, id])

export const addLibraryTool = (m: MapData, gid: ToolCategoryId, tool: string): MapData => ({
  ...m,
  library: m.library.map((g) => (g.id === gid ? { ...g, toolIds: addUnique(g.toolIds, tool) } : g)),
})

export const removeLibraryTool = (m: MapData, gid: ToolCategoryId, tool: string): MapData => ({
  ...m,
  library: m.library.map((g) =>
    g.id === gid ? { ...g, toolIds: g.toolIds.filter((t) => t !== tool) } : g,
  ),
})

export const addSectionTool = (m: MapData, pid: string, sid: string, tool: string): MapData =>
  mapSection(m, pid, sid, (s) => ({ ...s, toolIds: addUnique(s.toolIds, tool) }))

export const removeSectionTool = (m: MapData, pid: string, sid: string, tool: string): MapData =>
  mapSection(m, pid, sid, (s) => ({ ...s, toolIds: s.toolIds.filter((t) => t !== tool) }))

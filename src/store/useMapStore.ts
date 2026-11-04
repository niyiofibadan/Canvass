import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createDefaultMap } from '../data/defaultMap'
import type { MapData } from '../types'

export const STORAGE_KEY = 'canvass:v1'

interface MapState {
  map: MapData
  setCompanyName: (name: string) => void
  setFrameBullets: (frameId: string, bullets: string[]) => void
  setPillarObjective: (pillarId: string, text: string) => void
  addLibraryTool: (groupId: string, toolId: string) => void
  removeLibraryTool: (groupId: string, toolId: string) => void
  addSectionTool: (pillarId: string, sectionId: string, toolId: string) => void
  removeSectionTool: (pillarId: string, sectionId: string, toolId: string) => void
  resetToDefault: () => void
}

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      map: createDefaultMap(),
      setCompanyName: (name) =>
        set((s) => ({ map: { ...s.map, company: { ...s.map.company, name } } })),
      setFrameBullets: (frameId, bullets) =>
        set((s) => ({
          map: {
            ...s.map,
            frames: s.map.frames.map((f) => (f.id === frameId ? { ...f, bullets } : f)),
          },
        })),
      setPillarObjective: (pillarId, text) =>
        set((s) => ({
          map: {
            ...s.map,
            pillars: s.map.pillars.map((p) => (p.id === pillarId ? { ...p, objective: text } : p)),
          },
        })),
      addLibraryTool: (groupId, toolId) =>
        set((s) => ({
          map: {
            ...s.map,
            library: s.map.library.map((g) =>
              g.id === groupId && !g.toolIds.includes(toolId)
                ? { ...g, toolIds: [...g.toolIds, toolId] }
                : g,
            ),
          },
        })),
      removeLibraryTool: (groupId, toolId) =>
        set((s) => ({
          map: {
            ...s.map,
            library: s.map.library.map((g) =>
              g.id === groupId ? { ...g, toolIds: g.toolIds.filter((t) => t !== toolId) } : g,
            ),
          },
        })),
      addSectionTool: (pillarId, sectionId, toolId) =>
        set((s) => ({
          map: {
            ...s.map,
            pillars: s.map.pillars.map((p) =>
              p.id !== pillarId
                ? p
                : {
                    ...p,
                    sections: p.sections.map((sec) =>
                      sec.id === sectionId && !sec.toolIds.includes(toolId)
                        ? { ...sec, toolIds: [...sec.toolIds, toolId] }
                        : sec,
                    ),
                  },
            ),
          },
        })),
      removeSectionTool: (pillarId, sectionId, toolId) =>
        set((s) => ({
          map: {
            ...s.map,
            pillars: s.map.pillars.map((p) =>
              p.id !== pillarId
                ? p
                : {
                    ...p,
                    sections: p.sections.map((sec) =>
                      sec.id === sectionId
                        ? { ...sec, toolIds: sec.toolIds.filter((t) => t !== toolId) }
                        : sec,
                    ),
                  },
            ),
          },
        })),
      resetToDefault: () => set({ map: createDefaultMap() }),
    }),
    { name: STORAGE_KEY, version: 1 },
  ),
)

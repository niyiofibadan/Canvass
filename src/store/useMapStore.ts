import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createDefaultMap } from '../data/defaultMap'
import type { MapData } from '../types'

export const STORAGE_KEY = 'canvass:v1'
const MAX_HISTORY = 50

interface MapState {
  map: MapData
  /** In-memory undo stack (not persisted). */
  past: MapData[]
  apply: (fn: (m: MapData) => MapData) => void
  undo: () => void
  resetToDefault: () => void
  importMap: (map: MapData) => void
}

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      map: createDefaultMap(),
      past: [],
      apply: (fn) =>
        set((s) => ({ map: fn(s.map), past: [...s.past.slice(-(MAX_HISTORY - 1)), s.map] })),
      undo: () =>
        set((s) =>
          s.past.length ? { map: s.past[s.past.length - 1], past: s.past.slice(0, -1) } : s,
        ),
      resetToDefault: () =>
        set((s) => ({
          map: createDefaultMap(),
          past: [...s.past.slice(-(MAX_HISTORY - 1)), s.map],
        })),
      importMap: (map) => set((s) => ({ map, past: [...s.past.slice(-(MAX_HISTORY - 1)), s.map] })),
    }),
    { name: STORAGE_KEY, version: 1, partialize: (s) => ({ map: s.map }) },
  ),
)

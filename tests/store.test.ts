import { createDefaultMap } from '../src/data/defaultMap'
import { STORAGE_KEY, useMapStore } from '../src/store/useMapStore'
import { updateCompany } from '../src/store/mapOps'
import { exportMap, parseMap } from '../src/lib/mapIO'

const DEFAULT_NAME = createDefaultMap().company.name

describe('store', () => {
  it('persists edits to localStorage under canvass:v1', () => {
    useMapStore.getState().apply((m) => updateCompany(m, { name: 'Persisted Co' }))
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(saved.state.map.company.name).toBe('Persisted Co')
    expect(saved.state.past).toBeUndefined()
  })

  it('undoes and resets to default', () => {
    const { apply, undo, resetToDefault } = useMapStore.getState()
    apply((m) => updateCompany(m, { name: 'A' }))
    apply((m) => updateCompany(m, { name: 'B' }))
    undo()
    expect(useMapStore.getState().map.company.name).toBe('A')
    resetToDefault()
    expect(useMapStore.getState().map.company.name).toBe(DEFAULT_NAME)
    undo()
    expect(useMapStore.getState().map.company.name).toBe('A')
  })

  it('round-trips export/import and rejects bad input', () => {
    const map = useMapStore.getState().map
    expect(parseMap(exportMap(map))).toEqual(map)
    expect(() => parseMap('nope')).toThrow(/valid JSON/)
    expect(() => parseMap('{"a":1}')).toThrow(/valid Canvass map/)
    useMapStore.getState().importMap({ ...map, company: { ...map.company, name: 'Imported' } })
    expect(useMapStore.getState().map.company.name).toBe('Imported')
  })
})

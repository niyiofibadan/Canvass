import { createDefaultMap } from '../src/data/defaultMap'
import * as ops from '../src/store/mapOps'

describe('mapOps', () => {
  it('updates company, frame, pillar immutably', () => {
    const m = createDefaultMap()
    const m2 = ops.updateCompany(m, { name: 'Acme' })
    expect(m2.company.name).toBe('Acme')
    expect(m.company.name).toBe('Company Name')
    expect(ops.updateFrame(m, 'f1', { title: 'X' }).frames[0].title).toBe('X')
    expect(ops.updatePillar(m, 'p1', { objective: 'Obj' }).pillars[0].objective).toBe('Obj')
  })

  it('adds and removes sections and blocks', () => {
    const m = createDefaultMap()
    const before = m.pillars[0].sections.length
    const m2 = ops.addSection(m, 'p1')
    expect(m2.pillars[0].sections).toHaveLength(before + 1)
    const sid = m2.pillars[0].sections[before].id
    const m3 = ops.addBlock(m2, 'p1', sid)
    expect(m3.pillars[0].sections[before].blocks).toHaveLength(2)
    const bid = m3.pillars[0].sections[before].blocks[1].id
    expect(ops.removeBlock(m3, 'p1', sid, bid).pillars[0].sections[before].blocks).toHaveLength(1)
    expect(ops.removeSection(m3, 'p1', sid).pillars[0].sections).toHaveLength(before)
  })

  it('adds tools without duplicates and removes them', () => {
    let m = createDefaultMap()
    m = ops.addLibraryTool(m, 'accounting', 'xero')
    m = ops.addLibraryTool(m, 'accounting', 'xero')
    expect(m.library[0].toolIds).toEqual(['xero'])
    expect(ops.removeLibraryTool(m, 'accounting', 'xero').library[0].toolIds).toEqual([])
    m = ops.addSectionTool(m, 'p1', 'p1-s1', 'xero')
    m = ops.addSectionTool(m, 'p1', 'p1-s1', 'xero')
    expect(m.pillars[0].sections[0].toolIds).toEqual(['xero'])
    expect(ops.removeSectionTool(m, 'p1', 'p1-s1', 'xero').pillars[0].sections[0].toolIds).toEqual(
      [],
    )
  })
})

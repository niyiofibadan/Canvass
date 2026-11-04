export type ToolCategoryId =
  'accounting' | 'planning' | 'banking' | 'operations' | 'tax' | 'infrastructure'

export interface Tool {
  id: string
  name: string
  category: ToolCategoryId
  /** Official website. https only. */
  url: string
  /** Optional logo URL; falls back to initials when absent. */
  logo?: string
}

export interface Block {
  id: string
  heading: string
  bullets: string[]
}

export interface Section {
  id: string
  title: string
  blocks: Block[]
  toolIds: string[]
}

export interface Pillar {
  id: string
  number: number
  title: string
  objective: string
  sections: Section[]
}

export interface Frame {
  id: string
  number: number
  title: string
  bullets: string[]
}

export interface Company {
  name: string
  personInCharge: string
  reportsTo: string
  directReports: string[]
}

export interface LibraryGroup {
  id: ToolCategoryId
  title: string
  toolIds: string[]
}

export interface MapData {
  frames: Frame[]
  company: Company
  library: LibraryGroup[]
  pillars: Pillar[]
}

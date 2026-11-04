import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { createDefaultMap } from '../src/data/defaultMap'
import { useMapStore } from '../src/store/useMapStore'

beforeEach(() => {
  localStorage.clear()
  useMapStore.setState({ map: createDefaultMap(), past: [] })
})
afterEach(cleanup)

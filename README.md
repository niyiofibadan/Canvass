# Canvass

**Canvass is a Financial Operational Map**: a single Figma-style infinite pan/zoom board (dark theme) that maps a whole financial operation. It ships pre-filled with a default map, and every change is saved to your browser's `localStorage`.

## Features

- **Infinite pan/zoom canvas**: drag to pan, wheel to zoom, fit-to-screen. SVG connectors with arrowheads link the company node to the pillars.
- **3 strategy frames**: 01 Financial Context, 02 Financial Goal, 03 Financial Strategy.
- **Company card**: company name, person in charge, reports to, direct reports.
- **8 pillars**: Financial Accounting, Financial Planning, Treasury & Cash Management, Revenue & Receivables, Expenses & Payables, Tax & Financial Compliance, Capital Structure, Capital Allocation. Each has an objective and sections with notes and attached tools.
- **Tool library**: 6 groups (Accounting & Financial Reporting, Financial Planning, Banking/Treasury & Capital, Financial Operations, Tax/Risk & Compliance, Financial Infrastructure) with 300+ seed tools and a searchable picker.
- **Hoverable tool logos**: hovering or focusing any tool icon shows its name and a link to the official website (new tab, `rel="noopener noreferrer"`). The popover stays open while the pointer moves onto the link, closes on Esc, and is wired with `aria-describedby`.
- **localStorage persistence** (`canvass:v1`) with a "Reset to default" action.

> Status: initial scaffold. The canvas renders the company card, 3 frames and 8 pillar headers; inline editing, sections and the tool picker UI are on the roadmap.

## Stack

- Vite, React 18, TypeScript (strict), pnpm
- Zustand with `persist` middleware
- Tailwind CSS (dark theme)
- lucide-react icons; tool library in `src/data/tools.ts`
- Vitest + React Testing Library; ESLint + Prettier

## Getting started

```bash
pnpm install
pnpm dev      # start the dev server
pnpm test     # run the test suite
pnpm build    # type-check and build for production
pnpm lint     # lint
```

## Project structure

```
src/
  components/
    canvas/    pan/zoom canvas, company card, SVG connectors
    frames/    the 3 strategy frames
    pillars/   pillar headers, sections
    tools/     ToolIcon (hover popover), ToolGrid, ToolPicker
  store/       Zustand store + persistence
  data/        defaultMap.ts, tools.ts (seed tool library)
  lib/         viewport math, ids
  types/       shared TypeScript types
tests/         Vitest tests
docs/          documentation
```

## Roadmap

- Inline editing for all text; add/remove sections, bullets and tools
- Tool picker wired into library groups and pillar sections
- Editable company card and direct reports
- Import/export of the map as JSON
- Real logo assets for seed tools

## Contributing

1. Branch from `master`.
2. Keep `pnpm build`, `pnpm test` and `pnpm lint` green.
3. Open a pull request describing the change.

## License

TBD.

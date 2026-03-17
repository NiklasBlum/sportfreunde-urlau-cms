# Sportfreunde Urlau CMS

Sanity Studio v5 project for the Sportfreunde Urlau e.V. website.

- **Project ID**: `n07z17nt`
- **Dataset**: `production`
- **Frontend**: `../sportfreunde-urlau-frontend` (Next.js)

## Code Style

- Single quotes, no semicolons, 100-char print width (see `prettier` config in `package.json`)
- TypeScript throughout; follow existing schema files as style reference

## Architecture

All document types live in `schemaTypes/` as individual files and are exported via `schemaTypes/index.ts`. Register every new type there.

### Naming Conventions

- Schema file names use `snake_case` and match the `name` field of the `defineType` call exactly (e.g. `radsport_herren_tours.ts` → `name: 'radsport_herren_tours'`)
- Field names use `camelCase`
- German titles/labels for all `title` and `description` fields (content editors speak German)

### Schema Patterns

- Always use `defineType` / `defineField` (never raw objects)
- Date fields: `type: 'date'`, `options: {dateFormat: 'DD.MM.YYYY'}`, `initialValue` returning `new Date().toISOString().slice(0, 10)`
- Status/enum fields: `type: 'string'` with `options.list` + `layout: 'radio'`
- Always provide a `preview` block with a meaningful `prepare()` that includes a status icon and the date/title

### Tour document pattern (radsport_herren_tours, radsport_damen_tours)

Fields: `date` (required), `route`, `departureTime`, `status` (tour | cancelled | pause, required).  
Year-based grouping is derived from `date` on the frontend — do **not** add a separate `season` field to tour schemas.

## Build & Deploy

```bash
npm run dev          # local studio
npm run build        # production build
npm run deploy       # deploy studio to Sanity hosting
npx sanity@latest schema deploy  # push schema to cloud after changes
```

## Frontend Query Contract

The frontend (`getRadsport*` functions) selects only: `_id`, `date`, `route`, `departureTime`, `status`. Keep these fields present in all tour schemas. Removing or renaming them is a breaking change.

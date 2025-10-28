# Monet-Drawing

Monet-Drawing is an open-source whiteboard that blends mind mapping, flowcharts, freehand sketching, and rapid exporting into a single browser experience. The project is built on top of the Nx toolchain with React 18, TypeScript, and Vite, and ships ready for static hosting.

## Highlights
- Mind maps, flowcharts, and freehand drawing on an infinite canvas.
- Plugin architecture powered by the Plait ecosystem (draw, mind, freehand, text).
- Local autosave plus a one-click `Save As…` action that exports `.monet` snapshots.
- Fresh toolbar actions for “New Canvas” (with confirmation) and “Save As…”.
- Internationalised UI (EN, ZH, RU, AR) with a tutorial overlay for first-time users.

## Quick Start

| Requirement | Version |
|-------------|---------|
| Node.js     | 18.x / 20.x |
| npm         | 9+ |

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:7200 by default)
npm run start
```

### Useful scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Serve `apps/web` with Vite (Nx `serve web`). |
| `npm run build` | Build all targets declared in the workspace. |
| `npm run build:web` | Production build for the web app (outputs to `dist/apps/web`). |
| `npm run lint` | Lint all projects with automatic fixes where possible. |
| `npm run test` | Execute configured Nx test targets. |

## Project Layout

```
.
├── apps/
│   └── web/                # Primary React application
├── packages/
│   ├── drawnix/            # Whiteboard components, plugins, i18n, data helpers
│   ├── react-board/        # React bindings around the Plait board
│   └── react-text/         # Text rendering utilities
├── scripts/                # Release & publish helpers
├── README.md
└── package.json
```

### Notable features

- **Toolbar improvements** – The creation toolbar now includes “New Canvas” and “Save As…” buttons beside the existing tools. “Save As…” writes `.monet` (JSON) snapshots via the File System Access API.
- **Autosave** – Board state persists to IndexedDB / LocalStorage automatically; refreshing keeps your latest canvas.
- **Save As format** – Exports use `application/vnd.monet-drawing+json` with the `.monet` extension. Importing still accepts previous snapshots.
- **Internationalisation** – Language strings live in `packages/drawnix/src/i18n/translations`. The Chinese pack reuses the English copy for consistency.

## Deployment

Monet-Drawing produces static assets and can be deployed on any static host. For **Vercel**:

1. Build command: `npm run build:web`
2. Output directory: `dist/apps/web`
3. (Optional) Environment variable: `NODE_VERSION=20`

For manual hosting, run `npm run build:web` and serve the contents of `dist/apps/web` from your CDN or web server.

## Development Notes

- This workspace is managed by **Nx**—use `npx nx graph` to explore project dependencies or `npx nx show project web --web` for target introspection.
- The default tutorial overlay and headline copy are controlled through i18n keys such as `tutorial.title` and `tutorial.description`.
- The toolbar icons live in `packages/drawnix/src/components/icons.tsx`. Custom actions can be registered in `packages/drawnix/src/components/toolbar/creation-toolbar.tsx`.

## License

Monet-Drawing is released under the [MIT License](LICENSE).

<p align="center">
  <picture style="width: 320px">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/plait-board/drawnix/blob/develop/apps/web/public/logo/logo_drawnix_h.svg?raw=true" />
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/plait-board/drawnix/blob/develop/apps/web/public/logo/logo_drawnix_h_dark.svg?raw=true" />
    <img src="https://github.com/plait-board/drawnix/blob/develop/apps/web/public/logo/logo_drawnix_h.svg?raw=true" width="360" alt="Drawnix logo and name" />
  </picture>
</p>
<div align="center">
  <h2>
    Drawnix is an open-source, all-in-one collaborative whiteboard.
  <br />
  </h2>
</div>

## Feature Overview

- Free, open source, and production ready
- Mind maps, flowcharts, and freehand sketching
- Image uploads and asset management
- Plugin-friendly architecture
- Export to PNG, JPG, and Drawnix JSON files
- Automatic saving through browser storage
- Full editing toolset: undo, redo, copy, paste, and more
- Infinite canvas with zoom and pan
- Theme switching, including dark mode
- Mobile-ready UI
- Mermaid syntax to flowchart conversion
- Markdown to mind map conversion

## Why “Drawnix”?

The name blends “Draw” with “Phoenix”. It reflects the idea that creation is a cycle of reinvention—every stroke is a chance to rise again. Draw Beyond, Rise Above.

## Built on Plait

Drawnix is powered by the Plait drawing framework, which also underpins our knowledge base product [PingCode Wiki](https://pingcode.com/product/wiki?utm_source=drawnix). The plugin system embraces multiple UI frameworks (Angular, React) and rich-text editors (currently Slate), allowing teams to ship modular, reusable functionality for new whiteboard scenarios.

## Repository Outline

```
drawnix/
├── apps/
│   └── web                 # drawnix.com
├── dist/                   # build artifacts
├── packages/
│   ├── drawnix             # whiteboard application core
│   ├── react-board         # React view layer
│   └── react-text          # text rendering module
├── package.json
├── ...
└── README.md
└── README_en.md
```

## Quick Start

```
npm install
npm run start
```

## Docker Image

```
docker pull pubuzhixing/drawnix:latest
```

## Key Dependencies

- [plait](https://github.com/worktile/plait) — open-source drawing framework
- [slate](https://github.com/ianstormtaylor/slate) — rich text editor framework
- [floating-ui](https://github.com/floating-ui/floating-ui) — toolkit for floating UI elements

## Contributing

Bug reports, feature ideas, and pull requests are all welcome.

## License

[MIT License](https://github.com/plait-board/drawnix/blob/master/LICENSE)

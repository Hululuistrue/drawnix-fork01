<p align="center">
  <picture style="width: 320px">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/plait-board/drawnix/blob/develop/apps/web/public/logo/logo_drawnix_h.svg?raw=true" />
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/plait-board/drawnix/blob/develop/apps/web/public/logo/logo_drawnix_h_dark.svg?raw=true" />
    <img src="https://github.com/plait-board/drawnix/blob/develop/apps/web/public/logo/logo_drawnix_h.svg?raw=true" width="360" alt="Drawnix logo and name" />
  </picture>
</p>
<div align="center">
  <h2>
    Drawnix is an open-source whiteboard SaaS that combines mind maps, flowcharts, and freehand drawing.
  <br />
  </h2>
</div>

<div align="center">
  <figure>
    <a target="_blank" rel="noopener">
      <img src="https://github.com/plait-board/drawnix/blob/develop/apps/web/public/product_showcase/case-2.png" alt="Product showcase" width="80%" />
    </a>
    <figcaption>
      <p align="center">
        All-in-one whiteboard: mind mapping, flowcharts, freehand illustration.
      </p>
    </figcaption>
  </figure>
  <a href="https://hellogithub.com/repository/plait-board/drawnix" target="_blank">
    <picture style="width: 250">
      <source media="(prefers-color-scheme: light)" srcset="https://abroad.hellogithub.com/v1/widgets/recommend.svg?rid=4dcea807fab7468a962c153b07ae4e4e&claim_uid=zmFSY5k8EuZri43&theme=neutral" />
      <source media="(prefers-color-scheme: dark)" srcset="https://abroad.hellogithub.com/v1/widgets/recommend.svg?rid=4dcea807fab7468a962c153b07ae4e4e&claim_uid=zmFSY5k8EuZri43&theme=dark" />
      <img src="https://abroad.hellogithub.com/v1/widgets/recommend.svg?rid=4dcea807fab7468a962c153b07ae4e4e&claim_uid=zmFSY5k8EuZri43&theme=neutral" alt="Featured on HelloGitHub" style="width: 250px; height: 54px;" width="250" height="54"/>
    </picture>
  </a>

  <br />

  <a href="https://trendshift.io/repositories/13979" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13979" alt="plait-board/drawnix on Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</div>

[*English README*](https://github.com/plait-board/drawnix/blob/develop/README_en.md)

## Highlights

- Free and open source
- Mind maps, flowcharts, and freehand drawing in one workspace
- Image uploads and media management
- Plugin-based architecture for deep customization
- Export to PNG, JPG, and JSON (`.drawnix`)
- Automatic saving powered by browser storage
- Rich editing features: undo, redo, copy, paste, and more
- Infinite canvas with smooth zooming and panning
- Multiple interface themes including dark mode
- Mobile-friendly layout
- Mermaid-to-flowchart conversion
- Markdown-to-mind-map conversion (latest addition)

## About the Name

***Drawnix*** blends ***Draw*** with ***Phoenix***. The phoenix symbolizes creativity that never burns out, while drawing is one of the most direct forms of expression. Every sketch is a chance to rise again—Draw Beyond, Rise Above.

## Powered by the Plait Drawing Framework

Drawnix is built on the open-source Plait drawing framework, a core component of our knowledge base product [PingCode Wiki](https://pingcode.com/product/wiki?utm_source=drawnix). The plugin architecture embraces multiple UI frameworks (Angular, React) and rich-text editors (currently Slate), encouraging a layered structure and reusable plugins that adapt to new whiteboard scenarios.

## Repository Structure

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

## Try It Online

The hosted edition at [https://drawnix.com](https://drawnix.com) showcases the core Drawnix experience. We will continue shipping rapid updates until the **Dawn** release.

## Development Setup

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

We welcome bug reports, proposals, and pull requests of all sizes—every contribution helps Drawnix improve.

## Acknowledgements

Thank you to everyone who supports this project and to our company for backing open-source work.

<p align="left">
  <a href="https://pingcode.com?utm_source=drawnix" target="_blank">
      <img src="https://cdn-aliyun.pingcode.com/static/site/img/pingcode-logo.4267e7b.svg" width="120" alt="PingCode" />
  </a>
</p>

## License

[MIT License](https://github.com/plait-board/drawnix/blob/master/LICENSE)

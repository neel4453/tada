<h1 align="center">TNT</h1>

<p align="center">
  <i>Real-time translation between spoken and signed languages, in the browser.</i>
</p>

<p align="center">
  <strong>TNT</strong> is a progressive web app that translates spoken language into signed language and signed
  language video into spoken language text and audio.
</p>

<p align="center">
  <a href="https://github.com/neel4453/tada/issues">Submit an Issue</a>
  ·
  <a href="https://github.com/neel4453/tada/blob/main/CONTRIBUTING.md">Contribution Guidelines</a>
  ·
  <a href="THIRD_PARTY_NOTICES.md">Third-Party Notices</a>
</p>

<p align="center">
  <a href="https://github.com/neel4453/tada/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg" alt="License: CC BY-NC-SA 4.0 Badge" />
  </a>
  <img src="https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white" alt="Angular 21" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PWA-ready-5A0FC8?logo=pwa&logoColor=white" alt="PWA ready" />
</p>

---

## Overview

TNT is a browser-based sign language translation workspace. It runs the heavy computer-vision work on the user's own
device using WebAssembly and WebGL TensorFlow.js models, and calls out to a small set of translation services only
for the steps that genuinely need server-side compute.

Two translation directions are supported:

- **Spoken → Signed** — type (or dictate) text in a spoken language and watch it rendered as a pose sequence, a
  photo-realistic human, or a 3D avatar in the signed language you choose.
- **Signed → Spoken** — show sign language to your webcam, or upload a video, and read the recognised SignWriting
  back as spoken-language text with optional speech synthesis.

Everything is client-side first: no account, no upload of your video to a third party, and the app keeps working as
an installable PWA.

### Sign Language Production

```
┌─────────────────────┐                                                              ┌─────────┐
│Spoken Language Audio│                                                              │Human GAN│
└─────────┬───────────┘                                                              └────▲────┘
          │                                                                                │
          ▼                                                                                │
┌────────────────────┐     ┌───────────────┐     ┌───────────┐    ┌──────────────┐        │
│Spoken Language Text├────►│Normalized Text├────►│SignWriting├───►│Pose Sequence ├────────┤
└─────────┬──────────┘     └───────────────┘     └───────────┘    └──────┬───────┘        │
          │                        ▲                   ▲                 │                │
          ▼                        │                   │                 ▼                │
┌───────────────────────┐          │                   │        ┌─────────────────┐       │
│Language Identification├──────────┘───────────────────┘        │Skeleton / Avatar│───────┘
└───────────────────────┘                                        └─────────────────┘
```

### Sign Language Translation

```
┌──────────────────────────┐                                ┌────────────────────┐
│Upload Sign Language Video│                                │Spoken Language Text│
└──────────┬───────────────┘                                └──────────▲─────────┘
           │                                                          │
           │          ┌────────────┐       ┌──────────────┐           │
           ├─────────►│Segmentation├──────►│  SignWriting ├───────────┘
           │          └────────────┘       └──────────────┘
           │
┌──────────┴────────────────┐
│Camera Sign Language Video │
└───────────────────────────┘
```

## Main Features

| Area | What you get |
| --- | --- |
| **Two-way translation** | Spoken-to-signed and signed-to-spoken, switchable in one click with language swap. |
| **~100 spoken languages** | Full language list with flags, language auto-detection and a searchable picker. |
| **Multiple pose viewers** | Skeleton, photo-realistic human (pix2pix GAN) and a 3D avatar rendered with three.js. |
| **SignWriting panel** | Optional SignWriting notation panel alongside the animation. |
| **Voice input & output** | Web Speech API dictation and speech synthesis, with per-language voice selection. |
| **Offline / PWA** | Installable, service-worker cached, and downloadable offline models for pose estimation, avatar and pix2pix. |
| **Accessibility first** | Keyboard navigable, ARIA-labelled controls, visible focus rings, RTL support for 10 languages, `prefers-reduced-motion` support and axe-based a11y tests. |
| **Internationalised UI** | 90+ UI locales loaded on demand, with English fallback. |
| **Share & export** | Download the rendered translation as a video, copy the text, or share a watch link. |

## Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | Angular 21 (standalone components, signals-based `viewChild`, SSR + prerendering) |
| UI | Ionic 8, Angular Material 21, Angular CDK |
| State | NGXS 21 |
| i18n | Transloco 8 |
| ML / vision | TensorFlow.js 4 (WASM, WebGL and WebGPU backends), MediaPipe Holistic & tasks-text, custom pix2pix worker |
| 3D / video | three.js, `pose-viewer`, `@google/model-viewer`, mediabunny |
| Charts / misc | leaflet, swiper, ionicons, flag-icons |
| Tooling | Angular CLI 21, ESLint, Prettier, Karma + Jasmine, Playwright |

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (22 LTS recommended) — includes npm 9+
- A Chromium-based, Firefox or WebKit browser for the ML features (WebGPU support is optional but improves the
  photo-realistic renderer)

Clone the repository and install dependencies:

```bash
git clone https://github.com/neel4453/tada.git
cd tada
npm install
```

> **Note on network-restricted environments.** The project depends on two GitHub-hosted packages
> (`@sign-mt/i18n` and `@sign-mt/configuration`). If your TLS stack uses a custom root CA, export
> `NODE_EXTRA_CA_CERTS=/path/to/ca-certificates.crt` before running `npm install`.

## Local Development

Start the dev server (binds to `0.0.0.0` so it is reachable from other devices on your network):

```bash
npm start
```

Then open <http://localhost:4200/>.

### Regenerating generated files

Several files in the repository are generated from a single source of truth. Re-run these after changing the
corresponding input:

```bash
npm run generate:base-path   # base-path.json -> robots.txt, opensearch.xml, _base-path.scss, canonical URL
npm run generate:terms       # LICENSE.md    -> terms.component.html
npm run generate:privacy     # PRIVACY.md    -> privacy.component.html
npm run generate:licenses    # dependency tree -> src/assets/licenses.json
npm run generate:sitemap     # sitemap-index.xml into the built output
```

`npm run prestart` regenerates the licence report automatically.

## Configuration Requirements

All configuration lives in [`src/environments/`](src/environments). No secrets are committed.

| Setting | File | Meaning |
| --- | --- | --- |
| `measurementId` | `environment.ts`, `environment.prod.ts` | Google Analytics measurement id. **Leave `null` to disable analytics entirely** — every call site is guarded. |
| `apiDomain` | all environment files | Host of the translation services (`text-normalization.<domain>`, `sw-description.<domain>`, `sw-translation.<domain>`). |
| `recaptchaSiteKey` | all environment files | reCAPTCHA Enterprise site key used to attach an anti-abuse token to API requests. **Leave empty to disable.** |
| `basePath` / `canonicalOrigin` | [`base-path.json`](base-path.json) | Deployment sub-path and origin used for the canonical URL, `robots.txt`, `opensearch.xml` and the sitemap. |

Because analytics and reCAPTCHA ship disabled, the app is fully functional with no configuration at all — it simply
talks to the public translation API. Set your own ids before enabling those integrations.

## Build

Production build (includes base-href, prerendering and the service worker):

```bash
npm run build
```

Output is written to `dist/tnt/browser`. Serve it from the path configured in `base-path.json`, e.g.
`https://<origin>/tnt/`.

Other useful targets:

```bash
npm run build:stats    # build + stats.json for bundle analysis
npm run analyze        # open the bundle analyzer
npm run lint           # ESLint over src/**/*.ts and src/**/*.html
npm test               # Karma + Jasmine unit tests with coverage
npm run test:ci        # headless Chrome + Firefox, single run
npm run build:full     # the complete CI pipeline: generators + build + sitemap + docs
```

## Testing

```bash
npm test           # watch mode, all browsers from karma.conf.js
npm run test:ci    # ChromeHeadless + FirefoxHeadless, single run
npm run lint
```

The suite covers component creation, NGXS state/actions, service behaviour and — via `jasmine-axe` — automated
accessibility checks on every component that renders markup.

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI: logo, video, animation, speech, share dialog, flag icons
│   │   ├── core/
│   │   │   ├── constants.ts # Single source of truth for product name and repository links
│   │   │   ├── helpers/     # url, watermark, wait, image helpers (+ unit tests)
│   │   │   ├── interceptors/# reCAPTCHA token interceptor
│   │   │   ├── modules/     # NGXS stores, Transloco i18n, Google Analytics
│   │   │   └── services/    # assets, frame cache, holistic, tfjs, three, recaptcha
│   │   ├── modules/         # Feature logic: animation, detector, pix2pix, pose, settings,
│   │   │                    #   sign-writing, translate
│   │   └── pages/           # Routes: translate, watch, playground, benchmark, settings, landing, 404
│   ├── assets/
│   │   ├── i18n/            # 90+ UI translation files
│   │   ├── icons/           # TNT logo, favicon and generated PWA icons
│   │   ├── models/          # TensorFlow.js and MediaPipe model shards
│   │   └── promotional/     # Geography and customer imagery
│   ├── environments/        # App configuration (no secrets)
│   └── theme/               # Design system: _tnt.scss tokens/mixins, Ionic + Material theming
├── docs/                    # VitePress documentation site
├── tools/                   # Build-time generators (base path, sitemap, licences, i18n)
├── angular.json             # Angular workspace ("tnt" project)
├── base-path.json           # Deployment base path + canonical origin
├── LICENSE.md               # Licence for the inherited codebase (preserved verbatim)
├── PRIVACY.md               # Privacy policy (source for the in-app page)
└── THIRD_PARTY_NOTICES.md   # Attribution and licence obligations
```

### Design system

`src/theme/_tnt.scss` holds every visual primitive — glassmorphism surfaces (`glass-panel`, `glass-pill`),
subtle neumorphic depth (`neu-raised`, `neu-inset`), layered shadows, brand gradients, focus rings, skeleton
shimmers and motion keyframes. Component styles compose those mixins so spacing, radii, easing and focus
treatment stay identical across the product, and both light and dark colour schemes work without per-component
media queries.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `npm install` fails on a git dependency | Use `https://` git remotes and set `NODE_EXTRA_CA_CERTS` if you are behind a TLS-inspecting proxy. |
| `sharp` install fails during `npm install` | `pwa-asset-generator` (icon generation only) needs to download libvips. Run `npm install --ignore-scripts`, or skip `npm run pwa:assets`. |
| Blank page after a production build | The app is served from the `basePath` in `base-path.json`. Serve `dist/tnt/browser` under that path, or change `basePath` and re-run `npm run generate:base-path`. |
| "Licence information is unavailable" on `/legal/licenses` | Run `npm run generate:licenses` to produce `src/assets/licenses.json`. |
| Camera or microphone does nothing | Both require a secure context (`https://` or `localhost`) and an explicit permission grant. |
| Photo-realistic renderer is slow | Switch the pose viewer to *Skeleton* in Settings → Appearance, or enable WebGPU in a supported browser. |
| Translations show as raw keys | The active language file failed to load. Check the network tab for `assets/i18n/<lang>.json`. |
| Analytics/reCAPTCHA appear inert | Expected: both ship disabled. Add your own `measurementId` / `recaptchaSiteKey`. |

## Attribution & Licensing

TNT is built on top of the inherited **sign/translate** codebase. The licence that governs that code is preserved
verbatim in [`LICENSE.md`](LICENSE.md) — it is a dual licence (Creative Commons BY-NC-SA 4.0 for individuals,
non-profits and educational institutions; a separate commercial licence for for-profit entities) and its copyright
notices and commercial-licence contact remain those of the original authors.

Please do not read the rebrand as a claim of original authorship. Full details of what was inherited, from where,
and under which terms are documented in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

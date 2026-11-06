# Third-Party Notices

TNT is a rebranded, refactored continuation of the open-source **`sign/translate`** project (published as
"Rylo Translate" / "Sign.mt"). This file records what was inherited, from where, and under which terms, so that
the obligations attached to that code are preserved and honoured.

**TNT does not claim original authorship of the inherited codebase.** The licence text, copyright notices and
attribution obligations of the original authors are reproduced verbatim in [`LICENSE.md`](LICENSE.md) and are
surfaced in the application at `/legal/terms`.

---

## 1. Licence of the inherited codebase

`LICENSE.md` is preserved **verbatim** from the upstream project, including:

- the dual free/commercial licensing model,
- `Copyright (c) 2022 Nagish Inc.`,
- the full text of the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License,
- the commercial-licence contact address of the original authors.

Renaming the product to TNT did not and could not relicense the inherited work. Anyone redistributing TNT must
comply with the terms in `LICENSE.md`. In particular, the ShareAlike and NonCommercial clauses continue to apply to
derivative works.

The same document is rendered in the application at `/legal/terms` (generated from `LICENSE.md` by
`npm run generate:terms`), so the notice travels with the product rather than living only in the repository.

---

## 2. Inherited source material

| Component | Origin | Notes |
| --- | --- | --- |
| Application source, models wiring, NGXS stores, pose/detector/pix2pix pipelines | `sign/translate` | Refactored and rebranded; behaviour preserved. |
| Research and factual documentation in `docs/` | `sign/translate` | Domain research on deafness, literacy, market and regulation. Kept as-is, with citations intact. |
| Academic citations in `docs/docs/technology/awards.md` | Various published papers | Published titles and author lists are historical facts and are reproduced unchanged. |
| `src/assets/.well-known/security.txt` | `sign/translate` | **Left byte-for-byte unchanged.** It is an OpenPGP-signed file; editing the body would invalidate the signature, and its `Expires` date has already passed. A deployment operator should replace it with their own signed file. |
| Privacy policy prose | `sign/translate` | Adapted for TNT in [`PRIVACY.md`](PRIVACY.md); the data-handling description reflects the inherited architecture. |

---

## 3. Third-party dependencies

Runtime and build dependencies are listed in [`package.json`](package.json). A complete, machine-generated report
— package name, licence and repository for every direct dependency — is produced by:

```bash
npm run generate:licenses
```

which writes `src/assets/licenses.json`. That file is bundled into the application and rendered at
`/legal/licenses` (the *Software and Licences* page). Regenerate it whenever dependencies change.

Notable dependencies and their licences (verify against `src/assets/licenses.json`, which is authoritative):

| Package | Licence |
| --- | --- |
| Angular, Angular Material, Angular CDK, Angular CLI | MIT |
| `@ionic/angular`, `ionicons` | MIT |
| `@ngxs/store` | MIT |
| `@jsverse/transloco` | MIT |
| `@tensorflow/tfjs*` | Apache-2.0 |
| `@mediapipe/holistic`, `@mediapipe/tasks-text`, `@mediapipe/drawing_utils` | Apache-2.0 |
| `three` | MIT |
| `@google/model-viewer` | Apache-2.0 |
| `pose-viewer` | MIT |
| `@sutton-signwriting/*` | MIT |
| `flag-icons` | MIT |
| `leaflet` | BSD-2-Clause |
| `swiper` | MIT |
| `vanilla-cookieconsent` | Custom (see package) |
| `rxjs`, `tslib`, `zone.js` | MIT |
| `stats.js` | MIT |
| `comlink` | Apache-2.0 |
| `web-vitals` | Apache-2.0 |
| `filesize`, `ngx-filesize` | MIT |
| `mediabunny` | MPL-2.0 |

### Git-hosted dependencies

Two packages are consumed directly from GitHub rather than npm, and retain their upstream licences:

| Package | Source | Contents |
| --- | --- | --- |
| `@sign-mt/i18n` | `https://github.com/sign/i18n` | Language-name data used to populate the language pickers. |
| `@sign-mt/configuration` | `https://github.com/sign/.github` | Shared repository configuration (husky hooks, issue templates, community files). |

---

## 4. Bundled model weights and data files

The application ships pre-trained model weights and reference data under `src/assets/`. These were inherited from
the upstream project and are redistributed under the licences attached to their respective upstream repositories:

| Asset | Purpose |
| --- | --- |
| `src/assets/models/pose-animation/` | Pose-sequence model used by the skeleton/avatar viewers. |
| `src/assets/models/pix2pix/` | Photo-realistic human generator (pix2pix). |
| `src/assets/models/face-features/`, `src/assets/models/hand-shape/`, `src/assets/models/sign-detector/` | SignWriting and detection models. |
| `src/assets/models/mediapipe-language-detector/` | Spoken-language identification model (MediaPipe). |
| `node_modules/@mediapipe/holistic/` | Copied into `assets/models/holistic/` at build time by `angular.json`. |
| `src/assets/promotional/geography/` | World GeoJSON and statistics used by the landing page map. |
| `node_modules/@sutton-signwriting/font-ttf/font` | SignWriting font, copied to `assets/fonts/signwriting/` at build time. |

Model licences are **not** restated here because they are set by their upstream authors. Consult the upstream
repositories listed above before redistributing the weights for a purpose other than running this application.

---

## 5. External services used at runtime

The app calls the following third-party endpoints. They are configuration-driven (see
[`src/environments/`](src/environments)) and are disabled when the corresponding configuration is empty:

| Service | Used for | Configuration |
| --- | --- | --- |
| `text-normalization.<apiDomain>`, `sw-description.<apiDomain>`, `sw-translation.<apiDomain>` | Text normalisation, SignWriting description and translation. | `apiDomain` |
| `us-central1-sign-mt.cloudfunctions.net` | Spoken-text-to-signed-pose conversion. | Hard-coded upstream endpoint. |
| Google Analytics | Optional, consent-gated usage analytics. **Disabled by default.** | `measurementId` |
| Google reCAPTCHA Enterprise | Optional anti-abuse token on API requests. **Disabled by default.** | `recaptchaSiteKey` |
| OpenAI ChatGPT API | Optional text normalisation and vocalisation on the server side. | Server-side; see [`PRIVACY.md`](PRIVACY.md). |

Analytics and reCAPTCHA ship with empty/null values so that a fresh deployment sends no data to any third party
until the operator explicitly opts in.

---

## 6. Trademarks

"TNT" is used here as the product name of this rebranded build. It is not affiliated with, endorsed by, or
connected to any other product or company using the same or a similar name. "Sign.mt", "Rylo", "Nagish" and the
associated logos remain the property of their respective owners; references to them in `LICENSE.md`, the citations
in `docs/`, and the signed `security.txt` are retained solely for attribution and legal accuracy.

# Changelog

This file lists the important changes made to **TNT** over time.
Entries inherited from the upstream `sign/translate` project are preserved in
[`.changelog-archive.md`](.changelog-archive.md).

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 1.0.0 — TNT rebrand (2026/11/05)

A complete product refinement of the inherited `sign/translate` codebase: rebranded as **TNT**, given a unified
design system, and hardened for production use. No product functionality was removed.

#### Rebranding

- **branding**: product renamed to **TNT** across the app title, browser tab, PWA manifest, OpenSearch description,
  navigation, settings, share messages, downloaded filenames, notification copy and README/docs
- **logo**: new TNT mark and wordmark (`src/assets/icons/logo.svg`, `logo-dark.svg`, `favicon.svg`,
  `src/app/components/logo`, `docs/public/logo-*.svg`); the canvas watermark in
  `src/app/core/helpers/watermark.ts` now draws the TNT letterforms
- **removed**: creator-specific promotional links (rylo.com, Rylo social accounts, third-party store banners) and
  the third-party smart app banner
- **preserved**: `LICENSE.md` verbatim, including copyright notices and the commercial-licence contact; the
  OpenPGP-signed `src/assets/.well-known/security.txt` byte-for-byte
- **added**: [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) documenting inherited code, dependency licences,
  bundled model weights, external services and trademark status
- **package**: `@sign/translate` → `tnt`, Angular project `sign-translate` → `tnt`, output `dist/sign-translate` →
  `dist/tnt`

#### Design system

- **theme**: new `src/theme/_tnt.scss` with glassmorphism (`glass-panel`, `glass-pill`), neumorphism
  (`neu-raised`, `neu-inset`), layered shadow tokens, brand gradients, focus rings, skeleton shimmers and motion
  keyframes
- **shell**: ambient drifting background orbs, skip-to-content link, consistent focus rings, brand-tinted text
  selection, `prefers-reduced-motion` support
- **navigation**: floating glass navbar with animated gradient underline on hover and a spring-eased CTA
- **surfaces**: translation card, settings groups, cards, notices and the watch page all use the shared tokens
- **states**: redesigned 404 page, licence loading/error/empty states, polished loading and empty states
- **components**: buttons, list items, segment controls and cards share one radius/elevation/motion treatment

#### Functional improvements

- **routing**: the previously orphaned `/settings` route is now reachable from the translator navigation
- **feedback**: feedback and issue links point at the project's GitHub issue tracker instead of a stale mailbox
- **i18n**: new `landing.community`, `app.*` and `legal.licenses.*` keys; licence summary uses ICU pluralisation
- **a11y**: `main` landmarks with `id="main-content"` on every full-screen page, `rel="noopener"` on external links,
  ARIA labels on icon-only actions, focus rings on the logo and nav
- **privacy**: `PRIVACY.md` rewritten for TNT; analytics and reCAPTCHA ship **disabled** by default so a fresh
  deployment sends no data to third parties
- **watch page**: repaired the broken `assets/brand/logo.svg` image reference and removed dead third-party store
  links

#### Reliability & SSR fixes

- **video**: `stats.js` is now instantiated lazily, only in the browser, and `ngAfterViewInit` short-circuits on the
  server — fixes `ReferenceError: document is not defined` during prerendering
- **video state**: `SetVideo` no longer probes video metadata on the server
- **licences page**: fetch is browser-only, failures surface a recoverable error state instead of an unhandled
  `HttpErrorResponse`
- **compile**: removed unused component imports flagged by `NG8113`, replaced an `any`-typed tree accessor with a
  proper type guard

#### Codebase cleanup

- **dependencies**: replaced unreachable `git://` and `git+ssh://` GitHub URLs with `https://`, unblocking
  `npm install` in restricted networks
- **dead code**: removed the smart app banner machinery and the unused `ANDROID_PLAY_STORE_URL` constant
- **consistency**: `REPOSITORY_URL`, `REPOSITORY_ISSUES_URL` and `REPOSITORY_I18N_URL` in
  `src/app/core/constants.ts` are now the single source of truth for every outbound project link
- **docs**: fixed the `hhttps://` typo in a citation URL, corrected the docs edit-link branch to `main`, removed the
  hard-coded third-party Google Analytics snippet from the VitePress config

#### Build & tooling

- Production build completes with **zero compiler warnings and zero prerender errors**
- `tools/apply-base-path.js` now emits the `/tnt/` base path consistently across `robots.txt`,
  `opensearch.xml`, `_base-path.scss` and the canonical URL

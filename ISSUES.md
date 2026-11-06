# Known Issues

Tracked issues that are not yet fixed in **TNT**. Anything user-facing should also be filed on the
[GitHub issue tracker](https://github.com/neel4453/tada/issues) so it can be prioritised and discussed.

## Navigation

- **404 does not redirect to the main page.** The not-found route renders correctly and offers a *Go to Home*
  button, but an unknown URL is not rewritten to `/`. Low priority: the explicit button covers the common case.

## Mat tabs bar

- Moving between tabs leaves a 1px line visible for about a second, which shifts the surrounding layout. This is a
  rendering artefact in the Material tab indicator rather than a layout bug.

## Reporting new issues

Please include:

1. The URL you were on and the translation direction you were using.
2. The browser and version, plus whether WebGPU/WebGL was available.
3. The console output, if any.
4. Screenshots or a short screen recording for visual glitches.

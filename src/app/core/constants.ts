function nav(property: 'platform' | 'vendor' | 'userAgent') {
  return 'navigator' in globalThis ? navigator[property] : '';
}

export const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(nav('platform'));
export const isIOS = /(iPhone|iPod|iPad)/i.test(nav('platform'));

export const isSafari =
  /apple/i.test(nav('vendor')) &&
  !/crios/i.test(nav('userAgent')) &&
  !/fxios/i.test(nav('userAgent')) &&
  !/Opera|OPT\//.test(nav('userAgent'));

export const isChrome = /(Chrome|Chromium)/i.test(nav('userAgent'));

// Safari, mobile Chrome, not including desktop Chrome
export const isWebKit = /AppleWebKit/i.test(nav('userAgent')) && (!isChrome || (isIOS && isChrome));

/** Display name of the product, used for document titles and share messages. */
export const APP_NAME = 'TNT';

/** Tagline shown next to the product name where a longer description is needed. */
export const APP_TAGLINE = 'Sign language translation';

/**
 * Public home of the project. Support, contribution and feedback links all point
 * here so that there is exactly one place to update.
 */
export const REPOSITORY_URL = 'https://github.com/neel4453/tada';
export const REPOSITORY_ISSUES_URL = `${REPOSITORY_URL}/issues`;
export const REPOSITORY_I18N_URL = `${REPOSITORY_URL}/tree/main/src/assets/i18n`;

export const environment = {
  production: true,
  // Google Analytics measurement id. Leave `null` to disable analytics entirely —
  // every analytics call site is guarded, so the app runs fine without it.
  // Set your own id here (never commit somebody else's property).
  measurementId: null as string | null,
  // Host of the translation APIs. See README "Configuration requirements".
  apiDomain: 'nagish.io',
  // reCAPTCHA Enterprise site key. Leave empty to skip the anti-abuse token.
  recaptchaSiteKey: '',
};

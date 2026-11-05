// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Google Analytics measurement id. Leave `null` to disable analytics entirely —
  // every analytics call site is guarded, so the app runs fine without it.
  // Set your own id here (never commit somebody else's property).
  measurementId: null as string | null,
  // Host of the translation APIs. See README "Configuration requirements".
  apiDomain: 'nagish.dev',
  // reCAPTCHA Enterprise site key. Leave empty to skip the anti-abuse token.
  recaptchaSiteKey: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

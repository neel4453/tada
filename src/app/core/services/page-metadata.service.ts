import {Injectable, inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {TranslocoService} from '@jsverse/transloco';
import {filter} from 'rxjs/operators';
import {APP_NAME} from '../constants';

/**
 * Keeps the browser tab title and the `description` meta tag in sync with the
 * active route. Every screen gets a meaningful, translated title instead of
 * falling back to the document default.
 */
@Injectable({providedIn: 'root'})
export class PageMetadataService {
  private title = inject(Title);
  private router = inject(Router);
  private transloco = inject(TranslocoService);

  /** Route path (first segment) -> translation key for the page title. */
  private static readonly TITLE_KEYS: ReadonlyArray<readonly [string, string]> = [
    ['', 'translate.title'],
    ['watch', 'translate.title'],
    ['playground', 'playground.title'],
    ['benchmark', 'benchmark.title'],
    ['settings', 'settings.title'],
    ['about/contribute', 'landing.contribute.title'],
    ['legal/terms', 'legal.terms.title'],
    ['legal/privacy', 'legal.privacy.title'],
    ['legal/licenses', 'legal.licenses.title'],
  ];

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.update(event.urlAfterRedirects));
  }

  private resolveTitleKey(url: string): string {
    const path = url.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
    for (const [prefix, key] of PageMetadataService.TITLE_KEYS) {
      if (prefix === '' ? path === '' : path === prefix || path.startsWith(`${prefix}/`)) {
        return key;
      }
    }
    return '404.title';
  }

  update(url: string): void {
    const key = this.resolveTitleKey(url);
    const pageTitle = this.transloco.translate(key);

    // A missing key is rendered verbatim by Transloco — fall back to the app name
    // rather than showing a raw dotted key in the browser tab.
    this.title.setTitle(pageTitle.includes('.') ? APP_NAME : `${pageTitle} | ${APP_NAME}`);

    if (key === 'translate.title') {
      this.transloco.selectTranslate('translate.description').subscribe(description => {
        this.updateDescription(description);
      });
    }
  }

  private updateDescription(content: string): void {
    if (!('document' in globalThis)) {
      return;
    }
    let tag = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = content;
  }
}

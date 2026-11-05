import {TestBed} from '@angular/core/testing';
import {Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslocoService} from '@jsverse/transloco';
import {Subject} from 'rxjs';
import {PageMetadataService} from './page-metadata.service';
import {AppTranslocoTestingModule} from '../modules/transloco/transloco-testing.module';

describe('PageMetadataService', () => {
  let service: PageMetadataService;
  let title: Title;
  let routerEvents: Subject<any>;
  let transloco: TranslocoService;

  function navigate(url: string): void {
    routerEvents.next(new NavigationEnd(1, url, url));
  }

  beforeEach(() => {
    routerEvents = new Subject<any>();

    TestBed.configureTestingModule({
      imports: [AppTranslocoTestingModule],
      providers: [
        PageMetadataService,
        {provide: Router, useValue: {events: routerEvents.asObservable()}},
        {provide: TranslocoService, useValue: {translate: (key: string) => key}},
      ],
    });

    service = TestBed.inject(PageMetadataService);
    title = TestBed.inject(Title);
    transloco = TestBed.inject(TranslocoService);
    spyOn(transloco, 'translate').and.callFake(<T>(key: unknown) => key as T);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should suffix every page title with the product name', () => {
    navigate('/');
    expect(title.getTitle()).toEqual('translate.title | TNT');
  });

  it('should map each route to its own translation key', () => {
    const expected: Array<[string, string]> = [
      ['/', 'translate.title'],
      ['/watch?text=hi', 'translate.title'],
      ['/playground', 'playground.title'],
      ['/benchmark', 'benchmark.title'],
      ['/settings/feedback', 'settings.title'],
      ['/about/contribute', 'landing.contribute.title'],
      ['/legal/terms', 'legal.terms.title'],
      ['/legal/privacy', 'legal.privacy.title'],
      ['/legal/licenses', 'legal.licenses.title'],
    ];

    for (const [url, key] of expected) {
      navigate(url);
      expect(title.getTitle()).toEqual(`${key} | TNT`);
    }
  });

  it('should fall back to the not-found title for unknown routes', () => {
    navigate('/this-route-does-not-exist');
    expect(title.getTitle()).toEqual('404.title | TNT');
  });

  it('should ignore query strings and trailing slashes', () => {
    navigate('/legal/licenses/?foo=bar');
    expect(title.getTitle()).toEqual('legal.licenses.title | TNT');
  });
});

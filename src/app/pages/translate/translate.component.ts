import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetSetting} from '../../modules/settings/settings.actions';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../components/base/base.component';
import {TranslationService} from '../../modules/translate/translate.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {TranslateMobileComponent} from './translate-mobile/translate-mobile.component';
import {TranslateDesktopComponent} from './translate-desktop/translate-desktop.component';
import {loadSignWritingPreference} from './signwriting/sign-writing-preference';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  imports: [TranslateMobileComponent, TranslateDesktopComponent],
})
export class TranslateComponent extends BaseComponent implements OnInit {
  private store = inject(Store);
  translation = inject(TranslationService);
  private mediaMatcher = inject(MediaMatcher);

  isMobile: MediaQueryList;

  constructor() {
    super();

    this.isMobile = this.mediaMatcher.matchMedia('screen and (max-width: 599px)');

    // Default settings
    this.store.dispatch([
      new SetSetting('receiveVideo', true),
      new SetSetting('detectSign', false),
      new SetSetting('drawSignWriting', loadSignWritingPreference()), // This setting currently also controls loading the SignWriting models.
      new SetSetting('drawPose', true),
      new SetSetting('poseViewer', 'pose'),
    ]);
  }

  ngOnInit(): void {
    // The browser tab title and the description meta tag are maintained centrally
    // by PageMetadataService, so every route gets a translated title.
    this.playVideos();
  }

  async playVideos(): Promise<void> {
    if (!('window' in globalThis)) {
      return;
    }

    // Autoplay videos don't play before page interaction, or after re-opening PWA without refresh
    fromEvent(window, 'click')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async () => {
        const videos = Array.from(document.getElementsByTagName('video'));

        for (const video of videos) {
          if (video.autoplay && video.paused) {
            try {
              await video.play();
            } catch (e) {
              console.error(e);
            }
          }
        }
      });
  }
}

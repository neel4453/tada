import {Component} from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';
import {IonBackButton, IonContent, IonHeader, IonItem, IonLabel, IonList} from '@ionic/angular/standalone';
import {REPOSITORY_ISSUES_URL} from '../../../core/constants';

@Component({
  selector: 'app-settings-feedback',
  templateUrl: './settings-feedback.component.html',
  styleUrls: ['./settings-feedback.component.scss'],
  imports: [TranslocoDirective, IonHeader, IonList, IonItem, IonLabel, IonBackButton, IonContent],
})
export class SettingsFeedbackComponent {
  issuesUrl = REPOSITORY_ISSUES_URL;
}

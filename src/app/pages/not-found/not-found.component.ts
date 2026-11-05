import {Component} from '@angular/core';
import {IonButton, IonContent, IonIcon} from '@ionic/angular/standalone';
import {TranslocoPipe} from '@jsverse/transloco';
import {RouterLink} from '@angular/router';
import {addIcons} from 'ionicons';
import {homeOutline} from 'ionicons/icons';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [IonContent, IonButton, IonIcon, TranslocoPipe, RouterLink],
})
export class NotFoundComponent {
  constructor() {
    addIcons({homeOutline});
  }
}

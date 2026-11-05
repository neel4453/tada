import {Component} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {REPOSITORY_ISSUES_URL} from '../../../core/constants';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.scss'],
  imports: [TranslocoPipe],
})
export class SendFeedbackComponent {
  issuesUrl = REPOSITORY_ISSUES_URL;
}

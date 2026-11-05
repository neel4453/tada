import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslocoDirective, TranslocoPipe} from '@jsverse/transloco';
import {REPOSITORY_ISSUES_URL, REPOSITORY_URL} from '../../../core/constants';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrl: './landing-footer.component.scss',
  imports: [RouterLink, TranslocoDirective, TranslocoPipe],
})
export class LandingFooterComponent {
  legalPages: string[] = ['terms', 'privacy', 'licenses'];
  repositoryUrl = REPOSITORY_URL;
  issuesUrl = REPOSITORY_ISSUES_URL;
}

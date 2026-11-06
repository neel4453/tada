import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {NestedTreeControl} from '@angular/cdk/tree';
import {AssetState} from '../../../core/services/assets/assets.service';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatIconButton} from '@angular/material/button';
import {IonIcon} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {chevronDownOutline, chevronForwardOutline} from 'ionicons/icons';
import {NgTemplateOutlet} from '@angular/common';
import {TranslocoPipe} from '@jsverse/transloco';
import {catchError, of} from 'rxjs';

interface PackagesParent {
  name: string;
  children: Node[];
}

interface PackageLicense {
  name: string;
  licenses: string;
  repository: string;
  licenseUrl: string;
}

type Node = PackagesParent | PackageLicense;

/** Drives the loading / ready / error states of the page. */
export type LicenseLoadState = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss'],
  imports: [MatTreeModule, MatIconButton, IonIcon, TranslocoPipe, NgTemplateOutlet],
})
export class LicensesComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  treeControl = new NestedTreeControl<Node>(node => ('children' in node ? node.children : []));
  filesTree = new MatTreeNestedDataSource<Node>();

  loadState: LicenseLoadState = 'loading';
  packageCount = 0;

  constructor() {
    addIcons({chevronDownOutline, chevronForwardOutline});
  }

  ngOnInit(): void {
    // The licence report is a static asset fetched with a relative URL, which
    // only resolves in a browser. On the server we render the loading state and
    // let the hydrated client perform the request.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.httpClient
      .get<{[key: string]: any}>('assets/licenses.json')
      .pipe(
        catchError(error => {
          // A missing or unreadable licence report must never take the page
          // down — surface a recoverable error state instead.
          console.error('Could not load assets/licenses.json', error);
          return of(null);
        })
      )
      .subscribe(licenses => {
        if (licenses) {
          this.updateTree(licenses);
        } else {
          this.showError();
        }
      });
  }

  private showError(): void {
    this.packageCount = 0;
    this.filesTree.data = [];
    this.treeControl.dataNodes = [];
    this.loadState = 'error';
  }

  updateTree(packages: {[key: string]: any}) {
    const entries = Object.entries(packages ?? {});

    if (!entries.length) {
      this.showError();
      return;
    }

    this.packageCount = entries.length;

    for (const [name, info] of entries) {
      info.name = name;
      if (name.startsWith('@')) {
        const [scope, packageName] = name.split('/');
        if (!packages[scope]) {
          packages[scope] = {name: `${scope}/`, children: []};
        }
        packages[scope].children.push({...info, name: packageName});
        delete packages[name];
      }
    }

    const nodes = Object.values(packages).sort((a, b) => a.name.localeCompare(b.name));
    this.filesTree.data = this.treeControl.dataNodes = nodes;
    this.treeControl.expandAll();
    this.loadState = 'ready';
  }

  hasChildren(_: number, node: AssetState) {
    return 'children' in node;
  }
}

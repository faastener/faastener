import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {TechnologyDossier} from '../../shared/interfaces/dossier';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() dossiers$: Observable<TechnologyDossier[]>;

  constructor() {
  }
}

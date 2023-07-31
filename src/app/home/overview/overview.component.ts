import {Component, Input} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {Technology, TechnologyType, TechnologyTypeUtil} from '../../shared/interfaces/technology';
import {ConfigurationService} from "../../core/services/configuration.service";

@Component({
  selector: 'faastener-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() technologies$: Observable<Technology[]> = EMPTY;
  defaultTechnologyType: string;

  constructor(private config: ConfigurationService) {
    this.defaultTechnologyType = TechnologyTypeUtil.toString(config.defaultTechnologyType);
  }
}

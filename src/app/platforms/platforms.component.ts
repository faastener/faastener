import {Component} from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Observable} from 'rxjs';
import {FaasPlatformModel} from '../shared/data-models/faas-platform/faas-platform.model';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent {

  supportedPlatforms$: Observable<FaasPlatformModel[]> = this.dataService.getSupportedPlatforms();

  constructor(private dataService: DataService) {
  }

}

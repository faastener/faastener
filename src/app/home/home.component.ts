import {Component} from '@angular/core';
import {DataService} from '../core/services/data.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  supportedPlatforms$ = this.dataService.getTechnologies();

  constructor(private dataService: DataService) {
  }
}

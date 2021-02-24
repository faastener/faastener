import {Component} from '@angular/core';
import {DataService} from '../core/services/data.service';

@Component({
  template: `
    <app-home-banner></app-home-banner>
    <app-home-about></app-home-about>
    <app-overview [supportedPlatforms$]="supportedPlatforms$"></app-overview>
  `
})
export class HomeComponent {
  supportedPlatforms$ = this.dataService.getPlatforms();

  constructor(private dataService: DataService) {
  }
}

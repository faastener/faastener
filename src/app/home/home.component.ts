import {Component} from '@angular/core';
import {DataService} from '../core/services/data.service';

@Component({
  template: `
    <app-home-banner></app-home-banner>
    <app-home-about></app-home-about>
    <app-home-platforms-overview [supportedPlatforms$]="supportedPlatforms$"></app-home-platforms-overview>
  `
})
export class HomeComponent {
  supportedPlatforms$ = this.dataService.getSupportedPlatforms();

  constructor(private dataService: DataService) {
  }
}

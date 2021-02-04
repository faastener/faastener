import {Component} from '@angular/core';

@Component({
  template: `
    <div>
      <app-home-header></app-home-header>
      <app-info-page-banner></app-info-page-banner>
      <app-info-page-about></app-info-page-about>
      <app-info-page-platforms-list></app-info-page-platforms-list>
    </div>`
})
export class HomeComponent {

  constructor() {
  }

}

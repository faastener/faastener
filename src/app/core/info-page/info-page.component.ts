import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-page',
  template: `
    <div>
      <app-info-page-header></app-info-page-header>
      <app-info-page-banner></app-info-page-banner>
      <app-info-page-about></app-info-page-about>
      <app-info-page-platforms-list></app-info-page-platforms-list>
    </div>`
})
export class InfoPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

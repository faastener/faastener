import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-explorer-page',
  template: `
    <div>
      <app-explorer-header></app-explorer-header>
      <app-explorer-view-config></app-explorer-view-config>
    </div>
  `
})
export class ExplorerPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}

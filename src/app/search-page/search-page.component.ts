import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <app-search-header></app-search-header>
    <app-filter></app-filter>
  `
})
export class SearchPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}

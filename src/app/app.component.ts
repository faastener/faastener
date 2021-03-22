import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}

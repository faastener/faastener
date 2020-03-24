import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div fxLayout="column" style="height: 100%;">
        <router-outlet></router-outlet>
        <app-footer fxFlexOffset="auto"></app-footer>
    </div>
  `
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}

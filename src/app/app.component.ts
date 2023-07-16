import {Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'faastener-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'FaaStener';
  loading: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((e) => this.checkRouterEvent(e));
  }

  private checkRouterEvent(e: any): void {
    if (e instanceof NavigationStart) {
      this.loading = true;
    }

    if (e instanceof NavigationCancel || e instanceof NavigationEnd || e instanceof NavigationError) {
      this.loading = false;
    }
  }

}

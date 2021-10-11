import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <div *ngIf="loading" class="loader-overlay">
        <mat-spinner style="margin: 35vh auto 0"></mat-spinner>
      </div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  loading: boolean;

  constructor(private router: Router) {
    router.events.subscribe((e) => this.checkRouterEvent(e));
  }

  ngOnInit(): void {
  }

  private checkRouterEvent(e): void {
    if (e instanceof NavigationStart) {
      this.loading = true;
    }

    if (e instanceof NavigationCancel || e instanceof NavigationEnd || e instanceof NavigationError) {
      this.loading = false;
    }
  }
}

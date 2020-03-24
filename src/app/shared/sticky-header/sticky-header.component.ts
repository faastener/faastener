import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, share, throttleTime} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';


enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  template: '',
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        })
      ),
      state(
        VisibilityState.Visible,
        style({
          opacity: 1,
          transform: 'translateY(0)',
          background: '#fff'
        })
      ),
      transition('* => *', animate('300ms ease-in'))
    ])
  ]
})
export abstract class StickyHeaderComponent implements OnInit, AfterViewInit {
  isVisible: boolean;
  menuOpened: boolean;

  constructor() {
    this.isVisible = true;
  }

  ngOnInit() {
  }

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  ngAfterViewInit(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const scrollDown = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    scrollUp$.subscribe(() => (this.isVisible = true));
    scrollDown.subscribe(() => (this.isVisible = false));
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  @Input() scrollToAnchor!: string;
  toTop = false;

  constructor(private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
  }

  onScrollToTop(platformId: string) {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(platformId);
    }, 50);
  }
}

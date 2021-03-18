import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassificationFramework, ClassificationViewCombination, CriteriaGrouping} from '../../shared/interfaces/classification';
import {Subscription} from 'rxjs';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  frameworks: ClassificationFramework[];
  defaultFramework: ClassificationFramework;
  defaultViewCombination: ClassificationViewCombination;
  viewToggles: Map<string, boolean> = new Map<string, boolean>();
  selectedGrouping: Map<string, CriteriaGrouping> = new Map<string, CriteriaGrouping>();

  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.frameworks = data['resolvedData'];
      if (this.frameworks.length) {
        this.defaultFramework = this.frameworks[0];
        for (let vc of this.defaultFramework.viewCombinations) {
          if (vc.default) {
            this.defaultViewCombination = vc;
            break;
          }
        }
      }
      // Initialize default view configuration
      this.defaultViewCombination.views.forEach(v => this.viewToggles.set(v.id, false));
    });
  }

  onGroupingSelected(viewId: string, grouping: CriteriaGrouping) {
    if (this.selectedGrouping.get(viewId)?.id === grouping.id) {
      this.selectedGrouping.set(viewId, undefined);
    } else {
      this.selectedGrouping.set(viewId, grouping);
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(grouping.id);
      }, 50);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

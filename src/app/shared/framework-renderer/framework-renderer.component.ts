import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassificationFramework, ClassificationViewCombination, CriteriaGrouping, CriterionInstance} from '../interfaces/classification';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-framework-renderer',
  templateUrl: './framework-renderer.component.html',
  styleUrls: ['./framework-renderer.component.scss']
})
export class FrameworkRendererComponent implements OnInit {
  @Input() framework: ClassificationFramework;
  @Input() reviewData: Map<string, CriterionInstance> = new Map<string, CriterionInstance>();
  @Input() includeFrameworkInfo = true;

  defaultViewCombination: ClassificationViewCombination;
  viewToggles: Map<string, boolean> = new Map<string, boolean>();
  selectedGrouping: Map<string, CriteriaGrouping> = new Map<string, CriteriaGrouping>();

  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    for (let vc of this.framework.viewCombinations) {
      if (vc.default) {
        this.defaultViewCombination = vc;
        break;
      }
    }
    // Initialize default view configuration
    this.defaultViewCombination.views.forEach(v => this.viewToggles.set(v.id, false));
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
}

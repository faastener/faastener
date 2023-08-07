import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassificationFramework, CriteriaGrouping, CriterionValue} from '../interfaces/classification';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-framework-renderer',
  templateUrl: './framework-renderer.component.html',
  styleUrls: ['./framework-renderer.component.scss']
})
export class FrameworkRendererComponent implements OnInit {
  @Input() framework!: ClassificationFramework;
  @Input() includeFrameworkInfo: boolean = true;
  @Input() extraCriterionTitle: string = '';
  @Input() renderReviewData: boolean = false;
  @Input() reviewData: Map<string, CriterionValue[]> = new Map();

  viewToggles: Map<string, boolean> = new Map<string, boolean>();
  selectedGrouping: Map<string, CriteriaGrouping> = new Map<string, CriteriaGrouping>();

  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    this.framework.frameworkViews.forEach(v => this.viewToggles.set(v.id, false));
  }

  onGroupingSelected(viewId: string, grouping: CriteriaGrouping) {
    if (this.selectedGrouping.get(viewId)?.id === grouping.id) {
      this.selectedGrouping.delete(viewId);
    } else {
      this.selectedGrouping.set(viewId, grouping);
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(grouping.id);
      }, 50);
    }
  }

  getGrouping(viewId: string): CriteriaGrouping[] {
    const g = this.selectedGrouping.get(viewId);
    if (g) return [g];
    return [];
  }
}

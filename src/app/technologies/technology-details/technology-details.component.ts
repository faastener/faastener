import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {Technology} from '../../shared/interfaces/technology';
import {ViewportScroller} from '@angular/common';
import {ClassificationFramework, ClassificationViewCombination, CriterionInstance} from '../../shared/interfaces/classification';

@Component({
  selector: 'app-technology-details',
  templateUrl: './technology-details.component.html',
  styleUrls: ['./technology-details.component.scss']
})
export class TechnologyDetailsComponent implements OnInit {
  toTop = false;

  platform: Technology;
  framework: ClassificationFramework;
  reviewData: Map<string, CriterionInstance> = new Map<string, CriterionInstance>();
  selectedViewCombination: ClassificationViewCombination;

  constructor(private route: ActivatedRoute, private dataService: DataService, private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.platform = data['resolvedData'][0];
      this.framework = data['resolvedData'][1];

      this.platform.dossier.reviewedCriteria.forEach(c => this.reviewData.set(c.criterionId, c));
      this.framework.viewCombinations.forEach(vc => vc.default ? this.selectedViewCombination = vc : false);
    });
  }

  onScrollToTop(platformId: string) {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(platformId);
    }, 50);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.toTop = window.pageYOffset > 200;
  }
}

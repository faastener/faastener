import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {Technology} from '../../shared/interfaces/technology';
import {ClassificationFramework, ClassificationViewCombination, CriterionInstance} from '../../shared/interfaces/classification';
import {BottomNavComponent} from '../../shared/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-technology-details',
  templateUrl: './technology-details.component.html',
  styleUrls: ['./technology-details.component.scss']
})
export class TechnologyDetailsComponent implements OnInit {
  @ViewChild('bottomNavComponent') bottomNav: BottomNavComponent;
  platform: Technology;
  framework: ClassificationFramework;
  reviewData: Map<string, CriterionInstance> = new Map<string, CriterionInstance>();
  selectedViewCombination: ClassificationViewCombination;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.platform = data['resolvedData'][0];
      this.framework = data['resolvedData'][1];

      this.platform.dossier.reviewedCriteria.forEach(c => this.reviewData.set(c.criterionId, c));
      this.framework.viewCombinations.forEach(vc => vc.default ? this.selectedViewCombination = vc : false);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.bottomNav.toTop = window.pageYOffset > 200;
  }
}

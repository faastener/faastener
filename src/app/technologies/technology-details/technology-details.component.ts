import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Technology} from '../../shared/interfaces/technology';
import {ClassificationFramework, ClassificationViewCombination} from '../../shared/interfaces/classification';
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
  selectedViewCombination: ClassificationViewCombination;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.platform = data.resolvedData[0];
      this.framework = data.resolvedData[1];

      this.framework.viewCombinations.forEach(vc => vc.default ? this.selectedViewCombination = vc : false);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.bottomNav.toTop = window.pageYOffset > 200;
  }
}

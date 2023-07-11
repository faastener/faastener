import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TechnologyDossier, TechnologyInfo} from '../../shared/interfaces/dossier';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {BottomNavComponent} from '../../shared/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-technology-details',
  templateUrl: './technology-details.component.html',
  styleUrls: ['./technology-details.component.scss']
})
export class TechnologyDetailsComponent implements OnInit {
  @ViewChild('bottomNavComponent') bottomNav: BottomNavComponent;

  dossier: TechnologyDossier;
  framework: ClassificationFramework;

  constructor(private route: ActivatedRoute) {
    console.log(this.dossier);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      this.dossier = data.resolvedData[0];
      this.framework = data.resolvedData[1];
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.bottomNav.toTop = window.pageYOffset > 200;
  }
}

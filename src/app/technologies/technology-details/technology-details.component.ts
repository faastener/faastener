import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {BottomNavComponent} from '../../shared/bottom-nav/bottom-nav.component';
import {Technology} from "../../shared/interfaces/technology";

@Component({
  selector: 'app-technology-details',
  templateUrl: './technology-details.component.html',
  styleUrls: ['./technology-details.component.scss']
})
export class TechnologyDetailsComponent implements OnInit {
  @ViewChild('bottomNavComponent') bottomNav!: BottomNavComponent;

  technology!: Technology;
  framework!: ClassificationFramework;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      this.technology = data["resolvedData"][0];
      this.framework = data["resolvedData"][1];
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.bottomNav.toTop = window.pageYOffset > 200;
  }
}

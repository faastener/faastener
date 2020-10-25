import {Component, OnInit} from '@angular/core';
import {FaaSPlatform} from '../../model/core/faas-platform.model';
import {Router} from '@angular/router';
import {PlatformService} from '../../services/platform.service';

@Component({
  selector: 'app-explorer-page',
  template: `
    <div>
      <app-explorer-header></app-explorer-header>
      <app-explorer-view-config
        [platforms]="platforms"
        [selectedPlatformId]="selectedPlatformId"
        [selectedPlatform]="selectedPlatform"
        (selectedEvent)="onPlatformSelected($event)">
      </app-explorer-view-config>
      <app-explorer-view
        [platforms]="platforms"
        [selectedPlatformId]="selectedPlatformId"
        [selectedPlatform]="selectedPlatform">
      </app-explorer-view>
    </div>
  `
})
export class ExplorerPageComponent implements OnInit {
  platforms: FaaSPlatform[];
  selectedPlatformId: string;
  selectedPlatform: FaaSPlatform;

  constructor(private platformService: PlatformService, private router: Router) {
    this.platforms = platformService.getPlatforms().sort((p1, p2) => {
      if (p1.platformName > p2.platformName) {
        return 1;
      }
      if (p1.platformName < p2.platformName) {
        return -1;
      }
      return 0;
    });

    const s = router.getCurrentNavigation().extras.state;
    this.selectedPlatformId = s && s.platformId;
    this.selectedPlatform = this.platformService.getPlatform(this.selectedPlatformId);
  }

  ngOnInit() {
  }

  onPlatformSelected(selectedPlatformId: string) {
    this.selectedPlatformId = selectedPlatformId;
    this.selectedPlatform = this.platformService.getPlatform(this.selectedPlatformId);
  }
}

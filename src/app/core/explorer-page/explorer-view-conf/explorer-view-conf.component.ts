import {Component, OnInit} from '@angular/core';
import {PlatformService} from '../../../services/platform.service';
import {Router} from '@angular/router';
import {FaaSPlatform} from '../../../model/core/faas-platform.model';

@Component({
  selector: 'app-explorer-view-config',
  templateUrl: 'explorer-view-conf.component.html',
  styleUrls: ['explorer-view-conf.component.scss']
})
export class ExplorerViewConfComponent implements OnInit {
  panelOpenState = false;
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

  onPlatformChange() {
    this.selectedPlatform = this.platformService.getPlatform(this.selectedPlatformId);
    console.log(this.selectedPlatform);
  }
}

import {Component, OnInit} from '@angular/core';
import {PlatformService} from '../../../services/platform.service';
import {FaaSPlatform} from '../../../model/core/faas-platform.model';

@Component({
  selector: 'app-info-page-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.scss']
})
export class PlatformsListComponent implements OnInit {
  platforms: FaaSPlatform[];

  constructor(private platformService: PlatformService) {
  }

  ngOnInit() {
    this.platforms = this.platformService.getPlatforms();
  }
}

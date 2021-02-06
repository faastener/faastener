import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {FaaSPlatform} from '../../models/core/faas-platform.model';

@Component({
  selector: 'app-home-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent implements OnInit {
  platforms: FaaSPlatform[];

  constructor(private platformService: DataService) {
  }

  ngOnInit() {
    this.platforms = this.platformService.getPlatforms();
  }
}

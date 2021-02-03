import {Component, OnInit} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {FaaSPlatform} from '../../models/core/faas-platform.model';

@Component({
  selector: 'app-info-page-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.scss']
})
export class PlatformsListComponent implements OnInit {
  platforms: FaaSPlatform[];

  constructor(private platformService: DataService) {
  }

  ngOnInit() {
    this.platforms = this.platformService.getPlatforms();
  }
}

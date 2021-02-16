import { Component, OnInit } from '@angular/core';
import {DataService} from '../core/services/data.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent {

  supportedPlatforms$ = this.dataService.getSupportedPlatforms();

  constructor(private dataService: DataService) {
  }

}

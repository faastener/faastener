import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.scss']
})
export class PlatformsListComponent {

  @Input() supportedPlatforms$;

}

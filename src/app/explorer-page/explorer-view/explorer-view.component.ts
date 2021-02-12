import {Component, Input, OnInit} from '@angular/core';
import {FaaSPlatform} from '../../shared/data-models/core/faas-platform.model';

@Component({
  selector: 'app-explorer-view',
  templateUrl: 'explorer-view.component.html',
  styleUrls: ['explorer-view.component.scss']
})
export class ExplorerViewComponent implements OnInit {
  panelOpenState = false;
  @Input() platforms: FaaSPlatform[];
  @Input() selectedPlatformId: string;
  @Input() selectedPlatform: FaaSPlatform;

  constructor() {
  }

  ngOnInit() {
  }

}

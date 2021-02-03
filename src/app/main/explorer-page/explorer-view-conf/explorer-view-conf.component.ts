import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FaaSPlatform} from '../../../models/core/faas-platform.model';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-explorer-view-config',
  templateUrl: 'explorer-view-conf.component.html',
  styleUrls: ['explorer-view-conf.component.scss']
})
export class ExplorerViewConfComponent implements OnInit {
  panelOpenState = false;
  @Input() platforms: FaaSPlatform[];
  @Input() selectedPlatformId: string;
  @Input() selectedPlatform: FaaSPlatform;
  @Output() selectedEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  emitPlatformChangeEvent($event: MatSelectChange) {
    this.selectedEvent.emit($event.value);
  }
}

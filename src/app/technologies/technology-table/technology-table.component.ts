import {Component, Input, OnInit} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';

@Component({
  selector: 'app-technology-table',
  templateUrl: './technology-table.component.html',
  styleUrls: ['./technology-table.component.scss']
})
export class TechnologyTableComponent implements OnInit {
  @Input() dataSource: TechnologyDataSource;

  constructor() {
  }

  ngOnInit(): void {
  }

}

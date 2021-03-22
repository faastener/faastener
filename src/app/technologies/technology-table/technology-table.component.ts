import {Component, Input, OnInit} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-technology-table',
  templateUrl: './technology-table.component.html',
  styleUrls: ['./technology-table.component.scss']
})
export class TechnologyTableComponent implements OnInit {
  @Input() dataSource: TechnologyDataSource;
  @Input() framework: ClassificationFramework;
  @Input() filterConfiguration: TechnologyFilterConfiguration;
  @Input() sidenav: MatSidenav;


  constructor() {
  }

  ngOnInit(): void {
  }

}

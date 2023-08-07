import {Component, Input, OnInit} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit {
  @Input() dataSource!: TechnologyDataSource;
  pageSizeOptions: number[] = [5, 10];

  constructor() {
  }

  onNameChange(name: string) {
    this.dataSource.queryByName(name);
    this.dataSource.fetch({pageIndex: 0, length: this.dataSource.totalInputSize, pageSize: this.dataSource.pageSize});
  }

  ngOnInit(): void {
  }
}


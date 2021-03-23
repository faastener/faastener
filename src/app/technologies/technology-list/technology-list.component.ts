import {Component, Input} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent {
  @Input() dataSource: TechnologyDataSource;
  readMore: Map<string, boolean> = new Map<string, boolean>();

  constructor() {
  }

  onNameChange(name: string) {
    this.dataSource.queryByName(name);
    this.dataSource.fetch({pageIndex: 0, length: this.dataSource.totalInputSize, pageSize: this.dataSource.pageSize});
  }
}

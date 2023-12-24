import {Component, Input, OnInit} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit {
  @Input() dataSource!: TechnologyDataSource;
  pageSizeOptions: number[] = [5, 10];

  constructor(private route: ActivatedRoute) {
  }

  onNameChange(name: string) {
    this.dataSource.queryByName([name]);
    this.dataSource.fetch({pageIndex: 0, length: this.dataSource.totalInputSize, pageSize: this.dataSource.pageSize});
  }

  onNamesChange(names: string[]) {
    this.dataSource.queryByName(names);
    this.dataSource.fetch({pageIndex: 0, length: this.dataSource.totalInputSize, pageSize: this.dataSource.pageSize});
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has("id")) {
      this.onNamesChange(this.route.snapshot.queryParamMap.getAll("id"));
    }
  }
}


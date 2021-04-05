import {Component, Input, OnInit} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';
import {ClassificationFramework, CriteriaGrouping} from '../../shared/interfaces/classification';
import {TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';
import {MatSidenav} from '@angular/material/sidenav';

export class TableColumn {
  id: string;
  displayName: string;
  colSpan?: number;
  color?: string;
}

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

  displayableColumns: TableColumn[];
  columnsToDisplay = ['platformName'];

  constructor() {
  }

  ngOnInit(): void {

    this.framework.viewCombinations.forEach(viewComb => {
        if (viewComb.default) {
          let columns = [];

          viewComb.views.forEach(view => {
              view.groupings.forEach(grouping => {
                this.generateGroupingColumns(grouping, columns);
              });
            }
          );

          this.displayableColumns = columns;
        }
      }
    );

    console.log(this.displayableColumns);
  }

  private generateGroupingColumns(grouping: CriteriaGrouping, columns: TableColumn[], parentGroupingName?: string) {
    let counter = 0;
    grouping.criteria.forEach(c => {
      columns.push({
        id: c.id,
        displayName: c.name
      } as TableColumn);
      this.columnsToDisplay.push(c.id);
      counter += 1;
    });
    if (counter > 0) {
      let name = parentGroupingName ? parentGroupingName.concat('.').concat(grouping.name) : grouping.name;
      columns.push({
        id: grouping.id,
        displayName: name,
        colSpan: counter
      } as TableColumn);
      this.columnsToDisplay.push(grouping.id);
    }
    if (grouping.groupings) {
      grouping.groupings.forEach(g => this.generateGroupingColumns(g, columns, grouping.name));
    }
  }

}

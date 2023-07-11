import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';
import {ClassificationFramework, CriteriaGrouping, CriterionInstance, CriterionValue} from '../../shared/interfaces/classification';
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

  @ViewChild('content') tableContainer: ElementRef;

  criteriaColumns: TableColumn[] = [];
  groupingColumns: TableColumn[] = [];
  groupingColumnIds: string[] = ['techNameHeader'];

  columnsToDisplay = ['techName'];


  constructor() {
  }

  ngOnInit(): void {
    this.framework.frameworkViews.forEach(view => {
      const groupingColumns: TableColumn[] = [];
      Array.from(view.criteriaGroupings).forEach((grouping, index) => {
        const color = index % 2 === 0 ? '#ccc' : 'white';
        this.generateGroupingColumns(grouping, groupingColumns, color);
      });
      if (groupingColumns.length > 0) {
        this.groupingColumns.push(...groupingColumns);
        let viewColspan = 0;
        groupingColumns.forEach(c => {
          if (c.colSpan) {
            viewColspan += c.colSpan;
          }
        });
      }
    });
  }

  private generateGroupingColumns(grouping: CriteriaGrouping, groupingColumns: TableColumn[], color: string, parentGroupingName?: string) {
    let counter = 0;

    if (grouping.criteria) {
      grouping.criteria.forEach((c, index) => {
        this.criteriaColumns.push({
          id: c.id,
          displayName: c.name,
          color
        } as TableColumn);
        this.columnsToDisplay.push(c.id);
        counter += 1;
      });
    }

    if (counter > 0) {
      const name = parentGroupingName ? parentGroupingName.concat('.').concat(grouping.name) : grouping.name;
      groupingColumns.push({
        id: grouping.id,
        displayName: name,
        color,
        colSpan: counter
      } as TableColumn);
      this.groupingColumnIds.push(grouping.id);
    }
    if (grouping.criteriaGroupings) {
      grouping.criteriaGroupings.forEach(g => this.generateGroupingColumns(g, groupingColumns, color, grouping.name));
    }
  }

  scrollLeft() {
    this.tableContainer.nativeElement.scrollLeft -= 150;
  }

  scrollRight() {
    this.tableContainer.nativeElement.scrollLeft += 150;
  }

  findValues(criteriaInstances: Set<CriterionInstance>, criterionId: string): Set<CriterionValue> {
    for(let ci of criteriaInstances) {
      if(ci.typeId === criterionId) {
        return ci.values;
      }
    }
    return undefined;
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {TechnologyDataSource} from '../../shared/datasource';
import {Observable} from 'rxjs';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetFilterComponent} from '../bottom-sheet-filter/bottom-sheet-filter.component';

@Component({
  selector: 'app-technology-table',
  templateUrl: './technology-table.component.html',
  styleUrls: ['./technology-table.component.scss']
})
export class TechnologyTableComponent implements OnInit {
  @Input() dataSource: TechnologyDataSource;
  @Input() framework: ClassificationFramework;
  @Input() filterConfiguration: TechnologyFilterConfiguration;

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetFilterComponent, {
      data: this.filterConfiguration,
    });
  }
  ngOnInit(): void {
  }

}

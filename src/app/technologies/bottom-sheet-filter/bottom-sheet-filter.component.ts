import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';

@Component({
  selector: 'app-bottom-sheet-filter',
  templateUrl: './bottom-sheet-filter.component.html',
  styleUrls: ['./bottom-sheet-filter.component.scss']
})
export class BottomSheetFilterComponent implements OnInit {
  showLoader = true;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public filterConfiguration: TechnologyFilterConfiguration,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetFilterComponent>
  ) {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(): void {
  }

}

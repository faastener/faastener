import {Component, OnInit} from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Observable} from 'rxjs';
import {TechnologyDossier} from '../shared/interfaces/dossier';
import {AppConfigService} from '../core/services/app-config.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dossiers$: Observable<TechnologyDossier[]>;

  constructor(private dataService: DataService, private configService: AppConfigService) {
  }

  ngOnInit(): void {
    this.dossiers$ = this.dataService.getDossiersForTechnologyType(this.configService.defaultTechCategory, false);
  }

}

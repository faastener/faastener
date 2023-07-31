import {Component, OnInit} from '@angular/core';
import {AbstractDataService} from '../core/services/abstract-data.service';
import {EMPTY, Observable} from 'rxjs';
import {Technology} from '../shared/interfaces/technology';
import {ConfigurationService} from '../core/services/configuration.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  technologies$: Observable<Technology[]> = EMPTY;

  constructor(private dataService: AbstractDataService, private configService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.technologies$ = this.dataService.getTechnologiesOfType(this.configService.defaultTechnologyType);
  }

}

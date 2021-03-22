import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Subscription} from 'rxjs';
import {Technology} from '../shared/interfaces/technology';
import {ActivatedRoute} from '@angular/router';
import {TechnologyDataSource} from '../shared/datasource';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {TechnologyFilterConfiguration} from '../shared/interfaces/filtering';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnologiesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  technologies: Technology[];
  framework: ClassificationFramework;
  filterConfiguration: TechnologyFilterConfiguration;
  dataSource: TechnologyDataSource;
  browsingMode: string = 'explore';

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data.subscribe(data => {
        this.technologies = data['resolvedData'][0];
        this.dataSource = new TechnologyDataSource(this.technologies, {property: 'platformName', order: 'asc'}, undefined);

        this.framework = data['resolvedData'][1];
        this.filterConfiguration = data['resolvedData'][2];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Subscription} from 'rxjs';
import {Technology} from '../shared/interfaces/technology';
import {ActivatedRoute} from '@angular/router';
import {TechnologyDataSource} from '../shared/datasource';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {
  CriterionFilterConfiguration,
  RenderedFilter,
  RenderedFilterBlock,
  TechnologyFilterConfiguration
} from '../shared/interfaces/filtering';
import {MatSidenav} from '@angular/material/sidenav';
import {CriteriaGroupingResponse} from '../shared/interfaces/responses';

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
  rawGroupingsData: CriteriaGroupingResponse[];
  filterConfiguration: TechnologyFilterConfiguration;
  dataSource: TechnologyDataSource;
  browsingMode: string = 'explore';

  renderedFilter: RenderedFilter = {blocks: []};

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        const mode = params['browsingMode'];
        if (mode) {
          this.browsingMode = mode;
        }
      })
    );

    this.subscriptions.push(
      this.route.data.subscribe(data => {
        this.technologies = data['resolvedData'][0];
        this.dataSource = new TechnologyDataSource(this.technologies, {property: 'platformName', order: 'asc'}, undefined);
        this.framework = data['resolvedData'][1];
        this.filterConfiguration = data['resolvedData'][2];
        this.rawGroupingsData = data['resolvedData'][3];

        this.buildFilter();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  private buildFilter(): void {
    const criteriaFilterLookup = new Map(this.filterConfiguration.filters.map(c => [c.criterionId, c] as [string, CriterionFilterConfiguration]));

    this.rawGroupingsData.forEach(g => {
      let temp: RenderedFilterBlock = {
        blockName: g.name,
        filters: []
      };

      if (g.criteriaIds) {
        g.criteriaIds.forEach(id => {
          const r = criteriaFilterLookup.get(id);
          if (r) {
            temp.filters.push(r);
          }
        });
      }
      if (temp.filters.length > 0) {
        this.renderedFilter.blocks.push(temp);
      }
    });

    console.log(this.renderedFilter);

  }


}

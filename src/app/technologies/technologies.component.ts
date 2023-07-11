import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Subscription} from 'rxjs';
import {TechnologyDossier, TechnologyInfo} from '../shared/interfaces/dossier';
import {ActivatedRoute} from '@angular/router';
import {TechnologyDataSource} from '../shared/datasource';
import {ClassificationFramework, CriteriaGrouping} from '../shared/interfaces/classification';
import {
  CriteriaBasedQuery,
  CriterionFilterConfiguration,
  RenderedFilterBlock,
  TechnologyFilterConfiguration
} from '../shared/interfaces/filtering';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {UntypedFormBuilder} from '@angular/forms';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnologiesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  technologies: TechnologyDossier[];
  framework: ClassificationFramework;
  filterConfiguration: TechnologyFilterConfiguration;
  groupings: CriteriaGrouping[] = [];

  dataSource: TechnologyDataSource;
  browsingMode = 'explore';

  renderedFilter: RenderedFilterBlock[] = [];

  @ViewChild('sidenav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this.mobileQuery.addEventListener('change', () => changeDetectorRef.detectChanges());
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        const mode = params.browsingMode;
        if (mode) {
          this.browsingMode = mode;
        }
      })
    );

    this.subscriptions.push(
      this.route.data.subscribe(data => {
        this.technologies = data.resolvedData[0];
        this.dataSource = new TechnologyDataSource(this.technologies, {property: 'technologyName', order: 'asc'}, {});
        this.framework = data.resolvedData[1];
        this.filterConfiguration = data.resolvedData[2];
        this.extractGroupings();
        this.generateFilterStructure();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private extractGroupings() {
    this.framework.frameworkViews.forEach(v => this.groupings.push(...Array.from(v.criteriaGroupings)));
  }

  private generateFilterStructure() {
    const criteriaFilterLookup = new Map(this.filterConfiguration.filters.map(c => [c.criterionTypeId, c] as [string, CriterionFilterConfiguration]));
    const placement: Map<String, RenderedFilterBlock> = new Map<String, RenderedFilterBlock>();
    this.groupings.forEach(g => this.populateRenderBlocks(g, criteriaFilterLookup, placement));
    this.renderedFilter = Array.from(placement.values());
  }

  private populateRenderBlocks(grouping: CriteriaGrouping, filterLookup: Map<string, CriterionFilterConfiguration>, placement: Map<String, RenderedFilterBlock>, parentGroup?: string) {
    let current = placement.get(grouping.name);

    if (current === undefined /*&& grouping.criteria && grouping.criteria.size > 0*/) {
      placement.set(grouping.name, {blockName: parentGroup ? parentGroup.concat(' : ').concat(grouping.name) : grouping.name, filters: []});
      current = placement.get(grouping.name);
    }

    if (grouping.criteria && current) {
      grouping.criteria.forEach(c => {
        const config = filterLookup.get(c.id);
        if (config) {
          current.filters.push(config);
        }
      });
    }

    if (grouping.criteriaGroupings) {
      grouping.criteriaGroupings.forEach(g => this.populateRenderBlocks(g, filterLookup, placement, grouping.name));
    }
  }

  onQueryUpdate($event: CriteriaBasedQuery) {
    this.dataSource.queryByCriteria($event);
  }
}

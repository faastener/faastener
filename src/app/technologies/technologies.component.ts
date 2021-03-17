import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Subscription} from 'rxjs';
import {Technology} from '../shared/interfaces/technology';
import {ActivatedRoute} from '@angular/router';
import {TechnologyDataSource} from '../shared/datasource';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnologiesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  technologies: Technology[];
  dataSource: TechnologyDataSource;
  browsingMode: string = 'list';

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.technologies = data['resolvedData'];
      this.dataSource = new TechnologyDataSource(this.technologies, {property: 'platformName', order: 'asc'}, undefined);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

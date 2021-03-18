import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {Observable, Subscription} from 'rxjs';
import {Technology} from '../../shared/interfaces/technology';
import {ViewportScroller} from '@angular/common';
import {ClassificationFramework, ClassificationViewCombination} from '../../shared/interfaces/classification';

@Component({
  selector: 'app-technology-details',
  templateUrl: './technology-details.component.html',
  styleUrls: ['./technology-details.component.scss']
})
export class TechnologyDetailsComponent implements OnInit, OnDestroy {
  private readonly defaultFrameworkId = 'fw-faas';
  private subscriptions: Subscription[] = [];

  framework: ClassificationFramework;
  platform$: Observable<Technology>;
  selectedViewCombination: ClassificationViewCombination;

  constructor(private route: ActivatedRoute, private dataService: DataService, private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const id: string = params.get('platformId');
        const type: string = params.get('type');
        console.log(type);

        this.platform$ = this.dataService.getTechnology(id, true);
      })
    );

    this.subscriptions.push(
      this.dataService.getFramework(this.defaultFrameworkId)
        .subscribe(
          data => {
            this.framework = data;
            data.viewCombinations.forEach(vc => vc.default ? this.selectedViewCombination = vc : false);
          },
          error => console.error(error)
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onScrollToTop(platformId: string) {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(platformId);
    }, 50);
  }
}

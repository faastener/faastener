import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {InfoResourceSection} from '../../shared/interfaces/info';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  resources: InfoResourceSection[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.resources = data['resolvedData'];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import {Component, OnInit} from '@angular/core';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss']
})
export class FrameworkComponent implements OnInit {
  framework: ClassificationFramework;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.framework = data.resolvedData;
    });
  }
}

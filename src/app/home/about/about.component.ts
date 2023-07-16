import {Component} from '@angular/core';

import {faBook} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'faastener-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  faBook = faBook;

  constructor() {
  }
}

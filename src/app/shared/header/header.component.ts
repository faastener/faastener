import {Component} from '@angular/core';

import {faGithub} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'faastener-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faGithub = faGithub;

  constructor() {
  }
}

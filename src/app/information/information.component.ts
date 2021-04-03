import {Component} from '@angular/core';
import {ClassificationFramework} from '../shared/interfaces/classification';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  readonly navLinks = [
    {location: 'framework', label: 'Framework', icon: 'menu_book'},
    {location: 'docs', label: 'Docs', icon: 'cloud_done'},
    {location: 'resources', label: 'Resources', icon: 'library_books'},
    {location: 'faq', label: 'FAQ', icon: 'question_answer'}
  ];
  framework: ClassificationFramework;

  constructor() {
  }
}

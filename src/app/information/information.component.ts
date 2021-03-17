import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../core/services/data.service';
import {Observable} from 'rxjs';
import {Technology} from '../shared/interfaces/technology';
import {ClassificationFramework} from '../shared/interfaces/classification';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  navLinks = [
    {location: './framework', label: 'Framework', icon: 'menu_book'},
    {location: './docs', label: 'Docs', icon: 'cloud_done'},
    {location: './resources', label: 'Resources', icon: 'library_books'},
    {location: './faq', label: 'FAQ', icon: 'question_answer'}
  ];

  constructor(private dataService: DataService) {
  }

  private frameworks$: Observable<ClassificationFramework> = this.dataService.getFramework("framework:faas");

}

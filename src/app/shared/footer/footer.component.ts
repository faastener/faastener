import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'faastener-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}

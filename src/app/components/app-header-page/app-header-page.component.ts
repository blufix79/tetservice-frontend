import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './app-header-page.component.html',
  styleUrls: ['./app-header-page.component.scss']
})
export class AppHeaderPageComponent implements OnInit {
  @Input() titlePage: string = 'Page';
  @Input() breadCrumbPage: string = 'Page';
  @Input() iconPage: string = 'fas fa-file-alt';

  get title(){ return this.titlePage; }
  get breadCrumb(){ return this.breadCrumbPage; }
  get icon(){ return this.iconPage; }

  constructor() { }

  ngOnInit() {
  }

}

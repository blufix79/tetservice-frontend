import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-page',
  templateUrl: './app-header-page.component.html',
  styleUrls: ['./app-header-page.component.scss']
})
export class AppHeaderPageComponent implements OnInit {
  @Input() titlePage: string = 'Page';
  @Input() breadCrumbPage: string;
  @Input() iconPage: string = 'fas fa-file-alt';

  get title() {
    return this.titlePage;
  }
  get breadCrumb() {
    return this.breadCrumbPage;
  }

  get icon() {
    return this.iconPage;
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
}

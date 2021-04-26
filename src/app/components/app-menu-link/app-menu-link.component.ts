import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-link',
  templateUrl: './app-menu-link.component.html',
  styleUrls: ['./app-menu-link.component.scss']
})
export class AppMenuLinkComponent implements OnInit {
  @Input() link: string;
  @Input() icon: string;


  constructor() {

  }

  ngOnInit() {
  }

}

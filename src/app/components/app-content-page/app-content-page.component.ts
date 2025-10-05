import { AppService } from 'src/app/utils/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-page',
  templateUrl: './app-content-page.component.html',
  styleUrls: ['./app-content-page.component.scss']
})
export class AppContentPageComponent implements OnInit {
  disableLoader: Boolean;
  constructor(private appService: AppService) {
    this.disableLoader = appService.loader.disable;
  }

  ngOnInit() {}
}

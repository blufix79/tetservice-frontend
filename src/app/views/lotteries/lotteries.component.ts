import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lottery } from 'src/app/models/lottery.model';
import { LotteriesService } from 'src/app/shared-services/lotteries.service';

@Component({
  selector: 'app-lotteries',
  templateUrl: './lotteries.component.html',
  styleUrls: ['./lotteries.component.scss']
})
export class LotteriesComponent implements OnInit {
  lotteries: Observable<Lottery>;

  constructor(private lotteriesService: LotteriesService) {
    this.lotteries = lotteriesService.getLotteries();
  }

  ngOnInit() {
  }

}

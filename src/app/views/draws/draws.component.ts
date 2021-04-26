import { LotteriesService } from './../../shared-services/lotteries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DrawsService } from './draws.service';

@Component({
  selector: 'app-draws',
  templateUrl: './draws.component.html',
  styleUrls: ['./draws.component.scss']
})
export class DrawsComponent implements OnInit {

  draws;
  lotteries;
  idLottery: string;

  constructor(
    private drawsService: DrawsService,
    private LotteriesService: LotteriesService,
    private route: ActivatedRoute,
    private router: Router) {
    this.lotteries = LotteriesService.getLotteries();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.idLottery = params.idLottery);
    this.draws = this.drawsService.getDraws(this.idLottery);
  }

  filterLotteries(e) {
    // const navigationExtras: NavigationExtras = {
    //   queryParams: { lotteryId: e.target.value }
    // };
    // this.router.navigate(['draws', e.target.value]);
    this.draws = this.drawsService.getDraws(e.target.value);
  }

}

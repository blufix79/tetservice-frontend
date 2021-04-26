import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lottery } from '../models/lottery.model';

@Injectable({
  providedIn: 'root'
})
export class LotteriesService {

  params = new URLSearchParams();

  constructor(private http: HttpClient) { }


  getLotteries() {
    return this.http.get<Lottery>('admin_lotteries');
  }
  getLotteryById(idLottery, callback: (data: Lottery) => void) {
    // return this.getLotteries().pipe(
    //     map(data => data.filter(l => {
    //       return l.id == idLottery
    //     }))
    //   )
    //   .subscribe(res => {
    //     callback(res[0]);
    //   });
  }
  getClassWin(idLottery) {
    return this.http.get('admin_lotterieswinclass?idLottery=' + idLottery);
  }
  storeClassWin(classWin){
    let body = {
      classes : classWin
    }
    return this.http.post('admin_lotterieswinclass', body);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Draw } from 'src/app/models/draw.model';
import { DrawPrizes } from 'src/app/models/drawPrizes.model';

@Injectable({
  providedIn: 'root'
})
export class DrawsService {

  constructor(private http: HttpClient) { }

  getDraws(idLottery = null) {
    let url = 'admin_draws';
    if (idLottery != null) {
      url = 'admin_draws?action=draws&idLottery=' + idLottery;
    }
    return this.http.get<Draw[]>(url);
  }

  getDrawById(idDraw) {
    return this.http.get<Draw>('admin_draws?action=drawById&idDraw=' + idDraw);
  }

  storeDraw(draw) {
    let body = {
      action: 'draw',
      draw: draw
    }
    return this.http.post('draw', body);
  }

  getPrizes(idDraw) {
    return this.http.get<DrawPrizes[]>('admin_draws?action=prizes&idDraw=' + idDraw);
  }

  storePrizes(prizes) {
    return this.http.post('draw', prizes);
  }
}

import { BaseEntity } from "./baseEntity.model";

export class DrawPrizes extends BaseEntity {
  id_draw;
  id_class;
  total_winners;
  amount;
  id_lottery_country;
  id_currency;
}

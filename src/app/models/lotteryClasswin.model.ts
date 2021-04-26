import { BaseEntity } from "./baseEntity.model";

export class LotteryClasswin extends BaseEntity{
  id_lottery: number;
  name: string;
  numbers_qty: number;
  bonus_qty: number;
  others_qty: number;
}

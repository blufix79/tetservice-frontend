import { BaseEntity } from "./baseEntity.model";
import { DrawNumber } from "./drawnumbers.model";

export class Draw extends BaseEntity {
  idLottery;
  data;
  numberDraw;
  jackpotAmount;
  numbers: Array<DrawNumber>;
}

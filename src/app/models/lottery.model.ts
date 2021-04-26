import { BaseEntity } from "./baseEntity.model";

export class Lottery extends BaseEntity {
  lottery_name;
  reference;
  numbers_qty;
  bonus_qty;
  other_qty;
  draw_to_week;
  draw_time;
  range_numbers;
  range_bonus;
  range_other;
  lottery_acronym;
  number_draw;
  bonus_draw;
  other_draw;
  name_bonus;
  name_other;
  choice_country_played;
  id_default_country;
  is_coming;
  active;
  id_lottery_type;
  bonus_is_chosen;
  bonus_is_assigned_auto;
  other_is_chosen;
  other_is_assigned_auto;
}

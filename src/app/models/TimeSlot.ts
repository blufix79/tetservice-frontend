import { Intervention } from 'src/app/models/Intervention';
import { Time } from '@angular/common';

export interface TimeSlot {
  id: number;
  start: Time;
  end: Time;
  available?: boolean;
  intervention?: Intervention;
}

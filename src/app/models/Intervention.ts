import { TimeSlot } from 'src/app/models/TimeSlot';
import { Contract } from './Contracts';
import { Repairer } from './Repairer';
import { Customer } from './Customer';
import { RepairType } from './RepairType';
import { Product } from './Product';
export interface Intervention {
  id: number;
  titolo: string;
  descrizione: string;
  note: string;
  data: string;
  garanzia: boolean;
  products: Product[];
  repair_types: RepairType[];
  customer_id: number;
  repairer_id: number;
  state_id: number;
  slot_id: number;
  customer: Customer;
  repairer: Repairer;
  contract: Contract;
  timeslots: TimeSlot;
}

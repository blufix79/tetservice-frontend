import { Contract } from './Contracts';
import { Intervention } from './Intervention';
import { City } from './City';
export interface Customer {
  id: number;
  nome: string;
  cognome: string;
  city_id: number;
  indirizzo: string;
  telefono: string;
  cellulare: string;
  city: City;
  interventions: Intervention[];
  contracts: Contract[];
}

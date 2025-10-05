import { Intervention } from 'src/app/models/Intervention';
export interface Repairer {
  id: number;
  nome: string;
  cognome: string;
  interventions: Intervention[];
}

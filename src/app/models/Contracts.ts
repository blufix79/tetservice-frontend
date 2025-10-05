import { Product } from './Product';
export interface Contract {
  id: number;
  data: string;
  descrizione: string;
  scadenza: string;
  customer_id: number;
  products: Product[];
  attivo: boolean;
}

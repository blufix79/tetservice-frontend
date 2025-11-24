import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../../models/Contracts';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  constructor(private http: HttpClient) {}

  get(
    filter: string = null,
    value: string = null,
    order?: string
  ): Observable<Contract[]> {
    if (filter == null) {
      return this.http.get<Contract[]>('contracts');
    }

    let params = new HttpParams();
    if (filter) {
      params = params.set('filter', filter);
      params = params.append('value', value);
    }
    if (order) {
      params = params.append('order', order);
    }

    return this.http.get<Contract[]>('contracts', {
      params: params
    });
  }

  new(customer: Contract) {
    return this.http.post('contracts', customer);
  }

  update(customer: Contract) {
    return this.http.patch('contracts/' + customer.id, customer);
  }

  delete(id: number) {
    return this.http.delete('contracts/' + id);
  }
}

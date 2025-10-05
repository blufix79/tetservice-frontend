import { Customer } from './../../models/Customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private http: HttpClient) {}
  get(): Observable<Customer[]> {
    return this.http.get<Customer[]>('customers');
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>('customers/' + id);
  }

  search(keyword: string): Observable<Customer[]> {
    return this.http.get<Customer[]>('customers?search=' + keyword);
  }

  new(customer: Customer) {
    return this.http.post('customers', customer);
  }

  update(customer: Customer) {
    return this.http.patch('customers/' + customer.id, customer);
  }

  delete(id: number) {
    return this.http.delete('customers/' + id);
  }
}

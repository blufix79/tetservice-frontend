import { Product } from './../../models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<Product[]>('products');
  }

  new(product: Product) {
    return this.http.post('products', product);
  }

  update(product: Product) {
    return this.http.patch('products/' + product.id, product);
  }

  delete(id: number) {
    return this.http.delete('products/' + id);
  }
}

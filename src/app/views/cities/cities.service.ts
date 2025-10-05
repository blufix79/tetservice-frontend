import { Observable } from 'rxjs';
import { City } from '../../models/City';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('cities');
  }

  new(city: City) {
    return this.http.post('cities', city);
  }

  update(city: City) {
    return this.http.patch('cities/' + city.id, city);
  }

  delete(id: number) {
    return this.http.delete('cities/' + id);
  }
}

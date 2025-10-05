import { Observable } from 'rxjs';
import { State } from '../../models/State';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  constructor(private http: HttpClient) {}

  get(): Observable<State[]> {
    return this.http.get<State[]>('states');
  }

  new(state: State) {
    return this.http.post('states', state);
  }

  update(state: State) {
    return this.http.patch('states/' + state.id, state);
  }

  delete(id: number) {
    return this.http.delete('states/' + id);
  }
}

import { Configuration } from './../../models/Configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(private http: HttpClient) { }


  get(id: string = null): Observable<Configuration[]> {
    if (id == null) {
      return this.http.get<Configuration[]>('configurations');
    }
    return this.http.get<Configuration[]>('configurations/' + id);
  }

  new(configuration: Configuration) {
    return this.http.post('configurations', configuration);
  }

  update(configuration: Configuration) {
    return this.http.patch('configurations/' + configuration.id, configuration);
  }

  delete(id: number) {
    return this.http.delete('configurations/' + id);
  }
}

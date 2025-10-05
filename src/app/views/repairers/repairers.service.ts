import { Repairer } from '../../models/Repairer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepairersService {
  constructor(private http: HttpClient) {}

  get(): Observable<Repairer[]> {
    return this.http.get<Repairer[]>('repairers');
  }

  getRepairer(
    id: number,
    filter: string = null,
    value: string = null
  ): Observable<Repairer> {
    if (filter) {
      return this.http.get<Repairer>(
        'repairers/' + id + '?filter=dateIntervention&value=' + value
      );
    }
    return this.http.get<Repairer>('repairers/' + id);
  }

  new(repairer: Repairer) {
    return this.http.post('repairers', repairer);
  }

  update(repairer: Repairer) {
    return this.http.patch('repairers/' + repairer.id, repairer);
  }

  delete(id: number) {
    return this.http.delete('repairers/' + id);
  }
}

import { Intervention } from './../../models/Intervention';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {
  constructor(private http: HttpClient) {}
  get(filter: string = null, value: string = null): Observable<Intervention[]> {
    if (filter == null) {
      return this.http.get<Intervention[]>('interventions');
    } else {
      return this.http.get<Intervention[]>(
        'interventions?filter=' + filter + '&value=' + value
      );
    }
  }

  getIntervention(id: string): Observable<Intervention> {
    return this.http.get<Intervention>('interventions/' + id);
  }

  getInterventionsRepairerDay(
    repairerId: any,
    date: string
  ): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(
      'interventions?filter=repairerDay&value=' +
        date +
        '&repairer_id=' +
        repairerId
    );
  }

  new(intervention: Intervention) {
    return this.http.post('interventions', intervention);
  }

  update(intervention: Intervention) {
    return this.http.patch('interventions/' + intervention.id, intervention);
  }

  delete(id: number) {
    return this.http.delete('interventions/' + id);
  }
}

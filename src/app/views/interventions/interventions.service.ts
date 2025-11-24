import { Intervention } from './../../models/Intervention';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService {
  constructor(private http: HttpClient) {}
  get(
    filter: string = null,
    value: string = null,
    orderField?: string,
    orderDirection?: string,
    from?: string,
    to?: string
  ): Observable<Intervention[]> {
    // if (filter == null) {
    //   return this.http.get<Intervention[]>('interventions');
    // }

    let params = new HttpParams();
    if (filter) {
      params = params.set('filter', filter);
      if (filter === 'rangeDate') {
        if (from) {
          params = params.append('from', from);
        }
        if (to) {
          params = params.append('to', to);
        }
      } else {
        params = params.append('to', value);
      }
    }
    if (orderField) {
      params = params.append('orderField', orderField);
    }
    if (orderDirection) {
      params = params.append('orderDirection', orderDirection);
    }

    return this.http.get<Intervention[]>('interventions', {
      params
    });
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

import { Repairer } from './../../models/Repairer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeSlot } from 'src/app/models/TimeSlot';

@Injectable({
  providedIn: 'root'
})
export class TimeslotsService {
  constructor(private http: HttpClient) {}

  get(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>('timeslots');
  }

  getTimeSlotsAvailable(
    repairerId: number,
    date: Date
  ): Observable<TimeSlot[]> {
    let params = new HttpParams()
      .set('repairerId', repairerId.toString())
      .set('date', date.toString());

    return this.http.get<TimeSlot[]>('timeslots', { params: params });
  }
}

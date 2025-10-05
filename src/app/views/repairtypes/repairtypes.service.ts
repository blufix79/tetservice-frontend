import { RepairType } from './../../models/RepairType';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairtypesService {
  constructor(private http: HttpClient) { }
  get(): Observable<RepairType[]> {
    return this.http.get<[]>('repairtypes');
  }

  new(intervention: RepairType) {
    return this.http.post('repairtypes', intervention);
  }

  update(intervention: RepairType) {
    return this.http.patch('repairtypes/' + intervention.id, intervention);
  }

  delete(id: number) {
    return this.http.delete('repairtypes/' + id);
  }
}

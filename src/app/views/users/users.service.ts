import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>('admin_users');
  }

  deleteUser(idUser: number) {
    return this.http.delete(`admin_users?id=${idUser}`);
  }
}

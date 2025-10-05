import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  public user: any = null;

  isLogged: boolean = false;
  errorHandler;
  loader = {
    disable: false
  };

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {}

  login(user: User): Observable<any> {
    return this.http.post('auth/login', user).pipe(
      map((response: any) => {
        if (response.access_token) {
          this.user = {
            firstName: null,
            lastName: null,
            image: null,
            token: response.access_token
          };

          // eslint-disable-next-line no-undef
          localStorage.setItem('user', this.user);
          this.getUserInformation();
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getProfile() {
    try {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user == null) {
        throw new Error('Not logged');
      }
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  getUserInformation() {
    this.http.get('auth/me').subscribe((user: User) => {
      this.user = {
        firstName: user.nome,
        lastName: user.cognome,
        image: 'assets/img/user2-160x160.jpg',
        token: this.user.token
      };
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  getToken() {
    if (this.user && this.user.token) {
      return this.user.token;
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user) {
        return this.user.token;
      } else {
        return '';
      }
    }
  }

  register() {
    // localStorage.setItem('token', 'LOGGED_IN');
    // this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }
}

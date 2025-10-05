import { User } from '../../models/User';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../../utils/services/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  public token;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      let user: User = this.loginForm.value as User;

      this.appService.login(user).subscribe(
        (response) => {
          if (response == true) {
            this.router.navigate(['/']);
          } else {
            this.toastr.error('Username o Password errati!', 'Errore Login');
          }
        },
        (error) => {
          if (error.status === 401) {
            this.toastr.error('Username o Password errati!', 'Errore Login');
          }
          if (error.status == 500) {
            this.toastr.error(
              'Connessione rifiutata, verificare che MySql sia attivo'
            );
          }
        }
      );
    } else {
      this.toastr.error('Inserire correttamente i dati di login', 'Errore!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}

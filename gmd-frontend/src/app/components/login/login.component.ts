import {Component, inject} from '@angular/core';
import {DenoService} from '../../services/deno.service';
import {FormsModule} from '@angular/forms';
import {LoginRequest} from '../../models/login-request.model';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private denoService = inject(DenoService);
  loginRequest = new LoginRequest('', '');
  token$!: Observable<string>;
  superSecretInfos$!: Observable<string>;
  quote$!: Observable<string>;

  sendLoginRequest() {
    this.token$ = this.denoService.login(this.loginRequest);
  }

  getSuperSecretInfos() {
    this.token$.subscribe((token) => {
      const authorization = 'Bearer ' + token;

      const httpHeaders = new HttpHeaders({
        Authorization: authorization,
      });

      this.superSecretInfos$ =
        this.denoService.getSuperSecretInfos(httpHeaders);
    });
  }

  getQuote() {
    this.token$.subscribe((token) => {
      const authorization = 'Bearer ' + token;

      const httpHeaders = new HttpHeaders({
        Authorization: authorization,
      });

      this.quote$ = this.denoService.getQuote(httpHeaders);
    });
  }

  clearInputs() {
    this.loginRequest.userName = '';
    this.loginRequest.password = '';
    this.token$ = new Observable<string>();
    this.superSecretInfos$ = new Observable<string>();
    this.quote$ = new Observable<string>();
  }
}

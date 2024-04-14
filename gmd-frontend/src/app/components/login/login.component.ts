import {Component, inject} from '@angular/core';
import {DenoService} from '../../services/deno.service';
import {FormsModule} from '@angular/forms';
import {LoginRequest} from '../../models/login-request.model';
import {HttpErrorResponse} from '@angular/common/http';
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
  token = '';
  wrongEmail = false;
  wrongPassword = false;

  sendLoginRequest() {
    this.denoService.login(this.loginRequest).subscribe({
      next: (response) => {
        this.token = response;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.log(error)
            this.wrongPassword = true;
          }
          if (error.status === 404) {
            this.wrongEmail = true;
          }
        }
      },
    });
  }
}

import {Component, inject} from '@angular/core';
import {DenoService} from '../../services/deno.service';
import {FormsModule} from '@angular/forms';
import {LoginRequest} from '../../models/login-request.model';
import {HttpErrorResponse} from '@angular/common/http';
import {AsyncPipe} from '@angular/common';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AsyncPipe, FaIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected readonly faEnvelope = faEnvelope;
  protected readonly faKey = faKey;

  private denoService = inject(DenoService);
  loginRequest = new LoginRequest('', '');
  wrongEmail = false;
  wrongPassword = false;

  sendLoginRequest() {
    this.wrongPassword = false;
    this.wrongEmail = false;

    this.denoService.login(this.loginRequest).subscribe({
      next: (response) => {
        localStorage.setItem('GMD Token', response);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
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

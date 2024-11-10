import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {LoginRequest} from '../../models/login-request.model';
import {HttpErrorResponse} from '@angular/common/http';
import {AsyncPipe} from '@angular/common';
import {faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {LoginResponse} from '../../models/login-response.model';
import {TranslocoPipe} from '@jsverse/transloco';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AsyncPipe, FaIconComponent, TranslocoPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected readonly faEnvelope = faEnvelope;
  protected readonly faKey = faKey;

  private denoService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  loginRequest = new LoginRequest('', '');
  wrongEmail = false;
  wrongPassword = false;

  sendLoginRequest(): void {
    this.wrongPassword = false;
    this.wrongEmail = false;

    this.denoService.login(this.loginRequest).subscribe({
      next: (response: LoginResponse) => {
        sessionStorage.setItem('GMD Token', response.token);
        sessionStorage.setItem('UI User', JSON.stringify(response.uiUser));
        this.router.navigate(['/welcome'], {relativeTo: this.route});
      },
      error: (error: unknown): void => {
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

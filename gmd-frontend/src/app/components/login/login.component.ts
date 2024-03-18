import {Component, inject} from '@angular/core';
import {DenoService} from '../../services/deno.service';
import {FormsModule} from '@angular/forms';
import {LoginRequest} from '../../models/login-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private denoService = inject(DenoService);
  loginRequest = new LoginRequest('', '');
  token = '';

  sendLoginRequest() {
    this.denoService.login(this.loginRequest).subscribe((token) => {
      this.token = token;
    });
  }

  clearInputs() {
    this.loginRequest.userName = '';
    this.loginRequest.password = '';
  }
}

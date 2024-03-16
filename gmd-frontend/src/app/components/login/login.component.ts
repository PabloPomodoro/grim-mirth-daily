import {Component, inject} from '@angular/core';
import {DenoService} from '../../services/deno.service';
import {LoginRequest} from '../../models/loginRequest.model';
import {FormsModule} from '@angular/forms';

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
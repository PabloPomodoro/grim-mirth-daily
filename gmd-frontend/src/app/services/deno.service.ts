import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequest} from '../models/login-request.model';
import {LoginResponse} from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class DenoService {
  private httpClient = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      'http://localhost:8000/auth/login',
      loginRequest,
    );
  }

  logout(): void {
    this.httpClient.post('http://localhost:8000/auth/logout', null).subscribe();
  }

  getTestData() {
    return this.httpClient.get<string>(
      'http://localhost:8000/auth/secret-data',
    );
  }
}

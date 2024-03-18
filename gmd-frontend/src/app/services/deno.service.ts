import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequest} from '../models/login-request.model';

// import {User} from '../models/user.model.ts';

@Injectable({
  providedIn: 'root'
})
export class DenoService {
  private httpClient = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8000/api/login', loginRequest);
  }
}

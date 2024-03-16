import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import {User} from '../models/user.model.ts';
import {LoginRequest} from '../models/loginRequest.model';

@Injectable({
  providedIn: 'root',
})
export class DenoService {
  private httpClient = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<string> {
    return this.httpClient.post<string>('localhost:8000/login', loginRequest);
  }
}

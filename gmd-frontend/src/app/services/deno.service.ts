import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequest} from '../models/login-request.model';

// import {User} from '../models/user.model.ts';

@Injectable({
  providedIn: 'root'
})
export class DenoService {
  private httpClient = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<string> {
    return this.httpClient.post<string>('http://localhost:8000/login', loginRequest);
  }

  getSuperSecretInfos(httpHeaders: HttpHeaders): Observable<string> {
    return this.httpClient.get<string>('http://localhost:8000/login/secret-data', { headers: httpHeaders });
  }

  getQuote(httpHeaders: HttpHeaders): Observable<string> {
    return this.httpClient.get<string>('http://localhost:8000/quote', { headers: httpHeaders });
  }
}

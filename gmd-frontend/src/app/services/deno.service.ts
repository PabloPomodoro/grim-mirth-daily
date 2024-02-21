import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenoService {
  private httpClient = inject(HttpClient);

  getBooks(): Observable<string[]> {
    return this.httpClient.get<string[]>("https://www.gmd-backend.deno.dev/books");
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private apiUrl = 'https://64502244ba9f39c6ab749036.mockapi.io/';

  constructor(private http: HttpClient) {}

  public get(endpoint: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}${endpoint}`)
      .pipe(map((response) => response));
  }

  public post(endpoint: string, data: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}${endpoint}`, data)
      .pipe(map((response) => response));
  }

  public put(endpoint: string, data: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}${endpoint}/${data.id}`, data)
      .pipe(map((response) => response));
  }

  public delete(endpoint: string, id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}${endpoint}/${id}`)
      .pipe(map((response) => response));
  }
}

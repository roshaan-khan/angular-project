import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) { }
  url = 'https://api.escuelajs.co/api/v1/products';

  get<T>(params: string): Observable<T> {
    return this.httpClient.get<T>(this.url + params);
  };

  post<T>(params: string, data: any): Observable<T> {
    return this.httpClient.post<T>(this.url + params, data);
  };

  put<T>(params: string, data: any): Observable<T> {
    return this.httpClient.put<T>(this.url + params, data);
  };

  delete<T>(params: string): Observable<T> {
    return this.httpClient.delete<T>(this.url + params);
  };
  
}

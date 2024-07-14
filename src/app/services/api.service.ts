import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) { }
  url = 'https://fakestoreapi.com/products';
  get<T>(params: string): Observable<T> {
    return this.httpClient.get<T>(this.url + params);
  }
}

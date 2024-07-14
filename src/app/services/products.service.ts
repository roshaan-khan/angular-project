import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly apiService: ApiService) { }

  getProducts(): Observable<Product[]>{
    const products = this.apiService.get('?limit=5');
    return products as Observable<Product[]>;
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly apiService: ApiService) { }

  getProducts(page: number, perPage: number): Observable<Product[]>{
    const products = this.apiService.get(`?offset=${page * perPage - page}&limit=${perPage}`);
    return products as Observable<Product[]>;
  }

  addProduct(product: Product): Observable<Product> {
    return this.apiService.post('', product);
  }

  editProduct(product: Product): Observable<Product> {
    return this.apiService.put(`/${product.id}`, product);
  }

  deleteProduct(id: Product["id"]): Observable<Product> {
    return this.apiService.delete(`/${id}`);
  }
}

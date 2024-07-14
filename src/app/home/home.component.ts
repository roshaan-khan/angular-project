import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private readonly productsService: ProductsService) {}
  products: Product[] = [];
  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      this.products.forEach((product) => product.rating = Math.floor(Math.random() * 5) + 1);
    });
  }
}

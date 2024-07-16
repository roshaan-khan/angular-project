import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private readonly productsService: ProductsService) { }
  products: Product[] = [];
  product: Product = { category: {}, images: [], description: '', id: 0, price: 0, rating: 0, title: '' };
  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.product = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(id: Product["id"]) {
    this.deleteProduct(id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  onConfirmEdit(product: Product) {
    this.editProduct(product);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    product.category = { id: 1, name: 'Electronics' };
    product.images = ['https://via.placeholder.com/150'];
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts(page, perPage).subscribe({
      next: (products) => {
        this.products = products;
        this.products.forEach((product) => product.rating = Math.floor(Math.random() * 5) + 1);
      },
      error: (error) => console.error('Error fetching products', error)
    });
  }

  fetchProduct(id: Product["id"]) {
    this.productsService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => console.error('Error fetching product', error)
    });
  }

  editProduct(product: Product) {
    this.productsService.editProduct(product).subscribe({ 
      next: (product) => {
        console.log('Product edited', product)
        this.products = this.products.map((p) => p.id === product.id ? product : p);
      },
      error: (error) => console.error('Error editing product', error)
    });
  }

  deleteProduct(id: Product["id"]) {
    this.productsService.deleteProduct(id).subscribe({
      next: (product) => {
        console.log('Product deleted', product)
        this.products = this.products.filter((p) => p.id !== product.id);
      },
      error: (error) => console.error('Error deleting product', error)
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product).subscribe({
      next: (product) => {
        console.log('Product added', product)
        this.products.push(product);
      },
      error: (error) => console.error('Error adding product', error)
    });
  }

  ngOnInit() {
    this.fetchProducts(0, 5);
  }
}

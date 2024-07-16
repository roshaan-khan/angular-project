import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}
  @ViewChild('deleteButton') deleteButton!: any;
  @Input() product!: Product;
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }

  onCofirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.el.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    })
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }
}

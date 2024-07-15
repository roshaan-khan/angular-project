import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  @Input() open: boolean = false;
  @Output() confirm = new EventEmitter<Product>()
  @Output() cancel = new EventEmitter<void>()
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    rating: 0,
    images: [],
    category: {}
  }

  onConfirm() {
    this.confirm.emit(this.product);
  }

  onCancel() {
    this.cancel.emit();
    this.open = false;
  }
}

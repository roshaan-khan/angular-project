import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, RatingModule, ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Input() headerTitle: string = '';
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    rating: 0,
    images: [],
    category: {}
  }
  
  @Output() confirm = new EventEmitter<Product>()
  // @Output() cancel = new EventEmitter<void>()

  onConfirm() {
    this.confirm.emit(this.product);
    this.open = false;
    this.openChange.emit(this.open);
  }

  onCancel() {
    // this.cancel.emit();
    this.open = false;
    this.openChange.emit(this.open);
  }
}

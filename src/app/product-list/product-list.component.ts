import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductI } from 'src/interfaces';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent {
  displayedColumns: string[] = ['article', 'title', 'price', 'quantity'];
  @Input() products: ProductI[] = [];
  @Input() isPrimary: boolean = false;

  @Output() pickProductChildren = new EventEmitter<ProductI>();

  onProductClick(product: ProductI) {
    this.pickProductChildren.emit(product);
  }
}

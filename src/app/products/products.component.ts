import { Component, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductI } from 'src/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent {
  products: ProductI[] = [];
  pickedProduct: ProductI = this.products[0];
  similarProducts: ProductI[] = [];
  search: string = '';

  constructor(private apiService: ApiService) {}

  pickPrimaryProduct(product: ProductI) {
    const isPrimary = this.products.find((item) => item.id === product.id);
    if (isPrimary) {
      this.searchSimilar(product.brand.name, product.article);
    }
  }

  pickProduct(product: ProductI) {
    this.pickedProduct = product;
    this.pickPrimaryProduct(product);
  }

  handleSearch() {
    this.apiService.get(`search/${this.search}`).subscribe((response: any) => {
      if (response.details) {
        this.products = response.details;
        this.searchSimilar(
          this.products[0].brand.name,
          this.products[0].article
        );
        this.pickProduct(this.products[0]);
      }
    });
  }

  searchSimilar(name: string, article: string) {
    this.apiService
      .get(`analogs/${name}/${article}`)
      .subscribe((response: any) => {
        this.similarProducts = response;
      });
  }
}

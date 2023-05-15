import { Component, Input, SimpleChanges } from '@angular/core';
import { ProductI } from 'src/interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.sass'],
})
export class ProductInfoComponent {
  @Input() product: ProductI | undefined;
  productDetailsData: any;
  pickedBrand: any;
  brands: any;
  pickedModel: any;
  models: any;
  details: any;
  characteristics: any;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.getProductDetails();
      this.getProductCharacteristics();
    }
  }

  onBrandChange(event: any) {
    this.makeModelsList();
    this.pickedModel = this.models[0];
    this.getDetails();
  }

  onModelChange(event: any) {
    this.getDetails();
  }
  getProductCharacteristics() {
    if (this.product) {
      this.apiService
        .get(
          `https://order24-api.utr.ua/catalog/details/${this.product.id}/characteristics`,
          true
        )
        .subscribe((data: any) => {
          this.characteristics = data;
        });
    }
  }

  getProductDetails() {
    if (this.product) {
      this.apiService
        .get(`applicability/${this.product.id}`)
        .subscribe((data: any) => {
          this.productDetailsData = data;
          this.makeBrandsList();
          this.pickedBrand = this.brands[0];
          this.makeModelsList();
          this.pickedModel = this.models[0];
          this.getDetails();
        });
    }
  }

  makeBrandsList() {
    if (!this.productDetailsData) return;
    this.brands = this.productDetailsData.map((item: any) => item.manufacturer);
  }

  makeModelsList() {
    if (this.productDetailsData && this.pickedBrand) {
      const pickedManufacturer = this.productDetailsData.find(
        (item: any) => item.manufacturer === this.pickedBrand
      );
      this.models = pickedManufacturer.models.map((item: any) => item.model);
    }
  }

  getDetails() {
    if (this.productDetailsData && this.pickedBrand && this.pickedModel) {
      this.details = this.productDetailsData
        .find((item: any) => item.manufacturer === this.pickedBrand)
        .models.find((item: any) => item.model === this.pickedModel)
        .cars.map((item: any) => Object.entries(item));
    }
  }
}

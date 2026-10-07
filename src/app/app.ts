import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Login, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  isLoggedIn = false;

  productId = 0;
  productName = '';
  productPrice = 0;

  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
  }

  onLoginSuccess(): void {

    this.isLoggedIn = true;

    this.productService.getProducts()
      .subscribe((data: Product[]) => {
        this.products.set(data);
      });
  }

  logout(): void {

    this.isLoggedIn = false;

    this.products.set([]);
  }

  addProduct(): void {

    const product: Product = {
      id: this.productId,
      name: this.productName,
      price: this.productPrice
    };

    this.productService.addProduct(product)
      .subscribe((data: Product) => {

        this.products.update(products => [
          ...products,
          data
        ]);

        this.productId = 0;
        this.productName = '';
        this.productPrice = 0;
      });
  }

}

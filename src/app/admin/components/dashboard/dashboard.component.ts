import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteimg;
        this.products.push(element);
      });
      console.log(this.products)
    })
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteimg;
        this.products.push(element);
      });
      console.log(this.products)
    })
  }


 deleteProduct(productId: any) {
  this.adminService.deleteProduct(productId).subscribe({
    next: (res) => {
      if (res.status === 204) { // Handle No Content status
        this.snackBar.open('Product Deleted Successfully', 'Close', {
          duration: 5000
        });
        this.getAllProducts();
      } else {
        this.snackBar.open(res.message || 'Unexpected response', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    },
    error: (error) => {
      this.snackBar.open('Failed to delete product', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
      console.error('Error deleting product:', error);
    }
  });
 }
}



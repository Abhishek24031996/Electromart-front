import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  myOrders: any[];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.customerService.getOrdersByUserId().subscribe(res => {
      this.myOrders = res;
      console.log('Orders:', this.myOrders);  // Log the orders to ensure they are fetched correctly

      // Log each order ID to ensure they are defined
      this.myOrders.forEach(order => {
        console.log('Order ID:', order.id);
      });
    });
  }

}

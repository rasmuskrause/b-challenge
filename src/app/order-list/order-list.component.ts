import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  dateStart: Date;
  dateEnd: Date;
  orders: any;
  customerId: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  // Sum of total_price of items in order at postion index
  totalPriceItem(index) {
    let sum = 0;

    let order = this.orders[index];
    let currency = order.items[0].total_price.currency;
    for (let i = 0; i < order.items.length; i++) {
      if (currency == order.items[i].total_price.currency) {
        // Ignore currencies other than the first.
        sum += parseFloat(order.items[i].total_price.amount);
      }
    }
    return currency + ' ' + sum;
  }

  // Sum of total_price of orders
  totalPrice() {
    let sum = 0;
    if (!this.orders){
      return 0;
    }
    let currency = this.orders[0].charge_customer.currency;
    for (let i = 0; i < this.orders.length; i++) {
      if (currency == this.orders[i].charge_customer.currency) {
        // Ignore currencies other than the first.
        sum += parseFloat(this.orders[i].charge_customer.total_price);
      }
    }
    return currency + ' ' + sum;
  }
  
  // Number of days between dateStart and dateEnd
  dateDiff() {
    if (!this.dateStart || !this.dateEnd) {
      return '';
    }
    let timeDiff =  this.dateEnd.getTime() - this.dateStart.getTime();

    return Math.max(0,Math.ceil(timeDiff / (1000 * 3600 * 24)));
  }
  
  // Query the service
  getOrders() {
    var startTimeString = this.dateStart ? this.dateStart.toISOString() : '';
    var endTimeString = this.dateEnd ? this.dateEnd.toISOString() : '';
    return this.http.get(`https://private-anon-2467ace92c-byrd1.apiary-mock.com/orders/${this.customerId}?start_date=${startTimeString}&end_date=${endTimeString}`);
  }

  ngOnInit() {
    //process query parameters
    this.sub = this.route.params.subscribe(params => {
      this.customerId = decodeURIComponent(params['id']); // (+) converts string 'id' to a number
      if (params['dateStart'] && !isNaN(+params['dateStart'])) {
        this.dateStart = new Date(+params['dateStart']);
      }
      if (params['dateEnd'] && !isNaN(+params['dateEnd'])) {
        this.dateEnd = new Date(+params['dateEnd']);
      }
    });
     
    this.getOrders().subscribe(data => { 
      this.orders = data;
    });
  }
  
  isNaN: Function = Number.isNaN;

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

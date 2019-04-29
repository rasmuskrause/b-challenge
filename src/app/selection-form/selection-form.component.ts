import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css']
})
export class SelectionFormComponent implements OnInit {

  dateStart: Date;
  dateEnd: Date;
  
  values: string[];
  customers: any;
  customerID: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Read persisted date range
    var sT = sessionStorage.getItem('startTime');  
    
    if (sT && !isNaN(+sT)) {
      this.dateStart = new Date(+sT);
    }

    var eT = sessionStorage.getItem('endTime');

    if (eT && !isNaN(+eT)) {
      this.dateEnd = new Date(+eT);
    }
       
    this.getCustomers().subscribe(data => {
      this.customers = data;
      var prev =   sessionStorage.getItem('customerID');  
      if (this.customers.length>0) {
        this.customerID = this.customers[0].id;
      }
      if (!prev){        
        return;
      }
      for (var i = 0; i<this.customers.length; i++) {
        if (this.customers[i].id == prev){
          this.customerID = prev;
          break;
        }       
      }
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // persist date range
    sessionStorage.setItem(type , event.value.getTime()+'');
  }

  onSubmitTemplateBased() {
    if (this.customers.length == 0) {
      return;
    }
    
    this.router.navigate(['/orders', encodeURIComponent(this.customerID), this.dateStart ? this.dateStart.getTime() : 'x', this.dateEnd ? this.dateEnd.getTime() : 'x']);
  }

  getCustomers() {
    return this.http.get(`http://private-anon-4e005fd00a-byrd1.apiary-mock.com/customers`);
  }


  selectItem(value) {
    sessionStorage.setItem('customerID', value);
  }
}



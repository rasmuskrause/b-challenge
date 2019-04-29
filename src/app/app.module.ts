import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppComponent } from './app.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { SelectionFormComponent } from './selection-form/selection-form.component';

const appRoutes: Routes = [
  { path: 'orders/:id/:dateStart/:dateEnd', component: OrderListComponent } ,
  { path: 'orders/:id/:dateStart', component: OrderListComponent } ,
  { path: 'orders/:id', component: OrderListComponent } ,
  { path: '', component: SelectionFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    SelectionFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpClientModule, MatNativeDateModule],
  bootstrap: [AppComponent]  
})
export class AppModule { }

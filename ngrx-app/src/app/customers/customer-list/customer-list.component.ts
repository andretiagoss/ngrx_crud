import { Component, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as customerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";
import { Customer } from "../customer.model";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  // customers:any;
  customers$: Observable<Customer[]> = new Observable<Customer[]>();
  error$: Observable<String> = new Observable<String>();

  constructor(private store: Store<fromCustomer.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    
    // this.store.subscribe(state => (this.customers = state.customers.customers));
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));    
    this.error$ = this.store.pipe(select(fromCustomer.getError));
  }

  deleteCustomer(customer: Customer) {
    if (confirm("Are You Sure You want to Delete the User?")) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }
}
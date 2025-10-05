import { PreviousRouteService } from './../../shared-services/previous-route.service';
import { Customer } from './../../models/Customer';
import { CustomersService } from './../customers/customers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  id;
  customer: Customer;
  public showReturnInterventions: boolean = false;
  public returnInterventionsUrl: string;

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private previousRouteService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.loadCustomer();
    });

    let previousRoute: string = this.previousRouteService.getPreviousUrl();
    if (previousRoute.includes('interventions')) {
      this.showReturnInterventions = true;
      this.returnInterventionsUrl = previousRoute;
    }
  }

  loadCustomer() {
    this.customersService
      .getCustomer(this.id)
      .subscribe((customer: Customer) => {
        this.customer = customer;
      });
  }
}

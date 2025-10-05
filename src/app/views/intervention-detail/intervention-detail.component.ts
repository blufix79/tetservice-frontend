import { PreviousRouteService } from './../../shared-services/previous-route.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Intervention } from './../../models/Intervention';
import { InterventionsService } from './../interventions/interventions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intervention-detail',
  templateUrl: './intervention-detail.component.html',
  styleUrls: ['./intervention-detail.component.scss']
})
export class InterventionDetailComponent implements OnInit {
  public id;
  public intervention: Intervention;
  public showReturCustomer: boolean = false;
  public returnCustomerUrl: string;

  constructor(
    private interventionsService: InterventionsService,
    private route: ActivatedRoute,
    private previousRouteService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap: ParamMap) => {
      this.id = paramsMap.get('id');
      this.loadIntervention();
    });

    let previousRoute: string = this.previousRouteService.getPreviousUrl();
    if (previousRoute.includes('customer')) {
      this.showReturCustomer = true;
      this.returnCustomerUrl = previousRoute;
    }
  }

  loadIntervention() {
    this.interventionsService
      .getIntervention(this.id)
      .subscribe((intervention: Intervention) => {
        this.intervention = intervention;
      });
  }
}

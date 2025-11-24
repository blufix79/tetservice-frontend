import { Contract } from './../../models/Contracts';
import { ContractsService } from './../contracts/contracts.service';
import { InterventionsService } from './../interventions/interventions.service';
import { Component, OnInit } from '@angular/core';
import { Intervention } from 'src/app/models/Intervention';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private interventionsService: InterventionsService,
    private contractsService: ContractsService
  ) {}
  interventions: Intervention[];
  interventionToBeScheduled: Intervention[];
  contracts: Contract[];

  ngOnInit() {
    this.loadInterventions();
    this.loadContracts();
  }

  loadInterventions() {
    this.interventionsService
      .get('rangeDays', '30', null, 'desc')
      .subscribe((interventions: Intervention[]) => {
        this.interventions = interventions;
      });

    this.interventionsService
      .get('status', '3', null, 'desc')
      .subscribe((interventions: Intervention[]) => {
        this.interventionToBeScheduled = interventions;
      });
  }

  loadContracts() {
    this.contractsService
      .get('expiring', '10', 'desc')
      .subscribe((contracts: Contract[]) => {
        this.contracts = contracts;
      });
  }
}

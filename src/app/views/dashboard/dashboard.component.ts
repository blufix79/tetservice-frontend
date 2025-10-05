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
  contracts: Contract[];

  ngOnInit() {
    this.loadInterventions();
    this.loadContracts();
  }

  loadInterventions() {
    this.interventionsService
      .get('rangeDays', '30')
      .subscribe((interventions: Intervention[]) => {
        this.interventions = interventions;
      });
  }
  loadContracts() {
    this.contractsService
      .get('expiring', '30')
      .subscribe((contracts: Contract[]) => {
        this.contracts = contracts;
      });
  }
}

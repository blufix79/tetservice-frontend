import { Title } from '@angular/platform-browser';
import { InterventionsService } from './../interventions/interventions.service';
import { Repairer } from './../../models/Repairer';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RepairersService } from './../repairers/repairers.service';
import { Component, OnInit } from '@angular/core';
import { Intervention } from 'src/app/models/Intervention';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repairer-day',
  templateUrl: './repairer-day.component.html',
  styleUrls: ['./repairer-day.component.scss']
})
export class RepairerDayComponent implements OnInit {
  date: string;
  id: number;
  repairer: Repairer;
  interventions: Intervention[];
  title: string = 'Appuntamenti';
  isLast: any;

  constructor(
    private repairersService: RepairersService,
    private interventionsService: InterventionsService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.date = new Date().toJSON().slice(0, 10);
    // this.date = new Date().toJSON().slice(0, 10);
    // this.date = '2024-08-01';
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      this.loadRepairerDay(this.id);
    });
  }

  loadRepairerDay(id) {
    this.repairersService.getRepairer(id).subscribe((repairer: Repairer) => {
      this.repairer = repairer;
      let date = this.datePipe.transform(this.date, 'd-MM-y', null, 'it-IT');
      this.title =
        repairer.cognome + ' ' + repairer.nome + ' - Appuntamenti del ' + date;
      this.titleService.setTitle(
        repairer.cognome + '_' + repairer.nome + ' - Appuntamenti del_' + date
      );
    });

    this.interventionsService
      .getInterventionsRepairerDay(id, this.date)
      .subscribe((interventions: Intervention[]) => {
        this.interventions = interventions;
      });
  }

  changeDate() {
    this.loadRepairerDay(this.id);
  }

  print() {
    // eslint-disable-next-line no-undef
    window.print();
  }
}

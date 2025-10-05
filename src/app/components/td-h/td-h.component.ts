import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-td-h',
  templateUrl: './td-h.component.html',
  styleUrls: ['./td-h.component.scss']
})
export class TdHComponent implements OnInit {
  @Input() searchWord: string;

  constructor() { }

  ngOnInit(): void {
  }

}

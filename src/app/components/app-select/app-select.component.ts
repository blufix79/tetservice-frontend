import { FormControl } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss']
})
export class AppSelectComponent implements OnInit, OnChanges {
  @Input() items: any;
  @Input() required: boolean;
  @Input() formControlObject: FormControl;
  @Input() propertyName: string;
  @Input() label: string;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  search: string;
  selectedName: string;
  labelProperties: string[];

  constructor() {}
  ngOnChanges(_changes: SimpleChanges): void {
    this.initValues();
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    if (!this.items) {
      return;
    }
    this.selectedName = 'Seleziona ' + this.label;
    this.labelProperties = this.propertyName.split('|');
    if (this.formControlObject.value !== null) {
      let updIndex = this.items.findIndex((s) => {
        return s.id == this.formControlObject.value;
      });

      this.selectedName = this.makeSelectedName(this.items[updIndex]);
    }
  }

  selectItem(item) {
    this.selectedName = this.makeSelectedName(item); //item[this.propertyName];
    this.selected.emit(item);
  }

  makeSelectedName(item): string {
    let properties = this.propertyName.split('|');
    let propertiesString = properties.map((element) => {
      return item[element];
    });
    return propertiesString.join(' ');
  }
}

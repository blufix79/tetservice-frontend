import { AppService } from 'src/app/utils/services/app.service';
import { CustomersService } from './../../views/customers/customers.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-select-http',
  templateUrl: './app-select-http.component.html',
  styleUrls: ['./app-select-http.component.scss']
})
export class AppSelectHttpComponent implements OnInit, OnChanges {
  label: string = 'Scegli cliente';
  keyword: string;
  items: Customer[] = [];
  labelProperties: string[];
  propertyName: string = 'nome|cognome|indirizzo';
  selectedName: string = '';
  @Input() formControlObject: FormControl;
  @Input() selectNewItem?: BehaviorSubject<Customer>;
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor(
    private customersService: CustomersService,
    private loader: SpinnerVisibilityService,
    private appService: AppService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formControlObject.value !== null) {
      let id = this.formControlObject.value;

      this.customersService
        .getCustomer(id.toString())
        .subscribe((item: any) => {
          this.items.push(item);
          this.selectedName = this.makeSelectedName(item);
        });
    }

    this.selectNewItem?.subscribe((customer) => {
      if (customer) {
        this.formControlObject.setValue(customer.id);
        this.selectItem(customer);
      }
    });
  }

  ngOnInit(): void {
    this.labelProperties = this.propertyName.split('|');
    this.selectedName = 'Seleziona il cliente';
  }

  search() {
    if (this.keyword.length < 3) {
      this.items = [];
      return;
    }
    this.appService.loader.disable = true;
    this.customersService
      .search(this.keyword)
      .subscribe((customers: Customer[]) => {
        this.items = customers;
      });
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

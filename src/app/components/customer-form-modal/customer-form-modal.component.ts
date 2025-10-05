import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/models/City';
import { Customer } from 'src/app/models/Customer';
import { CitiesService } from 'src/app/views/cities/cities.service';
import { CustomersService } from 'src/app/views/customers/customers.service';

@Component({
  selector: 'app-customer-form-modal',
  templateUrl: './customer-form-modal.component.html',
  styleUrls: ['./customer-form-modal.component.scss']
})
export class CustomerFormModalComponent implements OnInit {
  @Output() saveCustomer: EventEmitter<any> = new EventEmitter();
  customerForm: FormGroup;
  selectedCityName: string = 'Seleziona città';
  searchCity: string = '';
  modalRef: NgbModalRef;
  cities: City[] = [];
  @ViewChild('customerModal') customerModalTemplate: any;

  constructor(
    private modalService: NgbModal,
    private citiesService: CitiesService,
    private customersService: CustomersService
  ) {
    this.customerForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
      telefono: new FormControl(''),
      cellulare: new FormControl(''),
      city_id: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.loadCities();
  }

  get id() {
    return this.customerForm.get('id');
  }
  get nome() {
    return this.customerForm.get('nome');
  }
  get cognome() {
    return this.customerForm.get('cognome');
  }
  get indirizzo() {
    return this.customerForm.get('indirizzo');
  }
  get telefono() {
    return this.customerForm.get('telefono');
  }
  get cellulare() {
    return this.customerForm.get('cellulare');
  }
  get citta() {
    return this.customerForm.get('city_id');
  }

  loadCities() {
    this.citiesService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  selectCity(city: City) {
    this.citta.setValue(city.id);
    this.selectedCityName = city.comune;
  }

  openModal() {
    this.customerForm.reset();
    this.selectedCityName = 'Seleziona città';
    this.modalRef = this.modalService.open(this.customerModalTemplate);
  }

  save() {
    this.customerForm.markAllAsTouched();
    if (this.customerForm.valid) {
      const customer = this.customerForm.value as Customer;
      this.customersService.new(customer).subscribe((result) => {
        this.modalRef.close();
        this.saveCustomer.emit(result);
      });
    }
    // else {
    //   this.toastr.error('Verifica il campo del form', 'Nuovo Stato');
    // }
  }
}

import { CitiesService } from './../cities/cities.service';
import { City } from './../../models/City';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from './customers.service';
import { Customer } from './../../models/Customer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppDialogConfirmComponent } from 'src/app/components/app-dialog-confirm/app-dialog-confirm.component';
import { CustomerFormModalComponent } from 'src/app/components/customer-form-modal/customer-form-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[];
  cities: City[];
  searchCity: string;
  selectedCityName: string = 'Seleziona città';
  modal;
  search: string;
  filterCityId: number;
  p: number = 1;
  @ViewChild('customerModal') customerModal: CustomerFormModalComponent;

  constructor(
    private customersService: CustomersService,
    private citiesService: CitiesService,
    private modalService: NgbModal,
    private toastr: ToastrService
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
    this.loadCustomers();
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

  loadCustomers() {
    this.customersService.get().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  loadCities() {
    this.citiesService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  newItem(content) {
    this.loadCities();
    this.customerForm.reset();
    this.resetSelectCity();
    this.modal = this.modalService.open(content);
  }

  save() {
    this.customerForm.markAllAsTouched();
    if (this.customerForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error('Verifica il campo del form', 'Nuovo Stato');
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const customer: Customer = this.customerForm.value as Customer;
        if (customer.id === null) {
          this.customersService.new(customer).subscribe(() => {
            this.loadCustomers();
            this.toastr.success('Dati salvati correttamente', 'Nuovo Cliente');
          });
        } else {
          this.customersService.update(customer).subscribe(() => {
            this.loadCustomers();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Cliente'
            );
          });
        }
      }
      if (result == 'cross click' || result == 'cancel click') {
        this.customerForm.reset();
      }
    });
  }

  edit(content, customer: Customer) {
    let updIndex = this.customers.findIndex((s) => {
      return s.id == customer.id;
    });

    this.id.setValue(this.customers[updIndex].id);
    this.nome.setValue(this.customers[updIndex].nome);
    this.cognome.setValue(this.customers[updIndex].cognome);
    this.indirizzo.setValue(this.customers[updIndex].indirizzo);
    this.telefono.setValue(this.customers[updIndex].telefono);
    this.cellulare.setValue(this.customers[updIndex].cellulare);
    this.citta.setValue(this.customers[updIndex].city_id);

    this.modal = this.modalService.open(content);
  }

  delete(customer: Customer) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.customersService.delete(customer.id).subscribe((result) => {
          this.toastr.success(
            'CLiente eliminato con successo',
            'Eliminazione Prodotto'
          );
          this.loadCustomers();
        });
      }
    });
  }

  selectCity(city: City) {
    this.citta.setValue(city.id);
    this.selectedCityName = city.comune;
  }

  resetSelectCity() {
    this.searchCity = '';
    this.selectedCityName = 'Seleziona città';
  }

  searchWordText($event) {
    this.search = $event;
  }
  filterByCity(cityId: number) {
    this.filterCityId = cityId;
  }

  openNewCustomerModal() {
    this.customerModal.openModal();
  }

  onSaveCustomer(newCustomer: Customer) {
    this.toastr.success('Dati salvati correttamente', 'Nuovo Cliente');
    this.loadCustomers();
  }
}

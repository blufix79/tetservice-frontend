import { TimeSlot } from './../../models/TimeSlot';
import { TimeslotsService } from './../timeslots/timeslots.service';
import { RepairType } from './../../models/RepairType';
import { RepairtypesService } from './../repairtypes/repairtypes.service';
import { AppDialogConfirmComponent } from 'src/app/components/app-dialog-confirm/app-dialog-confirm.component';
import { StatesService } from './../states/states.service';
import { RepairersService } from './../repairers/repairers.service';
import { CustomersService } from './../customers/customers.service';
import { State } from './../../models/State';
import { Repairer } from '../../models/Repairer';
import { Customer } from './../../models/Customer';
import { ProductsService } from './../products/products.service';
import { Product } from './../../models/Product';
import { InterventionsService } from './interventions.service';
import { Intervention } from './../../models/Intervention';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule
} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import 'select2';
import { PreviousRouteService } from 'src/app/shared-services/previous-route.service';
import { CustomersComponent } from '../customers/customers.component';
import { inject } from '@angular/core/testing';
import { CitiesService } from '../cities/cities.service';
import { CustomerFormModalComponent } from 'src/app/components/customer-form-modal/customer-form-modal.component';
import { BehaviorSubject } from 'rxjs';
// eslint-disable-next-line no-undef
declare var jQuery: JQueryStatic;

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.scss']
})
export class InterventionsComponent implements OnInit {
  interventionForm: FormGroup;
  interventions: Intervention[];
  customers: Customer[];
  repairers: Repairer[];
  states: State[];
  productsList: Product[];
  repairTypesList: RepairType[];
  timeSlots: TimeSlot[];
  search: string; //Model for search text
  modal;
  modalTitle: string = 'Nuovo Intervento';
  p: number = 1;
  loadedSelectedData: boolean = false;
  currentEditIntervention: Intervention = null;
  timeS: any;
  customer_add: CustomersComponent;
  @ViewChild('customerModal') customerModal: CustomerFormModalComponent;
  sendSelectedNewCustomer: BehaviorSubject<Customer>;

  constructor(
    private interventionService: InterventionsService,
    private customerService: CustomersService,
    private repairerService: RepairersService,
    private stateService: StatesService,
    private repairtypesService: RepairtypesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private productservice: ProductsService,
    private timeslotservice: TimeslotsService,
    private previousRouteService: PreviousRouteService,
    public citiesService: CitiesService
  ) {
    this.customer_add = new CustomersComponent(
      this.customerService,
      this.citiesService,
      this.modalService,
      this.toastr
    );

    this.sendSelectedNewCustomer = new BehaviorSubject<Customer>(null);
  }

  ngOnInit() {
    this.interventionForm = new FormGroup({
      id: new FormControl(null),
      titolo: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
      note: new FormControl(''),
      data: new FormControl('', Validators.required),
      garanzia: new FormControl(false),
      products: new FormControl([], Validators.required),
      repairTypes: new FormControl([], Validators.required),
      customer_id: new FormControl('', Validators.required),
      repairer_id: new FormControl('', Validators.required),
      state_id: new FormControl('', Validators.required),
      slot_id: new FormControl('')
    });

    this.loadInterventions();
  }

  get id() {
    return this.interventionForm.get('id');
  }
  get titolo() {
    return this.interventionForm.get('titolo');
  }
  get descrizione() {
    return this.interventionForm.get('descrizione');
  }
  get note() {
    return this.interventionForm.get('note');
  }
  get garanzia() {
    return this.interventionForm.get('garanzia');
  }
  get data() {
    return this.interventionForm.get('data');
  }
  get products() {
    return this.interventionForm.get('products');
  }
  get repairTypes() {
    return this.interventionForm.get('repairTypes');
  }
  get customer() {
    return this.interventionForm.get('customer_id');
  }
  get repairer() {
    return this.interventionForm.get('repairer_id');
  }
  get state() {
    return this.interventionForm.get('state_id');
  }
  get slot() {
    return this.interventionForm.get('slot_id');
  }

  loadInterventions() {
    this.interventionService
      .get()
      .subscribe((interventions: Intervention[]) => {
        this.interventions = interventions;
      });
  }

  loadSelectData() {
    this.productservice.get().subscribe((products: Product[]) => {
      this.productsList = products;
    });

    // this.customerService.get().subscribe((customers: Customer[]) => {
    //   this.customers = customers;
    // });

    this.repairerService.get().subscribe((repairers: Repairer[]) => {
      this.repairers = repairers;
    });

    this.stateService.get().subscribe((states: State[]) => {
      this.states = states;
    });

    this.repairtypesService.get().subscribe((repairTypes) => {
      this.repairTypesList = repairTypes;
    });
  }

  loadTimeSlots(repairerId, data) {
    this.timeslotservice
      .getTimeSlotsAvailable(repairerId, data)
      .subscribe((timeSlots: TimeSlot[]) => {
        this.timeSlots = timeSlots.map((value: TimeSlot) => {
          if (
            value.available == false &&
            this.currentEditIntervention &&
            value.id == this.currentEditIntervention.slot_id
          ) {
            value.available = true;
          }
          return value;
        });

        this.slot.patchValue(Number(this.currentEditIntervention.slot_id));
      });
  }

  changeData() {
    if (this.repairer.valid) {
      this.loadTimeSlots(this.repairer.value, this.data.value);
    }
  }

  newItem(content) {
    this.loadSelectData();
    this.interventionForm.reset();
    this.data.setValue(new Date().toJSON().slice(0, 10));
    this.garanzia.setValue(false);
    this.timeSlots = [];
    this.modal = this.modalService.open(content, { size: 'xl' });
    this.slot.setValue(0);

    this.modal.shown.subscribe(() => {
      let element = jQuery('.select-element');
      element.select2({
        theme: 'classic'
      });

      element.on('select2:select select2:unselect change', (e: any) => {
        let value = jQuery(e.target).val() as any[];
        let values = value.map((element) => {
          return +element.split(': ')[1];
        });
        if (e.target.name == 'products') {
          this.products.setValue(values);
        } else {
          this.repairTypes.setValue(values);
        }
      });
    });
  }

  save() {
    this.interventionForm.markAllAsTouched();
    if (this.interventionForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error('Verifica il campo del form', 'Nuovo Intervento');
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const product: Intervention = this.interventionForm
          .value as Intervention;
        if (product.id === null) {
          this.interventionService.new(product).subscribe(() => {
            this.loadInterventions();
            this.toastr.success(
              'Dati salvati correttamente',
              'Nuovo Intervento'
            );
          });
        } else {
          this.interventionService.update(product).subscribe(() => {
            this.currentEditIntervention = null;
            this.loadInterventions();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Intervento'
            );
          });
        }
      }
      if (result == 'cross click' || result == 'cancel click') {
        this.interventionForm.reset();
      }
    });
  }

  selectCustomer(item) {
    this.customer.setValue(item.id);
  }
  selectRepairer(item) {
    this.repairer.setValue(item.id);
    this.loadTimeSlots(item.id, this.data.value);
  }
  selectState(item) {
    this.state.setValue(item.id);
  }

  selectSlot(slotId) {
    this.slot.setValue(slotId);
  }

  edit(content, intervention: Intervention) {
    this.modalTitle = 'Modifica Intervento';
    this.loadSelectData();
    this.currentEditIntervention = intervention;
    let updIndex = this.interventions.findIndex((s) => {
      return s.id == intervention.id;
    });

    this.id.setValue(this.interventions[updIndex].id);
    this.titolo.setValue(this.interventions[updIndex].titolo);
    this.descrizione.setValue(this.interventions[updIndex].descrizione);
    this.note.setValue(this.interventions[updIndex].note);
    this.data.setValue(
      new Date(this.interventions[updIndex].data).toJSON().slice(0, 10)
    );
    this.customer.setValue(this.interventions[updIndex].customer_id);
    this.repairer.setValue(this.interventions[updIndex].repairer_id);
    this.state.setValue(this.interventions[updIndex].state_id);

    this.loadTimeSlots(
      this.interventions[updIndex].repairer_id,
      this.interventions[updIndex].data
    );

    //this.slot.setValue(this.interventions[updIndex].slot_id);

    let p = this.interventions[updIndex].products.map((element: Product) => {
      return element.id;
    });
    this.products.setValue(p);

    let r = this.interventions[updIndex].repair_types.map(
      (element: RepairType) => {
        return element.id;
      }
    );
    this.repairTypes.setValue(r);

    this.modal = this.modalService.open(content, { size: 'xl' });

    this.modal.shown.subscribe(() => {
      let element = jQuery('.select-element');
      element.select2({
        theme: 'classic'
      });

      element.on('select2:select select2:unselect change', (e: any) => {
        let value = jQuery(e.target).val() as any[];
        let values = value.map((element) => {
          return +element.split(': ')[1];
        });
        if (e.target.name == 'products') {
          this.products.setValue(values);
        } else {
          this.repairTypes.setValue(values);
        }
      });
    });
  }

  delete(intervention: Intervention) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);
    modalRef.componentInstance.title = 'Cancellazione Intervento';
    modalRef.componentInstance.msg =
      "Vuoi eliminare l'intervento " +
      intervention.titolo +
      ' del ' +
      intervention.data;

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.interventionService.delete(intervention.id).subscribe((result) => {
          this.toastr.success(
            'Intervento eliminato con successo',
            'Eliminazione Intervento'
          );
          this.loadInterventions();
        });
      }
    });
  }

  /***
   * Filters
   */
  searchWordText($event) {
    this.search = $event;
  }

  openNewCustomerModal() {
    this.customerModal.openModal();
  }

  onSaveCustomer($event) {
    const customer = $event as Customer;
    this.sendSelectedNewCustomer.next(customer);
    this.toastr.success('Dati salvati correttamente', 'Nuovo Cliente');
  }
}

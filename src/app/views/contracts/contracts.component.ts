import { Product } from './../../models/Product';
import { ProductsService } from './../products/products.service';
import { CustomersService } from './../customers/customers.service';
import { AppDialogConfirmComponent } from './../../components/app-dialog-confirm/app-dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from './../../models/Customer';
import { ContractsService } from './contracts.service';
import { Contract } from './../../models/Contracts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import 'select2';
declare var jQuery: JQueryStatic;

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit, AfterViewInit {
  @ViewChild('selectproduct', { static: true }) el: ElementRef;
  contractForm: FormGroup;
  contracts: Contract[];
  customers: Customer[];
  productsList: Product[];
  productsSelected: any[];
  titleModal: string;
  modal;

  constructor(
    private contractsService: ContractsService,
    private customersService: CustomersService,
    private productsService: ProductsService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contractForm = new FormGroup({
      id: new FormControl(null),
      data: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
      scadenza: new FormControl('', Validators.required),
      customer_id: new FormControl('', Validators.required),
      products: new FormControl([], Validators.required),
      attivo: new FormControl('')
    });

    this.loadContracts();

  }

  ngAfterViewInit(): void {
    //jQuery('.select-product-element').select2();
  }

  get id() {
    return this.contractForm.get('id');
  }
  get data() {
    return this.contractForm.get('data');
  }
  get descrizione() {
    return this.contractForm.get('descrizione');
  }
  get scadenza() {
    return this.contractForm.get('scadenza');
  }
  get customer() {
    return this.contractForm.get('customer_id');
  }
  get products() {
    return this.contractForm.get('products');
  }
  get attivo() {
    return this.contractForm.get('attivo');
  }

  loadContracts() {
    this.contractsService.get().subscribe((contracts: Contract[]) => {
      this.contracts = contracts;
    });
  }

  loadSelectData() {
    // this.customersService.get().subscribe((customers: Customer[]) => {
    //   this.customers = customers;
    // });
    this.productsService.get().subscribe((products: Product[]) => {
      this.productsList = products;
    });
  }

  newItem(content) {
    this.loadSelectData();
    this.contractForm.reset();
    //reset dropdown this.resetSelectCity();
    this.titleModal = 'Nuovo';
    this.modal = this.modalService.open(content, { size: 'xl' });

    this.modal.shown.subscribe(() => {
      let element = jQuery('.select-product-element');
      element.select2({
        theme: 'classic'
      });

      element.on('select2:select select2:unselect change', (e: any) => {
        let value = element.val() as any[];
        let values = value.map((element) => {
          return +element.split(': ')[1];
        });
        this.products.setValue(values);
      });
    });
  }

  save() {
    this.contractForm.markAllAsTouched();
    if (this.contractForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error('Verifica il campo del form', 'Nuovo Stato');
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const contract: Contract = this.contractForm.value as Contract;
        if (contract.id === null) {
          this.contractsService.new(contract).subscribe(() => {
            this.loadContracts();
            this.toastr.success('Dati salvati correttamente', 'Nuovo Contratto');
          });
        } else {
          this.contractsService.update(contract).subscribe(() => {
            this.loadContracts();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Contratto'
            );
          });
        }
      }
      if (result == 'cross click' || result == 'cancel click') {
        this.contractForm.reset();
      }
    });
  }

  edit(content, contract: Contract) {
    this.loadSelectData();
    let updIndex = this.contracts.findIndex((s) => {
      return s.id == contract.id;
    });

    this.id.setValue(this.contracts[updIndex].id);
    this.data.setValue(this.contracts[updIndex].data);
    this.descrizione.setValue(this.contracts[updIndex].descrizione);
    this.scadenza.setValue(this.contracts[updIndex].scadenza);
    this.customer.setValue(this.contracts[updIndex].customer_id);
    this.attivo.setValue(this.contracts[updIndex].attivo);

    let p = this.contracts[updIndex].products.map((element: Product) => {
      return element.id;
    });
    this.products.setValue(p);

    this.titleModal = 'Modifica';
    this.modal = this.modalService.open(content, { size: 'xl' });

    this.modal.shown.subscribe(() => {
      let element = jQuery('.select-product-element');
      element.select2({
        theme: 'classic'
      });

      element.on('select2:select select2:unselect change', (e: any) => {
        let value = element.val() as any[];
        let values = value.map((element) => {
          return +element.split(': ')[1];
        });
        this.products.setValue(values);
      });
    });
  }

  delete(customer: Customer) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.contractsService.delete(customer.id).subscribe((result) => {
          this.toastr.success(
            'CLiente eliminato con successo',
            'Eliminazione Prodotto'
          );
          this.loadContracts();
        });
      }
    });
  }

  selectCustomer(item) {
    this.customer.setValue(item.id);
  }
}

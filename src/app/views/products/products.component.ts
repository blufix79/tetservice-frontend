import { AppDialogConfirmComponent } from './../../components/app-dialog-confirm/app-dialog-confirm.component';
import { Product } from './../../models/Product';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from './products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[];
  search: string;
  modal;
  modalTitle: string;

  constructor(
    private productService: ProductsService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      id: new FormControl(null),
      marca: new FormControl('', Validators.required),
      //nome: new FormControl(''),
      modello: new FormControl('', Validators.required),
      descrizione: new FormControl('')
    });

    this.loadProducts();
  }

  get id() {
    return this.productForm.get('id');
  }
  get marca() {
    return this.productForm.get('marca');
  }
  // get nome() {
  //   return this.productForm.get('nome');
  // }
  get modello() {
    return this.productForm.get('modello');
  }
  get descrizione() {
    return this.productForm.get('descrizione');
  }

  loadProducts() {
    this.productService.get().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  newItem(content) {
    this.modalTitle = 'Nuovo Prodotto';
    this.productForm.reset();
    this.modal = this.modalService.open(content);
  }

  save() {
    if (this.productForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error('Verifica il campo del form', 'Nuovo Prodotto');
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const product: Product = this.productForm.value as Product;
        if (product.id === null) {
          this.productService.new(product).subscribe(() => {
            this.loadProducts();
            this.toastr.success('Dati salvati correttamente', 'Nuovo Prodotto');
          });
        } else {
          this.productService.update(product).subscribe(() => {
            this.loadProducts();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Prodotto'
            );
          });
        }
      }
      if (result == 'cross click' || result == 'cancel click') {
        this.productForm.reset();
      }
    });
  }

  edit(content, product: Product) {
    this.modalTitle = 'Modifica Prodotto';
    let updIndex = this.products.findIndex((s) => {
      return s.id == product.id;
    });

    this.id.setValue(this.products[updIndex].id);
    this.marca.setValue(this.products[updIndex].marca);
    //this.nome.setValue(this.products[updIndex].nome);
    this.modello.setValue(this.products[updIndex].modello);
    this.descrizione.setValue(this.products[updIndex].descrizione);

    this.modal = this.modalService.open(content);
  }

  delete(product: Product) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.productService.delete(product.id).subscribe((result) => {
          this.toastr.success(
            'Prodotto eliminato con successo',
            'Eliminazione Prodotto'
          );
          this.loadProducts();
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
}

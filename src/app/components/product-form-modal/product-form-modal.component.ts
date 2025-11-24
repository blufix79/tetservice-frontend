import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/views/products/products.service';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: './product-form-modal.component.html',
  styleUrls: ['./product-form-modal.component.scss']
})
export class ProductFormModalComponent implements OnInit {
  @Output() saveProduct: EventEmitter<Product> = new EventEmitter();
  productForm: FormGroup;
  modalRef: NgbModalRef;
  @ViewChild('productModal') productModalTemplate: any;

  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService
  ) {
    this.productForm = new FormGroup({
      id: new FormControl(null),
      marca: new FormControl('', Validators.required),
      modello: new FormControl('', Validators.required),
      descrizione: new FormControl('')
    });
  }

  ngOnInit(): void {}

  get marca() {
    return this.productForm.get('marca');
  }
  get modello() {
    return this.productForm.get('modello');
  }
  get descrizione() {
    return this.productForm.get('descrizione');
  }

  openModal() {
    this.productForm.reset();
    this.modalRef = this.modalService.open(this.productModalTemplate);
  }

  save() {
    this.productForm.markAllAsTouched();
    if (this.productForm.valid) {
      const product = this.productForm.value as Product;
      this.productsService.new(product).subscribe((result: Product) => {
        this.modalRef.close();
        this.saveProduct.emit(result);
      });
    }
  }
}

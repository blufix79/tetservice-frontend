import { AppDialogConfirmComponent } from './../../components/app-dialog-confirm/app-dialog-confirm.component';
import { RepairType } from './../../models/RepairType';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairtypesService } from './repairtypes.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repairtypes',
  templateUrl: './repairtypes.component.html',
  styleUrls: ['./repairtypes.component.scss']
})
export class RepairtypesComponent implements OnInit {
  repairTypesForm: FormGroup;
  repairTypes: RepairType[];
  modal;
  modalTitle: string;

  constructor(
    private repairtypesService: RepairtypesService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.repairTypesForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required)
    });

    this.loadRepairTypes();
  }

  loadRepairTypes() {
    this.repairtypesService.get().subscribe((repairTypes) => {
      this.repairTypes = repairTypes;
    });
  }

  get id() {
    return this.repairTypesForm.get('id');
  }
  get nome() {
    return this.repairTypesForm.get('nome');
  }

  newItem(content) {
    this.modalTitle = 'Nuova Tipologia Intervento';
    this.repairTypesForm.reset();
    this.modal = this.modalService.open(content);
  }

  save() {
    this.repairTypesForm.markAllAsTouched();
    if (this.repairTypesForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error(
        'Verifica il campo del form',
        'Nuova Tipologia Intervento'
      );
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const product: RepairType = this.repairTypesForm.value as RepairType;
        if (product.id === null) {
          this.repairtypesService.new(product).subscribe(() => {
            this.loadRepairTypes();
            this.toastr.success(
              'Dati salvati correttamente',
              'Nuova Tipologia Intervento'
            );
          });
        } else {
          this.repairtypesService.update(product).subscribe(() => {
            this.loadRepairTypes();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Tipologia Intervento'
            );
          });
        }
      }
      if (result == 'cross click' || result == 'cancel click') {
        this.repairTypesForm.reset();
      }
    });
  }

  edit(content, repairType: RepairType) {
    this.modalTitle = 'Modifica Tipologia Intervento';
    let updIndex = this.repairTypes.findIndex((s) => {
      return s.id == repairType.id;
    });

    this.id.setValue(this.repairTypes[updIndex].id);
    this.nome.setValue(this.repairTypes[updIndex].nome);

    this.modal = this.modalService.open(content);
  }

  delete(repairType: RepairType) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);
    modalRef.componentInstance.title = 'Elimina Tipologia';
    modalRef.componentInstance.msg =
      'Vuoi eliminare la tipologia ' + repairType.nome + '?';

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.repairtypesService.delete(repairType.id).subscribe((result) => {
          this.toastr.success(
            'Tipologia eliminata con successo',
            'Eliminazione Prodotto'
          );
          this.loadRepairTypes();
        });
      }
    });
  }
}

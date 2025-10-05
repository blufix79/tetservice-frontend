import { AppDialogConfirmComponent } from './../../components/app-dialog-confirm/app-dialog-confirm.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Repairer } from '../../models/Repairer';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairersService } from './repairers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repairers',
  templateUrl: './repairers.component.html',
  styleUrls: ['./repairers.component.scss']
})
export class RepairersComponent implements OnInit {
  repairers: Repairer[];
  repairerForm: FormGroup;
  modal;
  modalTitle: string;

  constructor(
    private repairersService: RepairersService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.repairerForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required)
    });

    this.loadReapairers();
  }

  get id() {
    return this.repairerForm.get('id');
  }
  get nome() {
    return this.repairerForm.get('nome');
  }
  get cognome() {
    return this.repairerForm.get('cognome');
  }

  loadReapairers() {
    this.repairersService.get().subscribe((repairers: Repairer[]) => {
      this.repairers = repairers;
    });
  }

  newItem(content) {
    this.modalTitle = 'Nuovo Tecnico';
    this.repairerForm.reset();
    this.modal = this.modalService.open(content);
  }

  save() {
    if (this.repairerForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error(
        'Verifica la compilazione dei campi',
        'Errore nei campi'
      );
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const repairer: Repairer = this.repairerForm.value as Repairer;
        if (repairer.id === null) {
          this.repairersService.new(repairer).subscribe(() => {
            this.loadReapairers();
            this.toastr.success('Dati salvati correttamente', 'Nuovo Tecnico');
          });
        } else {
          this.repairersService.update(repairer).subscribe(() => {
            this.loadReapairers();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Tecnico'
            );
          });
        }
      }
    });
  }

  edit(content, repairer: Repairer) {
    this.modalTitle = 'Modifica Tecnico';
    let updIndex = this.repairers.findIndex((r) => {
      return r.id == repairer.id;
    });

    this.id.setValue(this.repairers[updIndex].id);
    this.nome.setValue(this.repairers[updIndex].nome);
    this.cognome.setValue(this.repairers[updIndex].cognome);

    this.modal = this.modalService.open(content);
  }

  delete(repairer: Repairer) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.repairersService.delete(repairer.id).subscribe((result) => {
          this.toastr.success(
            'Tecnico eliminato con successo',
            'Eliminazione Tecnico'
          );
          this.loadReapairers();
        });
      }
    });
  }
}

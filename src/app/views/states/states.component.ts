import { AppDialogConfirmComponent } from './../../components/app-dialog-confirm/app-dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatesService } from './states.service';
import { State } from '../../models/State';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  stateForm: FormGroup;
  states: State[];
  modal;
  modalTitle: string;

  constructor(
    private statesService: StatesService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.stateForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required)
    });

    this.loadStates();
  }

  get id() {
    return this.stateForm.get('id');
  }
  get nome() {
    return this.stateForm.get('nome');
  }

  loadStates() {
    // this.statesService.getStates().subscribe((results:State[])=>{
    //   this.states = results;
    // });
    this.statesService.get().subscribe((states: State[]) => {
      this.states = states;
    });
  }

  newItem(content) {
    this.modalTitle = 'Nuovo Stato';
    this.stateForm.reset();
    this.modal = this.modalService.open(content);
  }

  save() {
    if (this.stateForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error('Verifica il campo del form', 'Nuovo Stato');
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const state: State = this.stateForm.value as State;
        if (state.id === null) {
          this.statesService.new(state).subscribe(() => {
            this.loadStates();
            this.toastr.success('Dati salvati correttamente', 'Nuovo Stato');
          });
        } else {
          this.statesService.update(state).subscribe(() => {
            this.loadStates();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Stato'
            );
          });
        }
      }
    });
  }

  edit(content, state: State) {
    this.modalTitle = 'Modifica Stato';
    let updIndex = this.states.findIndex((s) => {
      return s.id == state.id;
    });

    this.id.setValue(this.states[updIndex].id);
    this.nome.setValue(this.states[updIndex].nome);

    this.modal = this.modalService.open(content);
  }

  delete(state: State) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.statesService.delete(state.id).subscribe((result) => {
          this.toastr.success(
            'Stato eliminato con successo',
            'Eliminazione Stato'
          );
          this.loadStates();
        });
      }
    });
  }
}

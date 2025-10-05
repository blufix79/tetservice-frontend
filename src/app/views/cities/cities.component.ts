import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from '../../models/City';
import { CitiesService } from './cities.service';
import { Component, OnInit } from '@angular/core';
import { AppDialogConfirmComponent } from 'src/app/components/app-dialog-confirm/app-dialog-confirm.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  //cities: City[];
  cities: City[];
  cityForm: FormGroup;
  modal;
  modalTitle: string;
  search: string;
  p: number = 1;

  constructor(
    private citiesService: CitiesService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cityForm = new FormGroup({
      id: new FormControl(null),
      comune: new FormControl('', Validators.required)
    });

    this.loadCities();
  }

  get id() {
    return this.cityForm.get('id');
  }
  get comune() {
    return this.cityForm.get('comune');
  }

  loadCities() {
    this.citiesService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  newItem(content) {
    this.modalTitle = 'Nuova Città';
    this.cityForm.reset();
    this.modal = this.modalService.open(content);
  }

  save() {
    if (this.cityForm.valid) {
      this.closeModal();
    } else {
      this.toastr.error('Verifica il campo del form', 'Nuova Città');
    }
  }

  closeModal() {
    this.modal.close('save');

    this.modal.result.then((result) => {
      if (result === 'save') {
        const city: City = this.cityForm.value as City;
        if (city.id === null) {
          this.citiesService.new(city).subscribe(() => {
            this.loadCities();
            this.toastr.success('Dati salvati correttamente', 'Nuova Città');
          });
        } else {
          this.citiesService.update(city).subscribe(() => {
            this.loadCities();
            this.toastr.success(
              'Dati aggiornati correttamente',
              'Aggiornamento Città'
            );
          });
        }
      }
    });
  }

  edit(content, city: City) {
    this.modalTitle = 'Modifica Città';
    let updIndex = this.cities.findIndex((s) => {
      return s.id == city.id;
    });

    this.id.setValue(this.cities[updIndex].id);
    this.comune.setValue(this.cities[updIndex].comune);

    this.modal = this.modalService.open(content);
  }

  delete(city: City) {
    const modalRef = this.modalService.open(AppDialogConfirmComponent);

    modalRef.result.then((result: any) => {
      if (result == 'ok') {
        this.citiesService.delete(city.id).subscribe((result) => {
          this.toastr.success(
            'Città eliminata con successo',
            'Eliminazione Città'
          );
          this.loadCities();
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

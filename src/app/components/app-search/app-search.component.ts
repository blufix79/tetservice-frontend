import { City } from './../../models/City';
import { CitiesService } from './../../views/cities/cities.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  Input
} from '@angular/core';
import 'select2';

// eslint-disable-next-line no-undef
declare var jQuery: JQueryStatic;

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent implements OnInit, AfterViewInit {
  @Output() searchWord: EventEmitter<any> = new EventEmitter();
  @Output() selectedCity: EventEmitter<any> = new EventEmitter();
  @Input() showFilterCity: boolean = false;
  search: string;
  city: number;
  cities: City[];

  constructor(private citiesServices: CitiesService) {}
  ngAfterViewInit(): void {
    let element = jQuery('.select-element-city');
    element.select2({
      placeholder: 'Filtra per città',
      theme: 'bootstrap'
    });
    let c = this;
    element.on('change', function(e) {
      c.city = +e.target['value'];
      c.selectCity(+e.target['value']);
    });
  }

  ngOnInit(): void {
    this.citiesServices.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  filterData() {
    this.searchWord.emit(this.search);
  }

  selectCity(cityId: number) {
    this.selectedCity.emit(cityId);
  }

  clearSearch() {
    this.search = undefined;
    this.searchWord.emit(this.search);
  }

  clearFilterCity() {
    let element = jQuery('.select-element-city');
    element.val('').trigger('change');
  }
}

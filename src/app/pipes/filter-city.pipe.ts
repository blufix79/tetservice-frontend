import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../models/City';

@Pipe({
  name: 'filterCity'
})
export class FilterCityPipe implements PipeTransform {
  transform(cities: City[], searchText: string): City[] {
    if (!searchText) {
      return cities;
    }
    return cities.filter((x) => {
      return x.comune
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase());
    });
  }
}

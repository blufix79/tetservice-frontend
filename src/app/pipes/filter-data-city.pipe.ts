import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDataCity'
})
export class FilterDataCityPipe implements PipeTransform {
  transform(items, idCity: number): any {
    if (!idCity) {
      return items;
    }
    if (idCity == 0) {
      return items;
    }

    return items.filter((x: any) => {
      return x.city.id === idCity;
    });
  }
}

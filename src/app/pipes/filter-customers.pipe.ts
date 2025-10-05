import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCustomers'
})
export class FilterCustomersPipe implements PipeTransform {
  public transform(items: any[], searchText: string): any {
    if (!searchText || searchText.length < 3) {
      return items;
    }

    return items.filter((data) => this.matchValue(data, searchText));
  }

  matchValue(data, value) {
    if (data.nome && data.cognome) {
      if (
        new RegExp(value, 'gi').test(data.nome + ' ' + data.cognome) ||
        new RegExp(value, 'gi').test(data.cognome + ' ' + data.nome)
      ) {
        return true;
      }
    }
  }
}

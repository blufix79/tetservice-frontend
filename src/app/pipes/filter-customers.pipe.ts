import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/Customer';

@Pipe({
  name: 'filterCustomers'
})
export class FilterCustomersPipe implements PipeTransform {
  public transform(items: Customer[], searchText: string): any {
    if (!searchText || searchText.length < 3) {
      return items;
    }

    const regex = new RegExp(searchText, 'i');
    return items.filter((data: Customer) => this.matchValue(data, regex));
  }

  matchValue(data: Customer, regex: RegExp) {
    const fullName =
      data.nome && data.cognome ? `${data.nome} ${data.cognome}` : '';
    const reversedName =
      data.nome && data.cognome ? `${data.cognome} ${data.nome}` : '';
    const cityName = data.city ? data.city.comune : '';

    return [
      fullName,
      reversedName,
      data.indirizzo,
      cityName,
      data.telefono,
      data.cellulare
    ].some((field) => !!field && regex.test(field));
  }
}

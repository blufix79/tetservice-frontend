import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGeneric'
})
export class FilterGenericPipe implements PipeTransform {
  public transform(items: any[], searchText: string): any {
    if (!searchText) {
      return items;
    }

    // if (searchText.length < 2) {
    //   return items;
    // }

    return items.filter((data) => this.matchValue(data, searchText));
  }

  // matchValue(data, value) {
  //   return Object.keys(data)
  //     .map((key) => {
  //       return new RegExp(value, 'gi').test(data[key]);
  //     })
  //     .some((result) => result);
  // }

  matchValue(data, value) {
    if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const nestedResult = this.matchValue(data[key], value); //ricorsione
          if (nestedResult) {
            return true;
          }
        }
      }
    } else {
      return new RegExp(value, 'gi').test(data);
    }

    return false;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(text:string): string {
    let t = text.charAt(0).toLocaleLowerCase() + text.slice(1);
    return t;
  }

}

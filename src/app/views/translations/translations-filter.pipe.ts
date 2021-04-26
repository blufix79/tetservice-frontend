import { TranslationLabel, TranslationLang } from './../../models/translationGroup.model';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationGroup } from 'src/app/models/translationGroup.model';

@Pipe({
  name: 'translationsFilter'
})
export class TranslationsFilterPipe implements PipeTransform {

  transform(items: TranslationLabel[], searchText: string): TranslationLabel[] {
    if(!items){
      return [];
    }
    if(!searchText){
      return items;
    }
    if(searchText.length<2){
      return items;
    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter(x=>{

      let langs = x.langs.filter(y=>{
        return y.translation.toLocaleLowerCase().includes(searchText) || x.id.toLocaleString().includes(searchText);
      })

      return langs.length>0;
    })
  }

}

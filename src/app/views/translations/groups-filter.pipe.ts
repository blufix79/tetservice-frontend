import { TranslationsService } from './translations.service';
import { TranslationsFilterPipe } from './translations-filter.pipe';
import { TranslationLabel } from './../../models/translationGroup.model';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationGroup } from 'src/app/models/translationGroup.model';

@Pipe({
  name: 'groupsFilter'
})
export class GroupsFilterPipe implements PipeTransform {

  constructor(private translationsService: TranslationsService) {

  }

  transform(groups: TranslationGroup[], searchText: string): TranslationGroup[] {

    if (!groups) {
      return [];
    }
    if (!searchText) {
      groups[this.translationsService.groupSelected.index].active=false;
      this.translationsService.groupSelected = 0;
      groups[0].active = true;
      return groups;
    }
    if (searchText.length < 2) {
      return groups;
    }

    searchText = searchText.toLocaleLowerCase();

    let gs = groups.filter(x => {
      let lbls = x.labels.filter(y => {
        let langs = y.langs.filter(z => {
          //console.log(x.name+" "+y.label+" "+z.translation);
          return z.translation.toLocaleLowerCase().includes(searchText) || y.id.toLocaleString().includes(searchText);
        })
        return langs.length > 0
      })
      return lbls.length > 0;
    })


    let idx = groups.indexOf(gs[0]);
    groups[this.translationsService.groupSelected.index].active=false;
    gs[0].active=true;
    this.translationsService.groupSelected = idx;

    return gs

  }



}

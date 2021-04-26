import { Language } from './../../models/language.models';
import { TranslationGroup, TranslationLabel } from './../../models/translationGroup.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  private _groupSelected: any = {
    index: 0
  };

  public get groupSelected(): any {
    return this._groupSelected;
  }

  public set groupSelected(v: any) {
    this._groupSelected.index = v;
  }

  constructor(private http: HttpClient) { }

  importFromJson(groups: TranslationGroup[]) {
    return this.http.put<Array<TranslationGroup>>('admin_translations', groups);
  }

  getGroups(): TranslationGroup[] {
    return [];
  }

  getRawGroups() {
    return this.http.get('admin_translations?type=groups')
  }

  downloadToJson(lang: Language) {
    return this.http.get('admin_translations?type=download&idLang=' + lang.id,
      {
        responseType: 'arraybuffer'
      }
    ).subscribe(response => this.downLoadFile(response, "application/json", lang));
  }

  updateLang(data) {
    return this.http.post('admin_translations?type=updateLabelLangs', data);
  }

  /**
    * Method is use to download file.
    * @param data - Array Buffer data
    * @param type - type of the document.
  **/
  downLoadFile(data: any, type: string, lang: Language) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    pwa.document.title=lang.locale;
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  newGroup(newGroupName: string){
    let newGroup: TranslationGroup = new TranslationGroup(null,newGroupName);
    return this.http.put<TranslationGroup>('admin_translations?type=addNewGroup',newGroup);
  }

  newLabel(newLabel: TranslationLabel){
    return this.http.put<TranslationLabel>('admin_translations?type=addNewLabel',newLabel);
  }

  editLabel(editLabel: TranslationLabel){
    return this.http.post('admin_translations?type=editLabel',editLabel);
  }

  deleteLabel(id: Number){
    let url = `admin_translations?type=label&id=${id}`;
    return this.http.delete(url);
  }

}

export class TranslationGroup{
  id: number;
  name: string;
  labels: TranslationLabel[];
  active: boolean = false;
  emptyLabels: number = 0;

  constructor(id:number=null, name: string){
    this.id=id;
    this.name=name;
    this.labels = [];
  }
}

export class TranslationLabel {
  id:number;
  label: string;
  langs: TranslationLang[];
  emptyLangs: number = 0;
}

export class TranslationLang {
  id:number;
  idLang: number;
  locale: string;
  translation: string;
}

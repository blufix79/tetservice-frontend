import { CamelCasePipe } from './../../pipes/camel-case.pipe';
import { ToastrService } from 'ngx-toastr';
import { TranslationsService } from './translations.service';
import { Language } from './../../models/language.models';
import { TranslationGroup, TranslationLabel, TranslationLang } from './../../models/translationGroup.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as it from '../../languages-files/it-IT.json';
import * as en from '../../languages-files/en-GB.json';
import * as de from '../../languages-files/de-DE.json';
import * as fr from '../../languages-files/fr-FR.json';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BoundElementProperty } from '@angular/compiler';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {
  //TODO get from backend
  languages: Language[] = [
    { id: 1, name: "lang.English", locale: "en-GB" },
    { id: 2, name: "lang.Italian", locale: "it-IT" },
    { id: 3, name: "lang.German", locale: "de-DE" },
    { id: 4, name: "lang.French", locale: "fr-FR" }
  ]

  resources: any;
  importGroups: Array<TranslationGroup> = [];
  groups: Array<TranslationGroup> = [];
  groupSelected: any;
  rawGroups: TranslationGroup[] = [];
  forms: any = {};
  searchText: string = "";
  closeResult = '';
  newGroupName = ''
  newLabelModel: TranslationLabel = new TranslationLabel();
  editLabelModel: TranslationLabel = new TranslationLabel();
  labelPrefix: string = "";
  deletionLabelName: string;

  constructor(
    private translationService: TranslationsService,
    private spinner: SpinnerVisibilityService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private camelCase: CamelCasePipe
  ) {

  }

  renderForm() {
    this.groups.forEach(group => {

      this.renderGroup(group);

    })
    // console.log(this.forms);
  }

  renderGroup(group) {
    group.labels.forEach(label => {
      this.renderControl(label);
    });
  }

  renderControl(label){
    let labelForm: any = {};

      label.langs.forEach((lang, index) => {
        labelForm["translation-id-" + index] = new FormControl(lang.id);
        labelForm["translation-" + index] = new FormControl(lang.translation);
      })

      this.forms[label.id+""+label.label] = new FormGroup(labelForm);
  }


  ngOnInit() {
    //this.groups = this.translationService.getGroups();


    this.translationService.getRawGroups()
      .subscribe((results: any[]) => {

        //console.log(results);

        if (results.length == 0) {
          return;
        }

        this.spinner.show();
        results.forEach((group) => {

          //add group          ;

          let idx = this.rawGroups.find(x => x.id == group.id);
          if (idx == undefined) {
            let rawGroup = new TranslationGroup(group.id, group.name);
            this.rawGroups.push(rawGroup);

            this.addLabel(rawGroup, group);
          }
          else {
            this.addLabel(idx, group);
          }

        })

        this.groups = this.countLabelsEmpty(this.rawGroups);
        this.groupSelected = this.translationService.groupSelected;
        this.groups[this.groupSelected.index].active = true;
        this.renderForm();
        this.spinner.hide();
      })
  }

  countLabelsEmpty(groups: TranslationGroup[]): TranslationGroup[]{
    groups.forEach(group=>{
      this.countLabelsEmptyForGroup(group);
    })

    return groups;
  }

  countLabelsEmptyForGroup(group: TranslationGroup){
    group.emptyLabels=0;
    group.labels.forEach(label=>{
      let langEmpty: boolean=false;
      label.emptyLangs=0;
      label.langs.forEach(lang=>{
        if(lang.translation==""){
          label.emptyLangs++;
          langEmpty = true;
        }
      });

      if(langEmpty){
        group.emptyLabels++;
      }

    })
    return group;
  }

  selectGroup(group) {
    let idx = this.groups.indexOf(group);
    this.groups[this.groupSelected.index].active = false;
    this.translationService.groupSelected.index = idx;
    this.groups[idx].active = true;
  }

  importTranslationsFromJson(content) {
    this.modalService.open(content).result.then(result=>{
      if(result=='ok'){
        let resources = it['default'];
        let keys = Object.keys(resources);
        this.importGroups = [];


        keys.forEach(element => {
          resources[element] = {
            'it-IT': it['default'][element],
            'en-GB': en['default'][element],
            'de-DE': de['default'][element],
            'fr-FR': fr['default'][element]
          }
        });

        keys.forEach(element => {
          let groupExist = this.groupExist(element);
          if (groupExist === false) {

            let group: TranslationGroup = this.createGroup(element, resources);

            this.importGroups.push(group);
          }
          else {
            let label: TranslationLabel;

            label = this.createLabel(element, resources);

            this.importGroups[groupExist].labels.push(label);
          }
        });

        // console.log(this.importGroups);
        this.translationService.importFromJson(this.importGroups).subscribe((data) => {
          console.log(data);
        });
      }
    })
  }

  downloadTranslationsToJson() {
    this.languages.forEach((lang) => {
      this.translationService.downloadToJson(lang);
    })
  }

  groupExist(key: string) {
    let groupName = key.split('.')[0];

    if (this.importGroups == undefined) {
      return false;
    }

    let g = this.importGroups.find((e, i, a) => {
      return e.name == groupName;
    })

    if (g == undefined) {
      return false;
    }
    else {
      return this.importGroups.indexOf(g);
    }
  }

  createGroup(element, resources): TranslationGroup {
    let groupName = element.split('.')[0];
    let group: TranslationGroup = new TranslationGroup(null, groupName);
    let label: TranslationLabel;

    label = this.createLabel(element, resources);

    group.labels.push(label);

    return group;
  }

  createLabel(element, resources): TranslationLabel {
    let label: TranslationLabel = {
      id: null,
      label: element,
      langs: [],
      emptyLangs:0
    };

    this.languages.forEach((langElement) => {
      let lang: TranslationLang = {
        id: null,
        idLang: langElement.id,
        locale: langElement.locale,
        translation: resources[element][langElement.locale]
      }
      label.langs.push(lang);
    });

    return label;
  }


  addLabel(rawGroup, group) {


    let idx = rawGroup.labels.find(x => x.id == group.id_label);

    if (idx === undefined) {
      let lbl = new TranslationLabel();
      lbl.id = group.id_label;
      lbl.label = group.label;
      lbl.langs = [];

      rawGroup.labels.push(lbl);
      this.addLangToLabel(lbl, rawGroup, group);
    }
    else {
      this.addLangToLabel(idx, rawGroup, group);
    }

  }


  addLangToLabel(label, rawGroup, group) {
    let idx = label.langs.find(x => x.id == group.id_label_lang);

    let oneOrMoreTranslationsIsEmpty: boolean = false;

    if (idx === undefined) {
      let lang = new TranslationLang()
      lang.id = group.id_label_lang;
      lang.idLang = group.id_lang;
      lang.locale = group.locale;
      lang.translation = group.translation;

      label.langs.push(lang);
    }
  }

  onSubmit(data) {

    let keys = Object.keys(data);
    let length = keys.length / 2;

    let d: any[] = [];

    for (let index = 0; index < length; index++) {

      d.push({
        id: data['translation-id-' + index],
        translation: data['translation-' + index]
      })
    }

    this.translationService.updateLang(d).subscribe((result) => {
      if (result) {
        let activeGroup = this.getActiveGroup();
        this.groups[this.groupSelected.index] = this.countLabelsEmptyForGroup(activeGroup);
        this.toastr.success('Dati salvati con successo');
      }
    })


  }

  newGroup(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'save') {
        this.translationService.newGroup(this.newGroupName).subscribe(result => {
          this.groups.push(result);
          this.toastr.success('Gruppo creato con successo');
        })
      }
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  newLabel(content) {
    let activeGroup = this.getActiveGroup();
    this.labelPrefix = activeGroup.name + ".";
    this.newLabelModel.id = activeGroup.id;
    this.newLabelModel.langs = [];
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      if (result == 'save') {
        this.newLabelModel.label = this.labelPrefix + this.camelCase.transform(this.newLabelModel.label);
        let isExsist = this.labelExistInGroup(this.newLabelModel.label);
        if(isExsist){
          this.toastr.error(`l'etichetta ${this.newLabelModel.label} è già presente`);
          this.newLabelModel = new TranslationLabel();
          return;
        }
        this.languages.forEach(element => {
          this.newLabelModel.langs.push({
            id: null,
            idLang: element.id,
            locale: element.locale,
            translation: ""
          })
        })

        this.translationService.newLabel(this.newLabelModel).subscribe((element: TranslationLabel) => {
          this.newLabelModel = new TranslationLabel();
          let label: TranslationLabel = new TranslationLabel();
          label = element as TranslationLabel;
          this.renderControl(label);
          activeGroup.labels.push(label);
          this.groups[this.groupSelected.index] = this.countLabelsEmptyForGroup(activeGroup);
          this.toastr.success('Etichetta creata con successo');
        });
      }
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editLabel(content, label: TranslationLabel){
    this.editLabelModel = label;
    this.modalService.open(content,{ ariaLabelledBy: 'modal-basic-title' })
      .result.then(result=>{
        if(result=='save'){
          this.translationService.editLabel(this.editLabelModel).subscribe((result)=>{
            this.toastr.success('Etichetta aggiornata con successo');
          })
        }
      })
  }

  deleteLabel(content, label: TranslationLabel){
    let currentGroup: TranslationGroup = this.groups[this.groupSelected.index];
    let indexLabel = currentGroup.labels.indexOf(label);
    this.deletionLabelName=label.label
    this.modalService.open(content)
      .result.then(result=>{
        if(result=='ok'){
          this.translationService.deleteLabel(label.id).subscribe(result=>{
            currentGroup.labels.splice(indexLabel,1);
            this.toastr.success('Etichetta aggiornata con successo');
          })
        }
      })
  }

  copyToClipboardLabel(label: TranslationLabel){
    navigator.clipboard.writeText(label.label)
      .then(()=>{
        this.toastr.success("Etichetta copiata negli appunti");
      },
      (error)=>{
        this.toastr.error("Errore nella copia: "+error);
      });
  }

  getActiveGroup(): TranslationGroup {
    return this.groups.find(group => group.active);
  }

  labelExistInGroup(labelName:string){
    return this.groups[this.groupSelected.index].labels.find((label)=>{
      return label.label==labelName;
    })
  }

  selectGroupChange(value) {
    console.log(value);
  }
}



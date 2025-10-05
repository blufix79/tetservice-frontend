import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './app-dialog-confirm.component.html',
  styleUrls: ['./app-dialog-confirm.component.scss']
})
export class AppDialogConfirmComponent implements OnInit {
  @Input() title: string = 'Elimina elemento';
  @Input() msg: string = 'Vuoi eliminare questo elemento?';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }
}

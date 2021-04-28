import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StatesService } from "./states.service";
import { State } from "./../../models/state";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-states",
  templateUrl: "./states.component.html",
  styleUrls: ["./states.component.scss"],
})
export class StatesComponent implements OnInit {
  constructor(
    private statesService: StatesService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  newState(content) {
    this.modalService.open(content).result.then((result) => {
      if (result == "save") {
      }
    });
  }
}

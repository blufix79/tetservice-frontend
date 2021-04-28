import { State } from "./../../models/state";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StatesService {
  constructor(private http: HttpClient) {}

  newState(state: State) {
    return this.http.post("states", state);
  }
}

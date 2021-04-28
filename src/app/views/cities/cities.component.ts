import { City } from "./../../models/city";
import { CitiesService } from "./cities.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.scss"],
})
export class CitiesComponent implements OnInit {
  //cities: City[];
  cities;

  constructor(private cityService: CitiesService) {}

  ngOnInit() {
    // this.cityService.getCities().subscribe(result=>{
    //   this.cities = result;
    // });
    this.cities = this.cityService.getCities();
  }

  newCity() {}
}

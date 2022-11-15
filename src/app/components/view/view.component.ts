import { Component, Input, OnInit } from '@angular/core';
import { MunicipioResponse } from 'src/app/interfaces/municipios.interface';
import { ProvinciasResponse } from 'src/app/interfaces/provincias.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  selectedComb: string='';
  valuemin: number =1;
  valuemax: number =3;
  provSelected: ProvinciasResponse | undefined;
  munSelected: MunicipioResponse | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

  addMunSelected(value:MunicipioResponse){
    this.munSelected = value;
  }
  addProvSelected(value:ProvinciasResponse){
    this.provSelected = value;
  }
  addComb(value:string){
    this.selectedComb = value;
  }
  addMinValue(value:number){
    this.valuemin = value;
  }
  addMaxValue(value:number){
    this.valuemax = value;
  }
}

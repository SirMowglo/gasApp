import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  selectedComb: string='';
  valuemin: number =1;
  valuemax: number =3;
  constructor() { }

  ngOnInit(): void {
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

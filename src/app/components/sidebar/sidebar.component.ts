import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Combustible } from 'src/app/interfaces/combustibles.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  @Output() emitSComb = new EventEmitter<string>();
  @Output() emitMinValue = new EventEmitter<number>();
  @Output() emitMaxValue = new EventEmitter<number>();


  combustibles: Combustible[] = [
    {value: 'Gasoleo A', viewValue: 'Gasoleo A'},
    {value: 'Gasoleo B', viewValue: 'Gasoleo B'},
    {value: 'Gasolina 95 E5', viewValue: 'Gasolina 95 E5'},
  ];

  selectedComb: string='';
  valuemin:number = 1;
  valuemax: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return value + '€';
  }

  addSelectedComb(comb: string){
    this.emitSComb.emit(comb);
  }
  addMinValue(minV: number){
    this.emitMinValue.emit(minV);
  }
  addMaxValue(maxV: number){
    this.emitMaxValue.emit(maxV);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Combustible } from 'src/app/interfaces/combustibles.interface';
import { ProvinciasResponse } from 'src/app/interfaces/provincias.interface';
import { GasService } from 'src/app/services/gas.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  @Output() emitSComb = new EventEmitter<string>();
  @Output() emitMinValue = new EventEmitter<number>();
  @Output() emitMaxValue = new EventEmitter<number>();

  provincias: ProvinciasResponse [] = [];
  provControl = new FormControl('');
  filteredProv: Observable<ProvinciasResponse[]>;
  
  combustibles: Combustible[] = [
    {value: 'Gasoleo A', viewValue: 'Gasoleo A'},
    {value: 'Gasoleo B', viewValue: 'Gasoleo B'},
    {value: 'Gasolina 95 E5', viewValue: 'Gasolina 95 E5'},
  ];

  selectedComb: string='';
  valuemin:number = 1;
  valuemax: number = 3;

  constructor(private gService: GasService) { 
    this.filteredProv = this.provControl.valueChanges.pipe(
      startWith(''),
      map(prov => (prov ? this._filter(prov) : this.provincias.slice())),
    );
  }

  ngOnInit(): void {
    this.getProvincias();
  }

  getProvincias(){
    this.gService.getProvincias().subscribe(resp =>{
      this.provincias = resp;
    })
  }
  
  private _filter(value: string): ProvinciasResponse[] {
    const filterValue = value.toLowerCase();

    return this.provincias.filter(prov => prov.Provincia.toLowerCase().includes(filterValue));
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

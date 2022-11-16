import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Combustible } from 'src/app/interfaces/combustibles.interface';
import { MunicipioResponse } from 'src/app/interfaces/municipios.interface';
import { ProvinciasResponse } from 'src/app/interfaces/provincias.interface';
import { GasService } from 'src/app/services/gas.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() emitSComb = new EventEmitter<string>();
  @Output() emitMinValue = new EventEmitter<number>();
  @Output() emitMaxValue = new EventEmitter<number>();
  @Output() emitMunSelected = new EventEmitter<MunicipioResponse>();
  @Output() emitProvSelected = new EventEmitter<ProvinciasResponse>();

  selectedComb: string = '';
  valuemin: number = 1;
  valuemax: number = 3;
  provSelected: ProvinciasResponse | undefined;
  munSelected: MunicipioResponse | undefined;

  provincias: ProvinciasResponse[] = [];
  municipios: MunicipioResponse[] = [];
  provControl = new FormControl('');
  munControl = new FormControl('');
  filteredProv: Observable<ProvinciasResponse[]>;
  filteredMun: Observable<MunicipioResponse[]>

  combustibles: Combustible[] = [
    { value: 'Gasoleo A', viewValue: 'Gasoleo A' },
    { value: 'Gasoleo B', viewValue: 'Gasoleo B' },
    { value: 'Gasolina 95 E5', viewValue: 'Gasolina 95 E5' },
  ];


  constructor(private gService: GasService, private sharedService: SharedDataService) {
    this.getProvincias();
    this.filteredProv = this.provControl.valueChanges.pipe(
      startWith(''),
      map((prov) => (prov ? this._filterProv(prov) : this.provincias.slice()))
    );
    this.filteredMun = this.munControl.valueChanges.pipe(
      startWith(''),
      map((mun) => (mun ? this._filterMun(mun) : this.municipios.slice()))
    );
  }

  ngOnInit(): void {}

  getMunicipios(id_prov: string) {
    this.gService.getMunicipio(id_prov).subscribe((resp) => {
      this.municipios = resp;
    });
  }
  getProvincias() {
    this.gService.getProvincias().subscribe((resp) => {
      this.provincias = resp;
    });
  }

  
  getSelectedProv() {
    this.provSelected = this.provincias.find(
      (item) => this.formatString(item.Provincia) === this.provControl.value
    );
    if(this.provSelected != undefined){
      this.getMunicipios(this.provSelected.IDPovincia);
    }
  }
  getSelectedMun() {
    this.munSelected = this.municipios.find(
      (item) => this.formatString(item.Municipio) === this.munControl.value
    );
  }

  _filterProv(value: string): ProvinciasResponse[] {
    const filterValue = value.toLowerCase();
    return this.provincias.filter((prov) =>
      prov.Provincia.toLowerCase().includes(filterValue)
    );
  }
  _filterMun(value: string): MunicipioResponse[] {
    const filterValue = value.toLowerCase();
    return this.municipios.filter((mun) =>
      mun.Municipio.toLowerCase().includes(filterValue)
    );
  }
  formatString(str: string) {
    let readable = str.charAt(0) + str.substring(1).toLowerCase();
    return readable;
  }
  formatLabel(value: number) {
    return value + '€';
  }

  addProvSelected(prov : ProvinciasResponse |undefined){
    this.emitProvSelected.emit(prov);
  }
  addMunSelected(mun : MunicipioResponse|undefined){
    this.emitMunSelected.emit(mun);
  }
  addSelectedComb(comb: string) {
    this.emitSComb.emit(comb);
  }
  addMinValue(minV: number) {
    this.emitMinValue.emit(minV);
  }
  addMaxValue(maxV: number) {
    this.emitMaxValue.emit(maxV);
  }

  filterList(){
    this.sharedService.sendFilterEvent();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  GasResponse,
  ListaEESSPrecio,
} from 'src/app/interfaces/gasResponse.interface';
import { MunicipioResponse } from 'src/app/interfaces/municipios.interface';
import { ProvinciasResponse } from 'src/app/interfaces/provincias.interface';
import { GasService } from 'src/app/services/gas.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css'],
})
export class GasListComponent implements OnInit {
  //Vars from sidebar
  @Input() selectedComb: string = '';
  @Input() valuemin: number = 1;
  @Input() valuemax: number = 3;
  @Input() provSelected: ProvinciasResponse | undefined;
  @Input() munSelected: MunicipioResponse | undefined;

  gasList: ListaEESSPrecio[] = [];
  filteredGasList: ListaEESSPrecio[] = [];

  filterEventsubscription: Subscription;
  constructor(
    private gasService: GasService,
    private sharedService: SharedDataService
  ) {
    this.filterEventsubscription = this.sharedService
      .getFilterEvent()
      .subscribe(() => {
        this.allFilters();
      });
  }

  ngOnInit(): void {
    this.getGasList();
  }

  ngOnChanges() {
    this.allFilters();
  }

  getGasList() {
    this.gasService.getGasStations().subscribe((resp) => {
      this.gasList = resp.ListaEESSPrecio;
      this.filteredGasList = this.gasList;
    });
  }
  formatString(str: string) {
    let readable = str.charAt(0) + str.substring(1).toLowerCase();
    return readable;
  }

  allFilters() {
    this.filterListByPrice(this.selectedComb);
    if (this.provSelected != undefined) {
      this.filterListByProv();
    }
    if (this.munSelected != undefined) {
      this.filterListByMun();
    }
  }

  filterListByPrice(comb: string) {
    if (comb == 'Gasoleo A') {
      this.filteredGasList = this.gasList.filter(
        (gas) =>
          parseFloat(gas['Precio Gasoleo A'].replace(',', '.')) >=
            this.valuemin &&
          parseFloat(gas['Precio Gasoleo A'].replace(',', '.')) <= this.valuemax
      );
    }
    if (comb == 'Gasoleo B') {
      this.filteredGasList = this.gasList.filter(
        (gas) =>
          parseFloat(gas['Precio Gasoleo B'].replace(',', '.')) >=
            this.valuemin &&
          parseFloat(gas['Precio Gasoleo B'].replace(',', '.')) <= this.valuemax
      );
    }
    if (comb == 'Gasolina 95 E5') {
      this.filteredGasList = this.gasList.filter(
        (gas) =>
          parseFloat(gas['Precio Gasolina 95 E5'].replace(',', '.')) >=
            this.valuemin &&
          parseFloat(gas['Precio Gasolina 95 E5'].replace(',', '.')) <=
            this.valuemax
      );
    }
  }

  filterListByProv() {
    this.filteredGasList = this.filteredGasList.filter(
      (gas) => gas['IDProvincia'] === this.provSelected?.IDPovincia
    );
  }
  filterListByMun() {
    this.filteredGasList = this.filteredGasList.filter(
      (gas) => gas['IDMunicipio'] === this.munSelected?.IDMunicipio
    );
  }
}

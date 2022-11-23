import { Component, Input, OnInit } from '@angular/core';
import { ListaEESSPrecio } from 'src/app/interfaces/gasResponse.interface';
import { MunicipioResponse } from 'src/app/interfaces/municipios.interface';
import { ProvinciasResponse } from 'src/app/interfaces/provincias.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  selectedComb: string = '';
  valuemin: number = 1;
  valuemax: number = 3;
  provSelected: ProvinciasResponse | undefined;
  munSelected: MunicipioResponse | undefined;

  markers = []  as  any;
  filteredGasList: ListaEESSPrecio[] = [];
  
  //GoogleMaps
  center: google.maps.LatLngLiteral = {
    lat: 37.38283,
    lng: -5.97317,
  };
  zoom = 10;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  
  constructor() {}

  ngOnInit(): void {

  }

  addMunSelected(value: MunicipioResponse | undefined) {
    this.munSelected = value;
  }
  addProvSelected(value: ProvinciasResponse | undefined) {
    this.provSelected = value;
  }
  addComb(value: string) {
    this.selectedComb = value;
  }
  addMinValue(value: number) {
    this.valuemin = value;
  }
  addMaxValue(value: number) {
    this.valuemax = value;
  }
  addFilteredGL(value: ListaEESSPrecio[]) {
    this.filteredGasList = value;
    this.dropMarker()
  }

  dropMarker() {
    this.markers = [];
    for(var i =0; i<this.filteredGasList.length; i++){
      this.markers.push({
        position: {
          lat: parseFloat(this.filteredGasList[i]['Latitud'].replace(',', '.')),
          lng: parseFloat(this.filteredGasList[i]['Longitud (WGS84)'].replace(',', '.'))
        },
        label: {
          color: 'white',
          text: this.filteredGasList[i]['Rótulo'],
        },
        title: this.filteredGasList[i]['Rótulo'],
        info: 'Marker info ' + (this.markers.length + 1),
        options: {
          animation: google.maps.Animation.DROP,
        },
      })
      console.log(this.markers[i].position);
      console.log(this.filteredGasList[i]['Latitud'].replace(',', '.'))
      console.log(this.filteredGasList[i]['Longitud (WGS84)'].replace(',', '.'))
    }
  }
}

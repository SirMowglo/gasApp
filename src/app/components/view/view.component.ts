import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ListaEESSPrecio } from 'src/app/interfaces/gasResponse.interface';
import { MunicipioResponse } from 'src/app/interfaces/municipios.interface';
import { ProvinciasResponse } from 'src/app/interfaces/provincias.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  selectedComb: string = '';
  valuemin: number = 1;
  valuemax: number = 3;
  provSelected: ProvinciasResponse | undefined;
  munSelected: MunicipioResponse | undefined;

  markers = [] as any;
  filteredGasList: ListaEESSPrecio[] = [];
  infoContent = '';
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
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
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
    this.dropMarker();
  }

  dropMarker() {
    this.markers = [];
    for (var i = 0; i < this.filteredGasList.length; i++) {
      this.markers.push({
        position: {
          lat: parseFloat(this.filteredGasList[i]['Latitud'].replace(',', '.')),
          lng: parseFloat(
            this.filteredGasList[i]['Longitud (WGS84)'].replace(',', '.')
          ),
        },
        label: {
          color: 'white',
          text: this.filteredGasList[i]['Rótulo'],
        },
        title: this.filteredGasList[i]['Rótulo'],
        info:
          '<h2>'+this.filteredGasList[i]['Rótulo'] + '</h2>' +
          '<b>Dirección: </b>' +
          this.filteredGasList[i]['Dirección']+ '<br>'+
          '<b>Provincia: </b>' +
          this.filteredGasList[i]['Provincia']+ '<br>'+
          '<b>Horario: </b>' +
          this.filteredGasList[i]['Horario'],
        options: {
          animation: google.maps.Animation.DROP,
        },
      });
    }
  }

  openInfoWindow(marker: MapMarker,content: string) {
    this.infoContent = content;
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
}
}

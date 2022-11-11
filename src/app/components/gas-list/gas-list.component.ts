import { Component, Input, OnInit } from '@angular/core';
import { GasResponse, ListaEESSPrecio } from 'src/app/interfaces/gasResponse.interface';
import { GasService } from 'src/app/services/gas.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit {
  //Vars from sidebar
  @Input() selectedComb: string= '';
  @Input() valuemin: number=1;
  @Input() valuemax: number=3;

  gasList: ListaEESSPrecio[]=[];
  filteredGasList: ListaEESSPrecio[]=[];

  constructor(private gasService: GasService) { }

  ngOnInit(): void {
    this.getGasList();
  }

  getGasList(){
    this.gasService.getGasStations().subscribe(resp=>{
      this.gasList = resp.ListaEESSPrecio;
    });
  }
  stringToReadable(str: string){
    let readable = str.charAt(0) + str.substring(1).toLowerCase();
    return readable;
  }
}

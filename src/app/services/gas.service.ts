import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{GasResponse } from 'src/app/interfaces/gasResponse.interface'
@Injectable({
  providedIn: 'root'
})
export class GasService {

  constructor(private http:HttpClient) { }

  getGasStations():Observable <GasResponse>{
    return this.http.get<GasResponse>(`https://raw.githubusercontent.com/SirMowglo/gasApp/main/gasResponse.json`);
  }
}

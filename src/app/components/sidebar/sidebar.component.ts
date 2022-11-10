import { Component, OnInit } from '@angular/core';
import { Combustible } from 'src/app/interfaces/combustibles.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  
  foods: Combustible[] = [
    {value: 'Precio Gasoleo A', viewValue: 'Gasoleo A'},
    {value: 'Precio Gasoleo B', viewValue: 'Gasoleo B'},
    {value: 'Precio Gasolina 95 E5', viewValue: 'Gasolina 95 E5'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

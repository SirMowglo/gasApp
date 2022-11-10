import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasListComponent } from './components/gas-list/gas-list.component';

const routes: Routes = [
  {path:'main', component: GasListComponent},
  { path: "", redirectTo: "main", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

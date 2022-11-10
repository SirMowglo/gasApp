import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasListComponent } from './components/gas-list/gas-list.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  {path:'main', component: ViewComponent},
  { path: "", redirectTo: "main", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

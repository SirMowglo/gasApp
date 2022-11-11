import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GasListComponent } from './components/gas-list/gas-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewComponent } from './components/view/view.component';
import { MaterialImportsModule } from './modules/material-imports/material-imports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, GasListComponent, SidebarComponent, ViewComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MaterialImportsModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

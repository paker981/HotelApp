import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { MaterialModule } from '../Material/material.module';
import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';



@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    MaterialModule
  ]
})
export class DashboardAdminModule { }

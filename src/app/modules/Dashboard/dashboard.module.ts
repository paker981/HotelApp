import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../Material/material.module';
import { ContainerComponent } from './components/container/container.component';



@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule
  ],
})
export class DashboardModule { }

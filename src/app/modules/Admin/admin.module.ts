import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementFormComponent } from './components/advertisement-form/advertisement-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { Step1Component } from './components/advertisement-form/step1/step1.component';
import { Step2Component } from './components/advertisement-form/step2/step2.component';
import { Step3Component } from './components/advertisement-form/step3/step3.component';
import { Step4Component } from './components/advertisement-form/step4/step4.component';



@NgModule({
  declarations: [
    AdvertisementFormComponent,
    Step1Component, // TODO: rename
    Step2Component, // TODO: rename
    Step3Component, // TODO: rename
    Step4Component // TODO: rename
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule

  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Material/material.module';
import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { SummaryStepComponent } from './components/advertisement-form/summary-step/summary-step.component';
import { BasicInfoStepComponent } from './components/advertisement-form/basic-info-step/basic-info-step.component';
import { RoomsStepComponent } from './components/advertisement-form/rooms-step/rooms-step.component';
import { ServicesStepComponent } from './components/advertisement-form/services-step/services-step.component';
import { AdvertisementContainerComponent } from './components/advertisement-form/advertisement-container.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkStepper } from '@angular/cdk/stepper';



@NgModule({
  declarations: [
    AdvertisementContainerComponent,
    SummaryStepComponent,
    BasicInfoStepComponent,
    RoomsStepComponent,
    ServicesStepComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AdvertisementRoutingModule,
    SharedModule,
    CdkStepperModule
  ],
  providers: [
    CdkStepper
  ]
})
export class AdvertisementModule { }

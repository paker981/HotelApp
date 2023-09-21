import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateBackDirective } from './directives/navigateBack/navigate-back.directive';
import { AdminOnlyDirective } from './directives/adminOnly/admin-only.directive';
import { WorkerOnlyDirective } from './directives/workerOnly/worker-only.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// const elemnts= [

// ]

@NgModule({
  declarations: [
    NavigateBackDirective,
    AdminOnlyDirective,
    WorkerOnlyDirective
  ],
  imports: [
  
  ],
  exports: [
    NavigateBackDirective,
    AdminOnlyDirective,
    WorkerOnlyDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }

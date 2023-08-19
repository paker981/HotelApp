import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STORAGE_TOKEN } from './tokens/storage.token';
import { SessionStorageService } from './services/sessionStorageService.class';
import { AuthModule } from './modules/Auth/auth.module';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { MaterialModule } from './modules/Material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    CustomSnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: STORAGE_TOKEN, // STORAGE_SERVICE
      useClass: SessionStorageService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



// TODO: skróć sciezki importowania w ts
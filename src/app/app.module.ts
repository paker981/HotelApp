import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STORAGE_SERVICE } from './tokens/storage.token';
import { SessionStorageService } from './services/sessionStorageService.class';
import { AuthModule } from './modules/Auth/auth.module';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { MaterialModule } from './modules/Material/material.module';
import { TOKEN_GENERATOR } from './tokens/generator.token';
import { generateToken } from './helpers/token.generator';


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
      provide: STORAGE_SERVICE, // STORAGE_SERVICE
      useFactory: () => {
        return new SessionStorageService(window);
      }
    },
    {
      provide: TOKEN_GENERATOR,
      useValue: generateToken()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



// TODO: skróć sciezki importowania w ts
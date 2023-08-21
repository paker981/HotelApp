import { CanMatch, CanMatchFn } from '@angular/router';
import { AuthService } from '../../modules/Auth/services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../../interfaces/storage.interface';
import { roleMatcher } from '../../helpers/roleParser';
import { CustomSnackBarComponent } from '../../components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


export const workerdGuard: CanMatchFn = (route, segments) => {
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  const isLogged = authService.isLoggedIn(Role.WORKER);
  if(!isLogged){
    CustomSnackBarComponent.openErrorSnackBar(snackBar, 'First login!', 'Close')
    return false;
  }
  return isLogged;
};

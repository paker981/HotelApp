import { CanMatch, CanMatchFn } from '@angular/router';
import { AuthService } from '../../modules/Auth/services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../../interfaces/storage.interface';
import { roleMatcher } from '../../helpers/roleParser';
import { CustomSnackBarComponent } from '../../components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


export const canMatchDashboardGuard: CanMatchFn = (route, segments) => {
  const role = roleMatcher(segments[1].path);
  const snackBar = inject(MatSnackBar);
  if(!role){
    CustomSnackBarComponent.openErrorSnackBar(snackBar,'Bad request/No path!','Close');
    return false;
  }
  const authService = inject(AuthService);

  const isLogged = authService.isLoggedIn(role)
  if(!isLogged){
    CustomSnackBarComponent.openErrorSnackBar(snackBar, 'First login!', 'Close')
    return false;
  }
  return isLogged;
};

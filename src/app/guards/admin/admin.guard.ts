import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { rolePattern } from 'src/app/app.component';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { roleMatcher } from 'src/app/helpers/roleParser';
import { Role } from 'src/app/interfaces/storage.interface';
import { AuthService } from 'src/app/modules/Auth/services/auth.service';

export const adminGuard: CanMatchFn = (route, segments) => {
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);
  

  const isAdmin = authService.isLoggedIn(Role.ADMIN)
  if(!isAdmin){
    CustomSnackBarComponent.openErrorSnackBar(snackBar, 'Only admin access!', 'Close')
    return false;
  }
  return isAdmin;
};

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
  const router = inject(Router);
  const previousUrl = router.routerState.snapshot.url;
  
  const role = roleMatcher(previousUrl.match(rolePattern)![1])
  const isAdmin = authService.isAdmin()
  if(!isAdmin || !(role === Role.ADMIN) ){
    
    const returnUrlTree = router.parseUrl(previousUrl); 
    CustomSnackBarComponent.openErrorSnackBar(snackBar, 'Only admin access!', 'Close')
    return returnUrlTree;
  }
  return isAdmin;
};

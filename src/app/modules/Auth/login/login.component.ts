import { Component } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/storage.interface';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { roleMatcher } from '@app/helpers/roleParser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected form: FormControl<string> = new FormControl('', Validators.required) as FormControl<string>;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  protected login(): void{
    const login = this.form.value
    const typeOfUser = roleMatcher(login);
    if(!typeOfUser){
      CustomSnackBarComponent.openErrorSnackBar(this.snackBar,'Wrong input data!','Close');
      return;
    }
    this.authService.log(typeOfUser);
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar, 'Logged in', 'Close');
    typeOfUser === Role.WORKER ? this.router.navigate(['dashboard']) : this.router.navigate(['dashboard-admin'])
  }

}

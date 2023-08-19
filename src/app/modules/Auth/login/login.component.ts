import { Component } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/storage.interface';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    const isValid = login === Role.ADMIN || login === Role.WORKER;
    this.form.reset();
    if(!isValid){
      CustomSnackBarComponent.openErrorSnackBar(this.snackBar,'Wrong input data!','Close');
      return;
    }
    this.authService.log(login);
    this.router.navigate(['/dashboard',login])
  }

}

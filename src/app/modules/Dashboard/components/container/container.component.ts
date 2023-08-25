import { Component } from '@angular/core';
import { AuthService } from '@app/modules/Auth/services/auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  constructor(private authService: AuthService){}

  onLogout(){
    this.authService.logOut();
  }

}

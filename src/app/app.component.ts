import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const rolePattern = /\/dashboard\/([^/]+)\/.*/; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected title = 'HotelApp';
  protected role = null

  constructor(private router: Router, private route: ActivatedRoute) {
    // Subskrybuj zdarzenie NavigationEnd, aby śledzić zmiany adresu URL
  }

  protected navigateToDashboard(){
    const matches = this.matchRole()
    if (!matches ) {
      return;
    }
    const role = matches[1];
    this.router.navigate([`/dashboard/${role}`]);
  }

  protected navigateToAdvertisement(){
    const matches = this.matchRole()
    if (!matches ) {
      return;
    }
    const role = matches[1];
    this.router.navigate([`/dashboard/${role}/advertisement`]);
  }

  private matchRole(){
    const url = this.router.routerState.snapshot.url // Wyrażenie regularne do dopasowania "role"
    return url.match(rolePattern);
  }
}

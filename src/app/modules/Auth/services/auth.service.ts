import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { generateToken } from 'src/app/helpers/token.generator';
import { AbstractStorageService, Role } from 'src/app/interfaces/storage.interface';
import { STORAGE_TOKEN } from 'src/app/tokens/storage.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(STORAGE_TOKEN) private storageService: AbstractStorageService,
    private router: Router
    ) { }

  log(login: Role) {
    const newToken = generateToken();
    this.storageService.saveData(login, newToken)
  }

  logOut(){
    this.storageService.clear()
  }

  isLoggedIn(role: Role): boolean{
    const token = this.storageService.getData(role);
    return token.length === 32 ? true : false;
  }
}

import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../../../../interfaces/storage.interface';
import { AuthService } from '../../../Auth/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[adminOnly]'
})
export class AdminOnlyDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    // private templateRef: ElementRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  get viewContainerRef() {
    return this.viewContainer;
  }

  ngOnInit() {
    const isAdmin = this.authService.isLoggedIn(Role.ADMIN);

    if(!isAdmin){
      this.viewContainer.clear();
      return;
    }
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

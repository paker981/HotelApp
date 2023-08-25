import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '@app/interfaces/storage.interface';
import { AuthService } from '@app/modules/Auth/services/auth.service';
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

  ngOnInit() {
    const isAdmin = this.authService.isLoggedIn(Role.ADMIN);

    if(!isAdmin){
      this.viewContainer.clear();
      return;
    }
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

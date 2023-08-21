import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '@app/interfaces/storage.interface';
import { AuthService } from '@app/modules/Auth/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[workerOnly]'
})
export class WorkerOnlyDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const isWorker = this.authService.isLoggedIn(Role.WORKER);

    console.log(isWorker);
    if(!isWorker){
      this.viewContainer.clear();
      return;
    }
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

}

import { ChangeDetectorRef, Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '@app/interfaces/storage.interface';
import { AuthService } from '@app/modules/Auth/services/auth.service';

@Directive({
  selector: '[workerOnly]'
})
export class WorkerOnlyDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  get viewContainerRef() {
    return this.viewContainer;
  }

  ngOnInit() {
    const isWorker = this.authService.isLoggedIn(Role.WORKER);
    if(!isWorker){
      this.viewContainer.clear();
      return
    } 
    this.viewContainer.createEmbeddedView(this.templateRef);

  }

}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/Auth/login/login.component';
import { canMatchDashboardGuard } from './guards/dashboard/can-load-dashboard.guard';
import { AdminPreloadStrategy } from './modules/Auth/preloading/adminPreloadStrategy.class';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard/:role',
    loadChildren: () => import('./modules/Dashboard/dashboard.module').then(m => m.DashboardModule), 
    canMatch: [canMatchDashboardGuard]
  },
  {
    path: 'dashboard/admin',
    loadChildren: () => import('./modules/Dashboard/dashboard.module').then(m => m.DashboardModule), 
    canMatch: [canMatchDashboardGuard]
  },
  {
    path: 'dashboard/user',
    loadChildren: () => import('./modules/Dashboard/dashboard.module').then(m => m.DashboardModule), 
    canMatch: [canMatchDashboardGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];
// /dashboard
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: AdminPreloadStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

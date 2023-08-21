import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/Auth/login/login.component';
import { AdminPreloadStrategy } from './modules/Auth/preloading/adminPreloadStrategy.class';
import { workerdGuard } from './guards/worker/worker.guard';
import { adminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/Dashboard/dashboard.module').then(m => m.DashboardModule), 
    canMatch: [workerdGuard]
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./modules/dashboard-admin/dashboard-admin.module').then(m=>m.DashboardAdminModule),
    canMatch: [adminGuard]
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

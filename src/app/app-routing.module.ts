import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./modules/form/form.module')).FormModule,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadChildren: async () =>
      (await import('./modules/profile/profile.module')).ProfileModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

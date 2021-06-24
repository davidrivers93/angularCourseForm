import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './modules/form/form/form-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./modules/form/form.module')).FormModule,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

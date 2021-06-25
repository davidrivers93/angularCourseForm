import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProfilePageComponent,
  },
  {
    path: '',
    redirectTo: ':id',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProfileRoutingModule {}

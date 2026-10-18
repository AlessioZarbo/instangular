import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Overview } from './pages/home-page/overview/overview';
import { Profile } from './pages/profile/profile/profile';

const routes: Routes = [
  { 
    path: 'homepage', 
    component: Overview
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: '**',
    redirectTo: 'homepage',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

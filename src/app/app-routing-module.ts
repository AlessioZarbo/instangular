import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Overview } from '../modules/home-page/overview/overview';

const routes: Routes = [
  { 
    path: 'overview', 
    component: Overview
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

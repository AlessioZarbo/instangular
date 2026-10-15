import { NgModule } from '@angular/core';
import { HomePageModule } from './home-page/home-page-module';

@NgModule({
  imports: [HomePageModule],
  exports: [HomePageModule],
})
export class PagesModule {}

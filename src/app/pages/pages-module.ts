import { NgModule } from '@angular/core';
import { HomePageModule } from './home-page/home-page-module';
import { ProfileModule } from './profile/profile-module';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [HomePageModule, ProfileModule, SharedModule],
  exports: [HomePageModule, ProfileModule],
})
export class PagesModule {}

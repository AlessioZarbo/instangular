import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from './post/post';
import { Overview } from './overview/overview';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Post, Overview],
  imports: [CommonModule, SharedModule],
})
export class HomePageModule {}

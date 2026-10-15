import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../../app/shared/search-bar/search-bar';
import { Post } from './post/post';
import { Overview } from './overview/overview';

@NgModule({
  declarations: [SearchBar, Post, Overview],
  imports: [CommonModule],
})
export class HomePageModule {}

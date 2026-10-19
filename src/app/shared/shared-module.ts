import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from './navbar/navbar';
import { SearchBar } from './search-bar/search-bar';
import { Post } from './post/post';

@NgModule({
  declarations: [Navbar, SearchBar, Post],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  exports: [Navbar, SearchBar, Post],
})
export class SharedModule {}

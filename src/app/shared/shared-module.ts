import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from './navbar/navbar';
import { SearchBar } from './search-bar/search-bar';

@NgModule({
  declarations: [Navbar, SearchBar],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [Navbar, SearchBar],
})
export class SharedModule {}

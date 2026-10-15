import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { SearchBar } from './search-bar/search-bar';

@NgModule({
  declarations: [Navbar, SearchBar],
  imports: [CommonModule],
  exports: [Navbar, SearchBar],
})
export class SharedModule {}

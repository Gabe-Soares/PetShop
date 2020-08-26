import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MenuContentComponent } from './menu-content/menu-content.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule
  ],
  providers: [],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }

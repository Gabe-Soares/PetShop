import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeModule } from './components/home/home.module';
import { SharedModule } from './components/shared/shared.module';
import { LoginModule } from './components/login/login.module';
import { PetsModule } from './components/pets/pets.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule,
    SharedModule,
    PetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

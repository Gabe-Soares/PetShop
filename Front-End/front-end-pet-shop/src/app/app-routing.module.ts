import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { PetsComponent } from './components/pets/pets/pets.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'pets',
        pathMatch: 'full'
      },
      {
        path: 'pets',
        component: PetsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

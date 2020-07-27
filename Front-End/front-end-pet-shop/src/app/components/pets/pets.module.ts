import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


import { AddPetComponent } from './add-pet/add-pet.component';
import { PetsComponent } from './pets/pets.component';
import { DialogAddPetComponent } from './dialogs/dialog-add-pet/dialog-add-pet.component';
import { ListMyPetsComponent } from './list-my-pets/list-my-pets.component';



@NgModule({
  declarations: [AddPetComponent, PetsComponent, DialogAddPetComponent, ListMyPetsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    PetsComponent
  ]
})
export class PetsModule { }

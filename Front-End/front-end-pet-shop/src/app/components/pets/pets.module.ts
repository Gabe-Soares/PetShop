import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';


import { PetsComponent } from './pets/pets.component';
import { DialogAddPetComponent } from './dialogs/dialog-add-pet/dialog-add-pet.component';
import { PetsService } from './pets.service';
import { DialogUpdatePetComponent } from './dialogs/dialog-update-pet/dialog-update-pet.component';
import { DialogDeletePetComponent } from './dialogs/dialog-delete-pet/dialog-delete-pet.component';



@NgModule({
  declarations: [PetsComponent, DialogAddPetComponent, DialogUpdatePetComponent, DialogDeletePetComponent],
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
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [
    PetsComponent
  ],
  providers: [
    PetsService
  ]
})
export class PetsModule { }

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/components/login/login.service';
import { Pet } from 'src/app/models/PetModel';
import { PetsService } from '../../pets.service';

@Component({
  selector: 'app-dialog-update-pet',
  templateUrl: './dialog-update-pet.component.html',
  styleUrls: ['./dialog-update-pet.component.scss']
})
export class DialogUpdatePetComponent implements OnInit {

  formUpdatePet: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pet, 
  private fb: FormBuilder, 
  private userServ: LoginService, 
  private petsService: PetsService,
  public dialogRef: MatDialogRef<any>) { 
  }
  petUpdate: Pet;
  ngOnInit(): void {
    this.petUpdate = this.data;
  }
  updatePet(){
    this.petsService.updatePet({
      pet_name_old: this.petUpdate.Name, 
			name: this.data.Name, 
			owner: this.userServ.user.user, 
			species: this.data.Species, 
			race: this.data.Race, 
			age: this.data.Age, 
			obs: this.data.Obs
    }).subscribe(
      data => this.dialogRef.close(true),
      err => this.dialogRef.close(false)
    )
  }
}

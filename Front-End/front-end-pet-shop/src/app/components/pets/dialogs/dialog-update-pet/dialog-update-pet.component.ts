import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from 'src/app/models/PetModel';
import { PetsService } from '../../pets.service';

@Component({
  selector: 'app-dialog-update-pet',
  templateUrl: './dialog-update-pet.component.html',
  styleUrls: ['./dialog-update-pet.component.scss']
})
export class DialogUpdatePetComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pet,
  private petsService: PetsService,
  public dialogRef: MatDialogRef<any>) { 
  }
  petNameOld: string;
  ngOnInit(): void {
    this.petNameOld = this.data.Name;
  }
  updatePet(){
    this.petsService.updatePet({
      pet_name_old: this.petNameOld, 
			name: this.data.Name, 
			owner: this.data.Owner, 
			species: this.data.Species, 
			race: this.data.Race, 
			age: this.data.Age, 
			obs: this.data.Obs
    }).subscribe(
      data => {
        console.log(data)
        this.dialogRef.close(true)
      },
      err => {
        console.error(err)
        this.dialogRef.close(false)
      }
    )
  }
}

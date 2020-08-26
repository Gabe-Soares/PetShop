import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from 'src/app/models/PetModel';
import { PetsService } from '../../pets.service';

@Component({
  selector: 'app-dialog-delete-pet',
  templateUrl: './dialog-delete-pet.component.html',
  styleUrls: ['./dialog-delete-pet.component.scss']
})
export class DialogDeletePetComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pet,
  private petsService: PetsService,
  public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  deletePet(){
    this.petsService.deletePet({
      name: this.data.Name, 
      owner: this.data.Owner
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

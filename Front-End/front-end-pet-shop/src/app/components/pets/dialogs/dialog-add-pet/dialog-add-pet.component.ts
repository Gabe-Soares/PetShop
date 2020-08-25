import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/components/login/login.service';
import { Pet } from 'src/app/models/PetModel';
import { PetsService } from '../../pets.service';

@Component({
  selector: 'app-dialog-add-pet',
  templateUrl: './dialog-add-pet.component.html',
  styleUrls: ['./dialog-add-pet.component.scss']
})
export class DialogAddPetComponent implements OnInit {

  formAddPets: FormGroup;
  subcription: Subscription[] = [];
  constructor(
    private fb: FormBuilder, 
    private petService: PetsService, 
    private useService: LoginService, 
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.createFormAddPets();
  }
  ngOnDestroy(): void {
    this.subcription.forEach(e => e.unsubscribe());
  }

  createFormAddPets(){
    this.formAddPets = this.fb.group({
      name: ['', Validators.required],
      owner: this.useService.user.user,
      species: ['', Validators.required],
      race: ['', Validators.required],
      age: ['', Validators.required],
      obs: ['', Validators.required]
    })
  }

  addPet(){
    if(this.formAddPets.valid){
      this.subcription.push(
        this.petService.addNewPet(this.formAddPets.value)
        .subscribe( () => this.dialogRef.close(true),
        err => this.dialogRef.close(false)));
    }else{
      console.log('invalid forms')
    }
  }

}

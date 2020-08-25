import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/PetModel';

const URL = 'http://localhost:3000/pets';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) { }

  addNewPet(pet: Pet){
    return this.http.post(`${URL}/add`, pet);
  }
}

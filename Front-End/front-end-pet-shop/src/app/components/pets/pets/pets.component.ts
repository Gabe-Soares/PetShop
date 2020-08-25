import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Pet } from '../../../models/PetModel';
import { LoginService } from '../../login/login.service';
import { DialogAddPetComponent } from '../dialogs/dialog-add-pet/dialog-add-pet.component';
import { DialogUpdatePetComponent } from '../dialogs/dialog-update-pet/dialog-update-pet.component';
import { PetsService } from '../pets.service';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Specie', 'Age', 'Race', 'Obs', 'Options'];
  dataSource: MatTableDataSource<Pet>;
  subcription: Subscription[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, 
    private _snackBar: MatSnackBar,
    private petsService: PetsService,
    private userService: LoginService) {
  }

  ngOnInit() {
    this.initTable();
  }
  ngOnDestroy(): void {
    this.subcription.forEach(e => e.unsubscribe())
  }

  initTable(){
    this.dataSource = new MatTableDataSource();
    this.subcription.push(
      this.petsService.getAllPetsOwner(this.userService.user.user)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(resp)
      })
    )
  }

  openDialogAddPet(){
    const dialogRef = this.dialog.open(DialogAddPetComponent);

    this.subcription.push(dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.openSnackBar('Pet not registred', 'close', result);
      }else{
        this.openSnackBar('Pet successfully registered', 'close', result);
        this.initTable();
      }
    }));
  }

  openDialogUpdatePet(row){
    console.log(row);
    const dialogRef = this.dialog.open(DialogUpdatePetComponent, {
      data: {
        Name: row.name,
        Species: row.species,
        Race: row.race,
        Age: row.age,
        Obs: row.obs,
        Owner: this.userService.user.user
      }
    });

    this.subcription.push(dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.openSnackBar('Pet not registred', 'close', result);
      }else{
        this.openSnackBar('Pet successfully registered', 'close', result);
        this.initTable();
      }
    }));
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openSnackBar(message: string, action: string, stateAction: boolean) {
    if(!stateAction){
      this._snackBar.open(message, action, {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "bottom"
      });
    }
  }
}
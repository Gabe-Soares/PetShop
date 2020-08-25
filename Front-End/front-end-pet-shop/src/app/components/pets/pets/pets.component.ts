import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Pet } from '../../models/PetModel';
import { DialogAddPetComponent } from '../dialogs/dialog-add-pet/dialog-add-pet.component';



export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'NickName', 'Age', 'Type', 'Breed'];
  dataSource: MatTableDataSource<Pet>;
  subcription: Subscription[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, 
    private _snackBar: MatSnackBar) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy(): void {
    this.subcription.forEach(e => e.unsubscribe())
  }

  openDialogAddPet(){
    const dialogRef = this.dialog.open(DialogAddPetComponent);

    this.subcription.push(dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.openSnackBar('Pet not registred', 'close', result)
      }else{
        this.openSnackBar('Pet successfully registered', 'close', result)
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

/** Builds and returns a new User. */
function createNewUser(id: number): Pet {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    Id: id,
    Name: name,
    NickName: Math.round(Math.random() * 100).toString(),
    Age: Math.round(Math.random() * (NAMES.length - 1)),
    Type: Math.round(Math.random() * 100).toString(),
    Breed: Math.round(Math.random() * 100).toString(),
    Owner: ''
  };
}

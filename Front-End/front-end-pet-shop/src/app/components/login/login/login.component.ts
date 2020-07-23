import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import { Users } from '../../shared/models/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  user: Users;
  hide: boolean = true;
  loginForm: FormGroup;

  constructor(
    private authService: LoginService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
    ) {}


  ngOnInit(): void {
     this.formClear();
  }
  ngAfterViewInit() {
    
  }
  onSubmit(){
    if(this.loginForm.valid){
      this.authService.validateUser(this.loginForm.value)
      .subscribe(auth => {
        if(!auth){
          this.openSnackBar('Invalid user', 'close', false);
        }else{
          this.authService.setIsLogIn(true);
        }
        if(this.authService.getIsLogIn()){
          this.router.navigate(['/home']);
        }
      });
    }
  }
  formClear(){
    this.loginForm = this.fb.group({
      user: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      password: [null, [Validators.required, Validators.maxLength(255)]]
    });
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
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAuth } from '../../models/UserAuthModel';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  user: UserAuth;
  hide: boolean = true;
  loginForm: FormGroup;

  constructor(
    private authService: LoginService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
    ) {}
  ngOnInit(): void {
    this.authService.setUser(null)
    this.formClear();
    console.log(this.authService.getUser())
  }
  ngAfterViewInit() {
    
  }
  onSubmit(){
    if(this.loginForm.valid){
      this.authService.validateUser(this.loginForm.value)
      .subscribe(auth => {
        if(auth){
          this.authService.setUser(auth)
        }
        if(this.authService.getUser()){
          this.authService.setUser(this.authService.getUser())
          this.router.navigate(['/home']);
        }
      }, error => {
        if(error.status === 401)
          this.openSnackBar('Invalid user', 'close', false);
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
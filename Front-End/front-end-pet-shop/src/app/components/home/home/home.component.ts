import { Input, Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myElement: HTMLElement = document.getElementById("sideNav");
  @Output() openMenu = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(document.getElementById("sideNav"))
  }

}


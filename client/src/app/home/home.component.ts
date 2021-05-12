import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode : boolean =false;
  Users: any;
  constructor(private http: HttpClient) { 

  }

  ngOnInit(): void {
    this.getUsers();
  }

  toggleRegisterMode(){
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe(users => {
      this.Users= users;
      console.log(users);
    },error=>console.log(error));
    console.log(this.Users)
  }

  cancelRegister(event:boolean) {
    this.registerMode = event;
  }

}

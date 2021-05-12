import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '_Interfaces/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any ={}
  //isLoggedIn : boolean;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(options=>{
      console.log(options);
    },error=>{
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
  }

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user =>{
  //     this.isLoggedIn = !!user
  //   }, error => {
  //     console.log(error)
  //   });
  // }

}

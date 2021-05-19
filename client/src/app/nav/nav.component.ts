import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService,private router: Router,private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(options=>{
      console.log(options);
      this.router.navigateByUrl('/members')
    },error=>{
      this.toaster.error(error.error);
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user =>{
  //     this.isLoggedIn = !!user
  //   }, error => {
  //     console.log(error)
  //   });
  // }

}

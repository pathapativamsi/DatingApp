import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent:any;

  @Output() CancelRegister = new EventEmitter();

  model: any = {}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(user =>{
      console.log(user)
    },err => console.log(err))
  }

  cancel(){
    this.CancelRegister.emit(false);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService,private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(user =>{
      console.log(user)
    },err => this.toaster.error(err.error));
  }

  cancel(){
    this.CancelRegister.emit(false);
  }

}

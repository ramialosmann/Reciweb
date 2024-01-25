import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any = {};

  constructor(private accservice : AccountService, private router : Router, private toastr : ToastrService) {

  }
  ngOnInit(): void {

  }

  Login() {
    this.accservice.Login(this.model).subscribe({
      next : () => {
        this.toastr.success("Welcome Back ," + this.model.username + " ! " );
        this.router.navigateByUrl("/myrecipes");
      },
      error : error => console.log(error)
    })
  }

}

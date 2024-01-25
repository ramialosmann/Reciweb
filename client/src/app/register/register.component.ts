import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : any = {};
  
  constructor(private accservice : AccountService, private router : Router, private toastr : ToastrService) {

  }

  ngOnInit(): void {

  }
  
  Register() {
    this.accservice.Register(this.model).subscribe({
      next : () => {
        this.toastr.success("Welcome to ReciWeb! " + this.model.username);
        this.router.navigateByUrl("/myrecipes");
      },
      error : error => console.log(error)
    })
  }

}

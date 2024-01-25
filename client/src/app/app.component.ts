import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReciWeb';


  constructor(private accservice : AccountService, private router : Router, private toastr : ToastrService) {
  
  }

  ngOnInit(): void {
     this.SetUserState();
  }

  SetUserState() {
    const userstring = localStorage.getItem('user');
    if(!userstring) return;
    const user = JSON.parse(userstring);
    this.accservice.SetCurrentUser(user);
  }


}

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public accservice : AccountService, private router : Router, private memberservice : MemberService) {

  }
  ngOnInit(): void {

  }

  logout() {
    this.accservice.Logout();
    this.router.navigateByUrl('/')
  }

  NavigateToMyRecipes() {
     const userstring = localStorage.getItem('user');
     if(!userstring) return;
     const user = JSON.parse(userstring);
     this.router.navigateByUrl(user.username + '/myrecipes');
  }
}

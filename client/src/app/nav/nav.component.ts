import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private accservice : AccountService) {

  }
  ngOnInit(): void {
    
  }

  logout() {
    this.accservice.Logout();
  }
}

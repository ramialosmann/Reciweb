import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  member : Member | undefined;
  user : User | null = null;
  categories= [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Apperizers',
    'Desserts',
    'Snacks',
    'Vegeterian',
    'Chinese',
    'Italian',
    
  ]

  constructor(private accservice : AccountService, private memberservice : MemberService) {
      this.accservice.currentuser$.pipe(take(1)).subscribe({
        next : user => this.user = user
      })
  }
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if(!this.user) return;
    this.memberservice.getMember(this.user.username).subscribe({
      next : member => this.member = member
    })
  }
}

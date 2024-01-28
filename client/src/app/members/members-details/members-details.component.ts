
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css'],

})
export class MembersDetailsComponent implements OnInit {
  member : Member | undefined;

  constructor(private memberservice : MemberService, private route : ActivatedRoute) {

  }
  ngOnInit(): void {
    this.loadMember();

  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberservice.getMember(username).subscribe({
      next : member => {
        this.member = member;
        
      }
    })
  }



}

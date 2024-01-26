import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  members : Member[] = [];

  constructor(private memberservice : MemberService) {

  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberservice.getMembers().subscribe({
      next : members => this.members = members,
    })
  }

}

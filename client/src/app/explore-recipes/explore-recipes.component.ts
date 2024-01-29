import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/Member';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['./explore-recipes.component.css']
})
export class ExploreRecipesComponent implements OnInit  {

  members : Member[] = [];

  constructor(private memberservice : MemberService) {

  }
  ngOnInit(): void {
   this.loadMembers();
  }

  loadMembers() {
    this.memberservice.getMembers().subscribe({
      next : members => this.members = members
    })
  }

}

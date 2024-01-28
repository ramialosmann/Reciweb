
import { Component, OnInit } from '@angular/core';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { Recipe } from 'src/app/_models/Recipe';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
})
export class MyRecipesComponent implements OnInit {
  member : Member | undefined;
  user : User | null = null;
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

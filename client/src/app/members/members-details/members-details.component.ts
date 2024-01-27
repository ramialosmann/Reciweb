import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Member } from 'src/app/_models/Member';
import { Recipe } from 'src/app/_models/Recipe';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css']
})
export class MembersDetailsComponent implements OnInit {
  member : Member | undefined;
  recipe : Recipe | undefined;
  recipes : Recipe[] = [];
  ingredients : Ingredient[] = []
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
        this.getRecipes();
      }
    })
  }

  getRecipes() {
     if(!this.member) return;
     for(const recipe of this.member.recipes) {
      this.recipe = recipe;
      this.getIngredients();
      this.recipes.push(recipe)
     }
  }
  getIngredients() {
    if(!this.recipe) return;
    for(const ingredient of this.recipe?.ingredients) {
      this.ingredients.push(ingredient);
    }
  }

}

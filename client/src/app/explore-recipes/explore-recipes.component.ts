import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/Member';
import { MemberService } from '../_services/member.service';
import { RecipeService } from '../_services/recipe.service';
import { Recipe } from '../_models/Recipe';

@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['./explore-recipes.component.css']
})
export class ExploreRecipesComponent implements OnInit  {

  recipes : Recipe[] = [];
  members : Member[] = [];

  constructor(private recipeService : RecipeService , private memberService : MemberService) {

  }
  ngOnInit(): void {
   this.loadRecipes();
   this.loadMembers();
  }

  loadRecipes() {
    this.recipeService.GetRecipes().subscribe({
      next : recipes => this.recipes = recipes
    })
  }
  loadMembers() {
    this.memberService.getMembers().subscribe({
      next : members => this.members = members
    })
  }

  CompareMemberAndRecipe(recipe : Recipe, member : Member) {
        for(let recipe2 of member.recipes) {
          return recipe.id == recipe2.id
        }
    return;
  }

}

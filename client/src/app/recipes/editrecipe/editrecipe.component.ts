import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { findIndex } from 'rxjs';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Member } from 'src/app/_models/Member';
import { Recipe } from 'src/app/_models/Recipe';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['./editrecipe.component.css']
})
export class EditrecipeComponent implements OnInit {
  @ViewChild('EditRecipeForm')  editform : NgForm | undefined;
  @HostListener('window:beforeunload' , ['$event']) unloadnotfication($event : any) {
    if(this.editform?.dirty) $event.returnValue =  true;
  }
  member : Member | undefined;
  recipe : Recipe | undefined;


  constructor(private memberservice : MemberService , private route : ActivatedRoute) {

  }
  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberservice.getMember(username).subscribe({
      next : member => {
        this.member = member
        this.loadRecipe();
      
      }
    })
  }

  loadRecipe() {
    const title = this.route.snapshot.paramMap.get('title');
    this.recipe = this.member?.recipes.find(x => x.title == title);
    console.log(this.recipe);

  }

  AddIngredient() {
    if(!this.recipe) return;
    const ingredient : Ingredient = {name : '', id : this.recipe?.ingredients.length+1};
    this.recipe.ingredients.push(ingredient);
  }
  RemoveIngredient(ingredientVar: Ingredient) {

    const ingredientToRemove: Ingredient = { name: ingredientVar.name, id: ingredientVar.id };

    const indexToRemove = this.recipe?.ingredients.findIndex(
        (ingredient: Ingredient) => ingredient.id === ingredientToRemove.id
    );

    if (indexToRemove !== undefined && indexToRemove !== -1) {
        this.recipe?.ingredients.splice(indexToRemove, 1);
    }
}

  
}


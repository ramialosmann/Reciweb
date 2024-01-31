import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Member } from 'src/app/_models/Member';
import { Recipe } from 'src/app/_models/Recipe';
import { MemberService } from 'src/app/_services/member.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['./editrecipe.component.css']
})
export class EditrecipeComponent implements OnInit {
  @ViewChild('editrecipeform')  editform : NgForm | undefined;
  @HostListener('window:beforeunload' , ['$event']) unloadnotfication($event : any) {
    if(this.editform?.dirty) $event.returnValue =  true;
  }
  member : Member | undefined;
  recipe : Recipe | undefined;


  constructor(private memberservice : MemberService, private recipeservice : RecipeService ,
              private route : ActivatedRoute, private toastr : ToastrService) {

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
    const ingredient : Ingredient = { name : '' };
    this.recipe.ingredients.push(ingredient); 
    this.editform?.control.markAsDirty()
  }
  
  DeleteIngredient(ingredient : Ingredient) {
     if(!this.recipe) return;
     if(this.recipe.ingredients.length == 1) { 
      this.toastr.error("Your recipe must have at least 1 ingredient");
     }
     const indextoremove = this.recipe.ingredients.findIndex(ing => ing.name == ingredient.name);
     if(!indextoremove) return;
     this.editform?.control.markAsDirty()
     this.recipe.ingredients.splice(indextoremove, 1);


  }

  EditRecipe() {
    if(!this.member) return;
     this.recipeservice.EditRecipe(this.editform?.value).subscribe({
        next : () => {
          this.toastr.success("Recipe Updated Succesfully");
          this.editform?.reset(this.recipe);
        },
        error : error => console.log(error)
     })
  }
  
  }


  



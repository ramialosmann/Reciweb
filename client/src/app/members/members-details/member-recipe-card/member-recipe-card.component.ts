import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/_models/Ingredient';
import { Recipe } from 'src/app/_models/Recipe';

@Component({
  selector: 'app-member-recipe-card',
  templateUrl: './member-recipe-card.component.html',
  styleUrls: ['./member-recipe-card.component.css']
})
export class MemberRecipeCardComponent implements OnInit {
  @Input() recipe : Recipe | undefined;


  ngOnInit(): void {

  }

}

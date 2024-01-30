import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Recipe } from '../_models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  GetRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl + 'recipes')
  }
}

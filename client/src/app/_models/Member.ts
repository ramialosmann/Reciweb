
import { Recipe } from "./Recipe";

export interface Member {
    id: number;
    username: string;
    profilePhotoUrl : string;
    about : string;
    recipes: Recipe[];
  }
  

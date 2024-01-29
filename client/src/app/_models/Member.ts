
import { Recipe } from "./Recipe";

export interface Member {
    id: number;
    username: string;
    name : string;
    age : number;
    profilePhotoUrl : string;
    about : string;
    specialities : string;
    recipes: Recipe[];
  }
  

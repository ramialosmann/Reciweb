import { Ingredient } from "./Ingredient";
import { Photo } from "./Photo";


export interface Recipe {
    id: number;
    isPublic : boolean;
    title: string;
    mainPhotoUrl : string;
    ingredients: Ingredient[];
    instructions: string;
    category: string;
    photos: Photo[];
}

import { Ingredient } from "./Ingredient";
import { Photo } from "./Photo";


export interface Recipe {
    id: number;
    title: string;
    ingredients: Ingredient[];
    instructions: string;
    category: string;
    photos: Photo[];
}

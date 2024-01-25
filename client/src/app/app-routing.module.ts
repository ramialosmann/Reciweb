import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './_guards/auth.guard';
import { MyRecipesComponent } from './recipes/my-recipes/my-recipes.component';
import { EditrecipeComponent } from './recipes/editrecipe/editrecipe.component';
import { CreaterecipeComponent } from './recipes/createrecipe/createrecipe.component';

const routes: Routes = [
  {path: '' , component:HomeComponent},
  {path:'',
   runGuardsAndResolvers:'always',
   canActivate: [authGuard],
   children: [
    {path:'myrecipes' , component:MyRecipesComponent},
    {path:'myrecipes/editrecipe' , component:EditrecipeComponent},
    {path:'myrecipes/createrecipe' , component:CreaterecipeComponent}
   ]
  },
  {path: 'register' , component:RegisterComponent},
  {path: 'login' , component:LoginComponent},
  {path: '**' , component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

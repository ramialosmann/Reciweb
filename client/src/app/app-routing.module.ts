import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './_guards/auth.guard';
import { MyRecipesComponent } from './recipes/my-recipes/my-recipes.component';
import { EditrecipeComponent } from './recipes/editrecipe/editrecipe.component';
import { CreaterecipeComponent } from './recipes/createrecipe/createrecipe.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailsComponent } from './members/members-details/members-details.component';
import { EditProfileComponent } from './members/edit-profile/edit-profile.component';
import { ExploreRecipesComponent } from './explore-recipes/explore-recipes.component';
import { preventunsavededitGuard } from './_guards/preventunsavededit.guard';

const routes: Routes = [
  {path: '' , component:HomeComponent},
  {path:'',
   runGuardsAndResolvers:'always',
   canActivate: [authGuard],
   children: [
    {path:':username/myrecipes' , component:MyRecipesComponent},
    {path:':username/myrecipe/editrecipe/:title' , component:EditrecipeComponent , canDeactivate: [preventunsavededitGuard]},
    {path:':username/myrecipe/new/createrecipe' , component:CreaterecipeComponent},
    {path: 'members' , component:MembersListComponent},
    {path: 'members/:username' , component:MembersDetailsComponent},
    {path:'member/editprofile' , component:EditProfileComponent, canDeactivate : [preventunsavededitGuard]},
    {path:'explore' , component:ExploreRecipesComponent},
   ]
  },
  {path: 'register' , component:RegisterComponent},
  {path: 'login' , component:LoginComponent},
  {path: '**' , component:HomeComponent, pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

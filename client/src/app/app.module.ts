import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyRecipesComponent } from './recipes/my-recipes/my-recipes.component';
import { CreaterecipeComponent } from './recipes/createrecipe/createrecipe.component';
import { EditrecipeComponent } from './recipes/editrecipe/editrecipe.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { SharedModule } from './_modules/shared.module';
import { EditProfileComponent } from './members/edit-profile/edit-profile.component';
import { MembersDetailsComponent } from './members/members-details/members-details.component';
import { ExploreRecipesComponent } from './explore-recipes/explore-recipes.component';
import { RecipeCardComponent } from './explore-recipes/recipe-card/recipe-card.component';
import { EditIngredientsComponent } from './recipes/editrecipe/edit-ingredients/edit-ingredients.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MyRecipesComponent,
    CreaterecipeComponent,
    EditrecipeComponent,
    MembersListComponent,
    MemberCardComponent,
    MembersDetailsComponent,
    EditProfileComponent,
    ExploreRecipesComponent,
    RecipeCardComponent,
    EditIngredientsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass:ErrorInterceptor , multi:true},
    {provide : HTTP_INTERCEPTORS , useClass:JwtInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

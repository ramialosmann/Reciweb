import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyRecipesComponent } from './recipes/my-recipes/my-recipes.component';
import { CreaterecipeComponent } from './recipes/createrecipe/createrecipe.component';
import { EditrecipeComponent } from './recipes/editrecipe/editrecipe.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailsComponent } from './members/members-details/members-details.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

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
    MembersDetailsComponent,
    MemberCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(
      {positionClass : 'toast-bottom-right'}
    )
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS , useClass:ErrorInterceptor , multi:true},
    {provide : HTTP_INTERCEPTORS , useClass:JwtInterceptor , multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

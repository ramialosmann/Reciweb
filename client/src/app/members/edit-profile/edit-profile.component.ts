import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { Recipe } from 'src/app/_models/Recipe';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('EditForm')  editform : NgForm | undefined;
  @HostListener('window:beforeunload' , ['$event']) unloadnotfication($event : any) {
    if(this.editform?.dirty) $event.returnValue =  true;
  }
  member : Member | undefined;
  user : User | null = null;
  modalRef?: BsModalRef;
  categories= [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Apperizers',
    'Desserts',
    'Snacks',
    'Vegeterian',
    'Chinese',
    'Italian',
    
  ]

  constructor(private accservice : AccountService, private memberservice : MemberService , private recipeservice : RecipeService,
              private toastr : ToastrService , private router : Router, private modalService: BsModalService) {
      this.accservice.currentuser$.pipe(take(1)).subscribe({
        next : user => this.user = user
      })
  }
  openDeleteModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if(!this.user) return;
    this.memberservice.getMember(this.user.username).subscribe({
      next : member => this.member = member
    })
  }

  updateMember() {
    this.memberservice.updateMember(this.editform?.value).subscribe({
      next : () => {
        this.toastr.success("Profile Updated Successfully");
        this.editform?.reset(this.member);
      }
    })
  }

  editRecipeHover(title : string) {
    this.router.navigateByUrl( this.member?.username  +  "/myrecipe/editrecipe/" + title);
  }
  createRecipeHover() {
    this.router.navigateByUrl(this.member?.username + '/myrecipe/new/createrecipe'); 
  }

  DeleteRecipe(id : number) {
     this.recipeservice.DeleteRecipe(id).subscribe({
      next : () => {
         this.toastr.success("Recipe Deleted");
         this.modalRef?.hide()
         this.updateMember()
      }
     })
  } 
}

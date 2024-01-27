import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/Member';
import { Recipe } from 'src/app/_models/Recipe';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-members-details',
  standalone: true,
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css'],
  imports: [
    CommonModule,
    TabsModule,
    GalleryModule
  ]
})
export class MembersDetailsComponent implements OnInit {
  member : Member | undefined;
  images : GalleryItem[] = [];

  constructor(private memberservice : MemberService, private route : ActivatedRoute) {

  }
  ngOnInit(): void {
    this.loadMember();

  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberservice.getMember(username).subscribe({
      next : member => {
        this.member = member;
        
      }
    })
  }

  getImages(recipe: Recipe) {
    if (!this.member) return;
    this.images = []; 
    for (const photo of recipe.photos) {
        this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }


}

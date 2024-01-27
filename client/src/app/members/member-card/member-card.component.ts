import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/_models/Member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member : Member | undefined;
  modalref? : BsModalRef
  constructor(private modalservice : BsModalService) {

  }
  ngOnInit(): void {
    
  }

  openModal(template: TemplateRef<void>) {
    this.modalref = this.modalservice.show(template);
  }
  
}

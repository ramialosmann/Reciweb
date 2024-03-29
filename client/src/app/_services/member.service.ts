import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  constructor(private http : HttpClient) { 

  }
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username : string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username )
  }

  updateMember(member : Member) {
    return this.http.put(this.baseUrl + 'users' , member);
  }


}

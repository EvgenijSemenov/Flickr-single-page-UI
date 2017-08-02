import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flickr } from '../../flickr/flickr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if(!Flickr.isAuthorized()) {
      this.logout();
    }
  }

  private logout() {
    Flickr.clearAuthData();
    this.router.navigate([""]);
  }

}

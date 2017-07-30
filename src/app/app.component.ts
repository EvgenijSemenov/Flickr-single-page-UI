import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private location: Location) {
  }

  public isNotFlickrOauthCallback() {
    return !(this.location.path().indexOf("/flickr-oauth-callback") > -1);
  }

}

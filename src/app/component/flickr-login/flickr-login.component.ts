import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Flickr } from '../../flickr/flickr';
import { FlickrLoginService } from '../../service/flickr-login.service';

@Component({
  selector: 'app-flickr-login',
  templateUrl: './flickr-login.component.html',
  styleUrls: ['./flickr-login.component.css']
})
export class FlickrLoginComponent {

  constructor(private router: Router, private flickrLoginService:FlickrLoginService) {
  }

  private flickrLogin() {
    this.flickrLoginService.login(Flickr.getAuthCredential(), (requestBody) => this.onSuccessLogin(requestBody));
  }

  private onSuccessLogin(requestBody: string) {
    let searchParams: URLSearchParams = new URLSearchParams(requestBody);
    Flickr.saveUserInfo(searchParams.get("user_nsid"), searchParams.get("fullname"));
    Flickr.saveAuthCredential(searchParams.get("oauth_token"), searchParams.get("oauth_token_secret"));
    this.router.navigate(['/albums']);
  }

}

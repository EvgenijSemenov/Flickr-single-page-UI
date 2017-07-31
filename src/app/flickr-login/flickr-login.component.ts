import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { FlickrLoginService } from '../flickr-login.service';

@Component({
  selector: 'app-flickr-login',
  templateUrl: './flickr-login.component.html',
  styleUrls: ['./flickr-login.component.css']
})
export class FlickrLoginComponent {


  constructor(private flickrLoginService:FlickrLoginService) {
  }

  private flickrLogin() {
    let flickrAppCredential = {
      "apiKey": environment.apiKey,
      "apiSecret": environment.apiSecret
    }

    this.flickrLoginService.login(flickrAppCredential, this.onSuccessLogin);
  }

  private onSuccessLogin(requestBody: string) {
    console.log(requestBody);
    let body: string = requestBody;
    console.log(body);
    let searchParams: URLSearchParams = new URLSearchParams(requestBody);
    console.log(searchParams.get("fullname"));
    //let user: User = JSON.parse(requestBody["user"]);
    //console.log(user);
  }

}

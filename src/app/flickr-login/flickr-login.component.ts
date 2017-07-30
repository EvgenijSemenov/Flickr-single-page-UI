import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { FlickrLoginService } from '../flickr-login.service';

@Component({
  selector: 'app-flickr-login',
  templateUrl: './flickr-login.component.html',
  styleUrls: ['./flickr-login.component.css']
})
export class FlickrLoginComponent {

  apiKey: string = "e180b96bece37e723341684dd8662931";
  apiSecret: string = "e124ba5bf1b23193";

  constructor(private flickrLoginService:FlickrLoginService) {
  }

  private flickrLogin() {
    let flickrAppCredential = {
      "apiKey": this.apiKey,
      "apiSecret": this.apiSecret
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

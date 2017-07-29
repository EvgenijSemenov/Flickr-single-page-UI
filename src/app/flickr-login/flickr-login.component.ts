import { Component } from '@angular/core';
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
    this.flickrLoginService.login(this.apiKey, this.apiSecret);
  }

}

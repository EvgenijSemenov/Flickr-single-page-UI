import { Component } from '@angular/core';

@Component({
  selector: 'app-flickr-oauth-login-callback',
  templateUrl: './flickr-oauth-login-callback.component.html',
  styleUrls: ['./flickr-oauth-login-callback.component.css']
})
export class FlickrOauthLoginCallbackComponent {

  constructor() {
    let urlParams: string = window.location.href.split("?")[1];
    let event = new CustomEvent("FlickrOauthCallbeck", {
      "detail": {
        "oauth_token": this.paramValue(urlParams, "oauth_token"),
        "oauth_verifier": this.paramValue(urlParams, "oauth_verifier")
      }
    });

    window.opener.dispatchEvent(event);
    window.close();
  }

  private paramValue(paramsString: string, paramName: string): string {
    let value: string = "";
    let params: string[] = paramsString.split("&");

    for (let i = 0; i < params.length; i++) {
      if (params[i].startsWith(paramName + "=")) {

        value = params[i].split("=")[1];
        break;
      }
    }

    return value;
  }
}

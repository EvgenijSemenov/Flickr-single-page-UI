import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-flickr-oauth-login-callback',
  template: ''
})
export class FlickrOauthLoginCallbackComponent {

  constructor() {
    this.flickrOauthCallbeck();
  }

  private flickrOauthCallbeck() {
    let searchParams: URLSearchParams = new URLSearchParams(window.location.href.split("?")[1]);
    let event = new CustomEvent("FlickrOauthCallbeck", {
      "detail": {
        "oauth_token": searchParams.get("oauth_token"),
        "oauth_verifier": searchParams.get("oauth_verifier")
      }
    });

    window.opener.dispatchEvent(event);
    window.close();
  }

}

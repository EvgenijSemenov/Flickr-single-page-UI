import { Component } from '@angular/core';
import { FlickrRequestUrlBuilder } from '../flickr/flickr-request-url-builder';

@Component({
  selector: 'app-flickr-oauth-login-callback',
})
export class FlickrOauthLoginCallbackComponent {

  constructor() {
    this.flickrOauthCallbeck()
  }

  private flickrOauthCallbeck() {
    let urlParams: string = window.location.href.split("?")[1];
    let event = new CustomEvent("FlickrOauthCallbeck", {
      "detail": {
        "oauth_token": FlickrRequestUrlBuilder.urlParamValue(urlParams, "oauth_token"),
        "oauth_verifier": FlickrRequestUrlBuilder.urlParamValue(urlParams, "oauth_verifier")
      }
    });

    window.opener.dispatchEvent(event);
    window.close();
  }

}

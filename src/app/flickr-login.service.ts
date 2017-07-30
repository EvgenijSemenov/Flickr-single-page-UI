import { request } from 'http';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { FlickrRequestUrlBuilder } from './flickr/flickr-request-url-builder';

@Injectable()
export class FlickrLoginService {

  private appCredential;
  private onSuccess:(body: string) => void;
  
  constructor(private http: Http) { }

  public login(appCredential, onSuccess:(body: string) => void) {
    this.onSuccess = onSuccess;
    this.initAppCredential(appCredential);
    let requestTokenUrl: string = FlickrRequestUrlBuilder.requestTokenUrl(this.appCredential)
    
    this.http.get(requestTokenUrl).subscribe(data => {
      let searchParams: URLSearchParams = new URLSearchParams(data.text());

      this.appCredential["oauthToken"] = searchParams.get("oauth_token");
      this.appCredential["oauthTokenSecret"] = searchParams.get("oauth_token_secret");
      
      this.authorizationRequest(FlickrRequestUrlBuilder.authorizationRequestUrl(this.appCredential));
    });
  }

  private initAppCredential(appCredential) {
    this.appCredential = {
      "apiKey": appCredential["apiKey"],
      "apiSecret": appCredential["apiSecret"],
      "oauthToken": "",
      "oauthTokenSecret": "",
      "oauthVerifier": ""
    }
  }

  private authorizationRequest(url: string) {
    this.addOauthCallbeckListener();
    this.openRequestInNewTab(url);
  }

  private openRequestInNewTab(url: string) {
    window.open(url, '_blank').focus();
  }

  private addOauthCallbeckListener() {
    window.addEventListener("FlickrOauthCallbeck", e => this.flickerOauthHandler(e), false);
  }

  private flickerOauthHandler(event) {
    this.appCredential["oauthVerifier"] = event.detail["oauth_verifier"];
    let accessTokenUrl: string = FlickrRequestUrlBuilder.accessTokenUrl(this.appCredential);
    this.http.get(accessTokenUrl).subscribe(data => {
      this.onSuccess(decodeURIComponent(data.text()));
    });
  }

}

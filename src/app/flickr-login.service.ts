import { request } from 'http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FlickrRequestUrlBuilder } from './flickr/flickr-request-url-builder';

@Injectable()
export class FlickrLoginService {

  private appCredential;
  
  constructor(private http: Http) { }

  public login(apikey: string, apiSecret: string) {
    this.initAppCredential(apikey, apiSecret);
    let requestTokenUrl: string = FlickrRequestUrlBuilder.requestTokenUrl(this.appCredential)
    
    this.http.get(requestTokenUrl).subscribe(data => {
      let paramsString: string = data.text();

      this.appCredential["oauthToken"] = FlickrRequestUrlBuilder.urlParamValue(paramsString, "oauth_token");
      this.appCredential["oauthTokenSecret"] = FlickrRequestUrlBuilder.urlParamValue(paramsString, "oauth_token_secret");
      
      this.authorizationRequest(FlickrRequestUrlBuilder.authorizationRequestUrl(this.appCredential));
    });
  }

  private initAppCredential(apikey: string, apiSecret: string) {
    this.appCredential = {
      "apiKey": apikey,
      "apiSecret": apiSecret,
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
    this.http.get(accessTokenUrl).subscribe(data => this.test(data.text()));
  }

  private test(text: string) {
    this.appCredential["oauthToken"] = FlickrRequestUrlBuilder.urlParamValue(text, "oauth_token");
    this.appCredential["oauthTokenSecret"] = FlickrRequestUrlBuilder.urlParamValue(text, "oauth_token_secret");

    let url: string = FlickrRequestUrlBuilder.apiUrl("flickr.test.login", this.appCredential);
    console.log(url);
    this.http.get(url).subscribe(data => console.log(data));
  }

}

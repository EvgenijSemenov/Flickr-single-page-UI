import { request } from 'http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class FlickrLoginService {

  key: string = "e180b96bece37e723341684dd8662931";
  secret: string = "e124ba5bf1b23193";

  flickrRequestTokenUrl: string = "https://www.flickr.com/services/oauth/request_token?";
  oauth_nonce: string = "89601180";

  constructor(private http: Http) { }

  public test() {
    //this.http.get("https://api.flickr.com/services/rest/?method=flickr.auth.oauth.getAccessToken&api_key=98c22e511ceb91a7f0e26a18b4b6fa05&format=json&nojsoncallback=1&auth_token=72157684186202213-09bcce570512e2ad&api_sig=b0fe6846f3ddd11dc8eb41932b5410ef").subscribe(data => console.log(data));
    let requestUrl = this.flickrRequestTokenUrl;
    requestUrl += "oauth_nonce=" + (Math.random() * (1000000 - 100000) + 100000);
    requestUrl += "&oauth_timestamp=" + Date.now();
    requestUrl += "&oauth_consumer_key=" + this.key;
    requestUrl += "&oauth_signature_method=HMAC-SHA1";
    requestUrl += "&oauth_version=1.0";
    requestUrl += "&oauth_callback=http%3A%2F%2Flocalhost%3A4200";
    console.log("RequestUrl: " + requestUrl);
    requestUrl = this.signRequest("GET", requestUrl);
    this.http.get(requestUrl.replace("https://www.flickr.com/", "")).subscribe(data => console.log(data));
  }

  private signRequest(method: string, requestUrl: string): string {
    let baseString: string = method + "&" + this.baseStringFromUrl(requestUrl);
    console.log(baseString);
    //let encrypted = CryptoJS.HmacSHA1(baseString, this.key + "&" + this.secret);
    let hmacSHA1: string = CryptoJS.HmacSHA1(baseString, this.secret + "&");
    console.log("hmacSHA1: " + hmacSHA1);
    requestUrl += "&oauth_signature=" + encodeURI(CryptoJS.enc.Base64.stringify(hmacSHA1));

    return requestUrl;
  }

  private baseStringFromUrl(url: string): string {
    let baseString: string = url.split("?")[0] + "&";
    baseString += url.split("?")[1].split("&").sort().join("%26");
    baseString = baseString.replace(new RegExp(":", 'g'), "%3A");
    baseString = baseString.replace(new RegExp("/", 'g'), "%2F");
    baseString = baseString.replace(new RegExp("=", 'g'), "%3D");
    baseString = baseString.replace(new RegExp("http%3A%2F%2Flocalhost%3A4200", 'g'), "http%253A%252F%252Flocalhost%253A4200");

    return baseString;
  }

}
"GET&https%3A%2F%2Fwww.flickr.com%2Fservices%2Foauth%2Frequest_token&oauth_callback%3Dhttp%253A%252F%252Flocalhost%253A4200%26oauth_consumer_key%3De180b96bece37e723341684dd8662931%26oauth_nonce%3D110185.58638325773%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1501162067084%26oauth_version%3D1.0"
"GET&https%3A%2F%2Fwww.flickr.com%2Fservices%2Foauth%2Frequest_token&oauth_callback%3Dhttp%253A%252F%252Flocalhost%253A4200%26oauth_consumer_key%3De180b96bece37e723341684dd8662931%26oauth_nonce%3D110185.58638325773%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1501162067084%26oauth_version%3D1.0"
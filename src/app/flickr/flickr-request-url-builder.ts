import { URLSearchParams } from '@angular/http';
import * as CryptoJS from 'crypto-js';

export class FlickrRequestUrlBuilder {
  
  private static flickrUrl: string = "https://www.flickr.com";

  private static oauthCallbackUri: string = "/flickr-oauth-callback";
  private static requestTokenUri: string = "/services/oauth/request_token";
  private static oauthAuthorizeUri: string = "/services/oauth/authorize";
  private static oauthAccessTokenUri: string = "/services/oauth/access_token";
  private static apiUri: string = "/services/rest";

  
  public static requestTokenUrl(appCredential): string {
    let url: string = this.flickrUrl + this.requestTokenUri;
    url += "?" + this.preRequesUrlParams(appCredential["apiKey"]);
    url += "&" + this.oauthCallbackParam();
    url += "&" + this.urlSignatureParam("GET", url, appCredential);

    console.log(url);

    return this.removeFlickrUrlPrefix(url);
  }

  public static authorizationRequestUrl(appCredential): string {
    return this.flickrUrl + this.oauthAuthorizeUri + "?" + this.oauthTokenParam(appCredential["oauthToken"]);
  }

  public static accessTokenUrl(appCredential) {
    let url: string = this.flickrUrl + this.oauthAccessTokenUri;
    url += "?" + this.preRequesUrlParams(appCredential["apiKey"]);
    url += "&" + this.oauthTokenParam(appCredential["oauthToken"]);
    url += "&" + this.oauthVerifierParam(appCredential["oauthVerifier"]);
    url += "&" + this.urlSignatureParam("GET", url, appCredential);

    return this.removeFlickrUrlPrefix(url);
  }

  public static apiUrl(apiParamMethod: string, appCredential): string {
    let url: string = this.flickrUrl + this.apiUri;
    url += "?" + this.preRequesUrlParams(appCredential["apiKey"]);
    url += "&" + this.oauthTokenParam(appCredential["oauthToken"]);
    url += "&" + this.apiMethodParam(apiParamMethod);
    url += "&" + this.jsonFormatParams();
    url += "&" + this.urlSignatureParam("GET", url, appCredential);

    return this.removeFlickrUrlPrefix(url);
  }

  private static preRequesUrlParams(apiKey: string): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set("oauth_nonce", this.requestNonce());
    urlSearchParams.set("oauth_timestamp", Date.now().toString());
    urlSearchParams.set("oauth_consumer_key", apiKey);
    urlSearchParams.set("oauth_signature_method", "HMAC-SHA1");
    urlSearchParams.set("oauth_version", "1.0");   

    return urlSearchParams.toString();
  }

  private static oauthTokenParam(oauthToken: string): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set("oauth_token", oauthToken);

    return urlSearchParams.toString();
  }

  private static oauthVerifierParam(oauthVerifier: string): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set("oauth_verifier", oauthVerifier);

    return urlSearchParams.toString();
  }

  private static apiMethodParam(apiMethod: string): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set("method", apiMethod);

    return urlSearchParams.toString();
  }

  private static jsonFormatParams(): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set("format", "json");
    urlSearchParams.set("nojsoncallback", "1");

    return urlSearchParams.toString();
  }

  private static oauthCallbackParam(): string {
    let oauthCallbackUrl: string = this.applicationDomainAddress() + this.oauthCallbackUri;
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set("oauth_callback", encodeURIComponent(oauthCallbackUrl));

    return urlSearchParams.toString();
  }

  private static requestNonce(): string {
    return (Math.random() * (1000000 - 100000) + 100000).toString();
  }

  private static applicationDomainAddress(): string {
    let domainAddress = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port != '80') {
      domainAddress += ":" + window.location.port;
    }

    return domainAddress;
  }

  private static urlSignatureParam(requestMethod:string, url: string, appCredential): string {
    console.log(requestMethod);
    console.log(url);
    console.log(appCredential);
    let baseString: string = requestMethod + "&" + this.baseStringFromUrl(url);
    let hmacSHA1: string = CryptoJS.HmacSHA1(baseString, appCredential["apiSecret"] + "&" + appCredential["oauthTokenSecret"]);

    return "oauth_signature=" + encodeURIComponent(CryptoJS.enc.Base64.stringify(hmacSHA1));
  }

  private static baseStringFromUrl(url: string): string {
    let baseStringUrl: string = encodeURIComponent(url.split("?")[0]);
    let baseStringParams: string = url.split("?")[1].split("&").sort().join("&");
    baseStringParams = encodeURIComponent(baseStringParams);

    return baseStringUrl + "&" + baseStringParams;
  }

  private static removeFlickrUrlPrefix(url: string): string {
    return url.replace(this.flickrUrl, "");
  }

}

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
    url += this.preRequesUrlParams(appCredential["apiKey"]);
    url += this.oauthCallbackParam();
    url += this.urlSignatureParam("GET", url, appCredential);

    return this.removeFlickrUrlPrefix(url);
  }

  public static authorizationRequestUrl(appCredential): string {
    return this.flickrUrl + this.oauthAuthorizeUri + "?" + this.oauthTokenParam(appCredential["oauthToken"]);
  }

  public static accessTokenUrl(appCredential) {
    let url: string = this.flickrUrl + this.oauthAccessTokenUri;
    url += this.preRequesUrlParams(appCredential["apiKey"]);
    url += this.oauthTokenParam(appCredential["oauthToken"]);
    url += this.oauthVerifierParam(appCredential["oauthVerifier"]);
    url += this.urlSignatureParam("GET", url, appCredential);

    return this.removeFlickrUrlPrefix(url);
  }

  public static apiUrl(apiParamMethod: string, appCredential): string {
    let url: string = this.flickrUrl + this.apiUri;
    url += this.preRequesUrlParams(appCredential["apiKey"]);
    url += this.oauthTokenParam(appCredential["oauthToken"]);
    url += this.apiMethodParam(apiParamMethod);
    url += this.jsonFormatParams();
    url += this.urlSignatureParam("GET", url, appCredential);

    return this.removeFlickrUrlPrefix(url);
  }

  public static urlParamValue(paramsString: string, paramName: string): string {
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

  private static preRequesUrlParams(apiKey: string): string {
    let paramString: string = "?oauth_nonce=" + this.requestNonce();
    paramString += "&oauth_timestamp=" + Date.now();
    paramString += "&oauth_consumer_key=" + apiKey;
    paramString += "&oauth_signature_method=HMAC-SHA1";
    paramString += "&oauth_version=1.0";   
    
    return paramString;
  }

  private static oauthTokenParam(oauthToken: string): string {
    return "&oauth_token=" + oauthToken;
  }

  private static oauthVerifierParam(oauthVerifier: string): string {
    return "&oauth_verifier=" + oauthVerifier;
  }

  private static apiMethodParam(apiMethod: string): string {
    return "&method=" + apiMethod;
  }

  private static jsonFormatParams(): string {
    return "&nojsoncallback=1&format=json";
  }

  private static requestNonce(): string {
    return (Math.random() * (1000000 - 100000) + 100000).toString();
  }

  private static oauthCallbackParam(): string {
    let oauthCallbackUrl: string = this.applicationDomainAddress() + this.oauthCallbackUri;

    return "&oauth_callback=" + encodeURIComponent(oauthCallbackUrl);
  }

  private static applicationDomainAddress(): string {
    let domainAddress = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port != '80') {
      domainAddress += ":" + window.location.port;
    }

    return domainAddress;
  }

  private static urlSignatureParam(requestMethod:string, url: string, appCredential) {
    let baseString: string = requestMethod + "&" + this.baseStringFromUrl(url);
    let hmacSHA1: string = CryptoJS.HmacSHA1(baseString, appCredential["apiSecret"] + "&" + appCredential["oauthTokenSecret"]);

    return "&oauth_signature=" + encodeURIComponent(CryptoJS.enc.Base64.stringify(hmacSHA1));
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

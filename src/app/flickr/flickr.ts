import { environment } from '../../environments/environment';

export class Flickr {

  public static saveAuthCredential(oauthToken: string, oauthTokenSecret: string) {
    localStorage.setItem("oauth_token", oauthToken);
    localStorage.setItem("oauth_token_secret", oauthTokenSecret);
  }

  public static getAuthCredential(): any {
    return {
      "apiKey": environment.apiKey,
      "apiSecret": environment.apiSecret,
      "oauthToken": localStorage.getItem("oauth_token"),
      "oauthTokenSecret": localStorage.getItem("oauth_token_secret")
    }
  }

}

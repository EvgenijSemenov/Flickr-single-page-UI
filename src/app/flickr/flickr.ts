import { environment } from '../../environments/environment';

export class Flickr {

  public static isAuthorized(): boolean {
    let result: boolean = false;
    if (localStorage.getItem("id") 
          && localStorage.getItem("fullname")
          && localStorage.getItem("oauth_token") 
          && localStorage.getItem("oauth_token_secret")) {
      result = true;
    }

    return result;
  }

  public static saveAuthCredential(oauthToken: string, oauthTokenSecret: string) {
    localStorage.setItem("oauth_token", oauthToken);
    localStorage.setItem("oauth_token_secret", oauthTokenSecret);
  }

  public static saveUserInfo(id: string, fullName: string) {
    localStorage.setItem("id", id);
    localStorage.setItem("fullname", fullName);
  }

  public static getAuthCredential(): any {
    return {
      "apiKey": environment.apiKey,
      "apiSecret": environment.apiSecret,
      "oauthToken": localStorage.getItem("oauth_token"),
      "oauthTokenSecret": localStorage.getItem("oauth_token_secret")
    }
  }

  public static clearAuthData() {
    localStorage.removeItem("id");
    localStorage.removeItem("fullname");
    localStorage.removeItem("oauth_token");
    localStorage.removeItem("oauth_token_secret");
  }

}

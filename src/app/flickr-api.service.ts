import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Photoset } from './model/photoset';
import { FlickrRequestUrlBuilder } from './flickr/flickr-request-url-builder';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FlickrApiService {

  constructor(private http: Http) { }

  public photosetListByUserId(userId: string, primaryPhotoExtras: string, appCrdential): Observable<Photoset[]> {
    let extraParams: string = "user_id=" + userId;
    extraParams += "&primary_photo_extras" + primaryPhotoExtras;
    let url: string = FlickrRequestUrlBuilder.apiUrl("flickr.photosets.getList", appCrdential, extraParams);
    
    return this.http.get(url)
      .map((res: Response) => res.text()["photoset"])
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

}

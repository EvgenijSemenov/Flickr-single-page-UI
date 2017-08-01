import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Photoset } from './model/photoset';
import { FlickrRequestUrlBuilder } from './flickr/flickr-request-url-builder';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FlickrApiService {

  constructor(private http: Http) { }

  public photosetsTotal(userId: string, appCrdential): Observable<number> {
    let extraParams: string = "user_id=" + userId;
    extraParams += "&page=1";
    extraParams += "&per_page=0";
    let url: string = FlickrRequestUrlBuilder.apiUrl(appCrdential, "flickr.photosets.getList", extraParams);
    
    return this.http.get(url)
      .map((res: Response) => res.json().photosets.total as number)
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  public photosetListByUserId(userId: string, page: number, perPage: number, appCrdential): Observable<Photoset[]> {
    let extraParams: string = "user_id=" + userId;
    extraParams += "&primary_photo_extras=url_sq";
    extraParams += "&page=" + page;
    extraParams += "&per_page=" + perPage;
    let url: string = FlickrRequestUrlBuilder.apiUrl(appCrdential, "flickr.photosets.getList", extraParams);
    
    return this.http.get(url)
      .map((res: Response) => res.json().photosets.photoset as Photoset[])
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

}

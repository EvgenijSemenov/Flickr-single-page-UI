
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Flickr } from '../flickr/flickr';
import { FlickrRequestUrlBuilder } from '../flickr/flickr-request-url-builder';
import { Photoset } from '../model/photoset';
import { Photo } from '../model/photo';
import { Size } from '../model/size';

@Injectable()
export class FlickrApiService {

  constructor(private http: Http) { }

  public photosetsTotal(userId: string): Observable<number> {
    let extraParams: string = "user_id=" + userId;
    extraParams += "&page=1";
    extraParams += "&per_page=0";
    let url: string = FlickrRequestUrlBuilder.apiUrl(Flickr.getAuthCredential(), "flickr.photosets.getList", extraParams);

    return this.http.get(url)
      .map((res: Response) => res.json().photosets.total as number)
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  public getPhotoset(userId: string, photosetId: string): Observable<Photoset> {
    let method: string = "flickr.photosets.getInfo";
    let extraParams: string = "user_id=" + userId;
    extraParams += "&photoset_id=" + photosetId;
    let url: string = FlickrRequestUrlBuilder.apiUrl(Flickr.getAuthCredential(), method, extraParams);
  
    return this.http.get(url)
      .map((res: Response) => res.json().photoset as Photoset)
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  public photosetListByUserId(userId: string, page: number, perPage: number): Observable<Photoset[]> {
    let extraParams: string = "user_id=" + userId;
    extraParams += "&primary_photo_extras=url_sq";
    extraParams += "&page=" + page;
    extraParams += "&per_page=" + perPage;
    let url: string = FlickrRequestUrlBuilder.apiUrl(Flickr.getAuthCredential(), "flickr.photosets.getList", extraParams);
    
    return this.http.get(url)
      .map((res: Response) => res.json().photosets.photoset as Photoset[])
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  public getPhotosByPhotosetId(userId: string, photosetId: string, page: number, perPage: number): Observable<Photo[]> {
    let method = "flickr.photosets.getPhotos";
    let extraParams: string = "user_id=" + userId;
    extraParams += "&photoset_id=" + photosetId;
    extraParams += "&extras=url_sq, date_upload, original_format";
    extraParams += "&page=" + page;
    extraParams += "&per_page=" + perPage;
    let url: string = FlickrRequestUrlBuilder.apiUrl(Flickr.getAuthCredential(), method, extraParams);
    
    return this.http.get(url)
      .map((res: Response) => res.json().photoset.photo as Photo[])
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  public getPhotoInfo(photoId: string, secret?: string): Observable<Photo> {
    let method: string = "flickr.photos.getInfo";
    let extraParams: string = "photo_id=" + photoId;
    if (secret) {
      extraParams += "&secret=" + secret;
    }
    let url: string = FlickrRequestUrlBuilder.apiUrl(Flickr.getAuthCredential(), method, extraParams);
  
    return this.http.get(url)
      .map((res: Response) => res.json().photo as Photo)
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

  public getPhotoSizes(photoId: string): Observable<Size[]> {
    let method: string = "flickr.photos.getSizes";
    let extraParams: string = "photo_id=" + photoId;
    let url: string = FlickrRequestUrlBuilder.apiUrl(Flickr.getAuthCredential(), method, extraParams);
  
    return this.http.get(url)
      .map((res: Response) => res.json().sizes.size as Size[])
      .catch((err:any) => Observable.throw(err.json().error || 'Server error'));
  }

}

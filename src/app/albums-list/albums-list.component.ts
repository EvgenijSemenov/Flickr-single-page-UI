import { Data } from '@angular/router';
import { PrimaryPhotoExtras } from '../model/primary-photo-extras';
import { Content } from '../model/content';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FlickrApiService } from '../flickr-api.service';
import { Photoset } from '../model/photoset';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  private userId: string = "";
  private fullName: string = "";
  private photosetList: Photoset[] = [];
  private photosetsTotal: number = 0;
  private photosetPerPage: number = 10;

  constructor(private flickrApiServicel: FlickrApiService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("id");
    this.fullName = localStorage.getItem("fullname");
    this.initPhotosets();
  }

  private initPhotosets() {
    this.flickrApiServicel.photosetsTotal(this.userId, this.appCredential())
      .subscribe(total => {
        this.photosetsTotal = total;
        if (this.photosetsTotal > 0) {
          this.loadPhotoset();
        }
      });
  }

  private loadPhotoset() {
    let page: number = 1
    if (this.photosetList.length != 0) {
      page = this.photosetList.length / this.photosetPerPage + 1;
    }
    this.flickrApiServicel.photosetListByUserId(this.userId, page, this.photosetPerPage, this.appCredential())
      .subscribe(photosetList => this.photosetList = this.photosetList.concat(photosetList));
  }

  private appCredential(): any {
    return {
      "apiKey": environment.apiKey,
      "apiSecret": environment.apiSecret,
      "oauthToken": localStorage.getItem("oauth_token"),
      "oauthTokenSecret": localStorage.getItem("oauth_token_secret")
    }
  }

  private isAllPhotosetsLoaded(): boolean {
    return (this.photosetList.length == this.photosetsTotal);
  }

}

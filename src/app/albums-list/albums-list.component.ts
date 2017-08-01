import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../flickr-api.service';
import { Photoset } from '../model/photoset';
import { Flickr } from '../flickr/flickr';

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

  constructor(private router: Router, private flickrApiServicel: FlickrApiService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("id");
    this.fullName = localStorage.getItem("fullname");
    this.initPhotosets();
  }

  private initPhotosets() {
    this.flickrApiServicel.photosetsTotal(this.userId)
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
    this.flickrApiServicel.photosetListByUserId(this.userId, page, this.photosetPerPage)
      .subscribe(photosetList => this.photosetList = this.photosetList.concat(photosetList));
  }

  private isAllPhotosetsLoaded(): boolean {
    return (this.photosetList.length == this.photosetsTotal);
  }

  private openAlbum(id: string) {
    this.router.navigate(["/album", id]);
  }

}

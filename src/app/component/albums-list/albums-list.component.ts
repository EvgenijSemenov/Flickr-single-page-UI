import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../../service/flickr-api.service';
import { Photoset } from '../../model/photoset';
import { Flickr } from '../../flickr/flickr';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  private userId: string = "";
  private fullName: string = "";
  private photosets: Photoset[];
  private photosetsTotal: number;
  private photosetPerPage: number = 10;

  constructor(private router: Router, private flickrApiServicel: FlickrApiService) { }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    this.userId = localStorage.getItem("id");
    this.fullName = localStorage.getItem("fullname");
    this.initPhotosetsTotal();
    this.loadPhotoset();
  }

  private initPhotosetsTotal() {
    this.flickrApiServicel.photosetsTotal(this.userId)
      .subscribe(total => this.photosetsTotal = total);
  }

  private loadPhotoset() {
    let page: number = 1
    if (this.photosets) {
      page = this.photosets.length / this.photosetPerPage + 1;
    }
    this.flickrApiServicel.photosetListByUserId(this.userId, page, this.photosetPerPage)
      .subscribe(photosets => this.addPhotosets(photosets));
  }

  private addPhotosets(photosets: Photoset[]) {
    if(this.photosets) {
      this.photosets = this.photosets.concat(photosets);
    } else {
      this.photosets = photosets;
    }
  }

  private isAllPhotosetsLoaded(): boolean {
    return (this.photosets.length == this.photosetsTotal);
  }

  private openAlbum(id: string) {
    this.router.navigate(["/album", id]);
  }

}

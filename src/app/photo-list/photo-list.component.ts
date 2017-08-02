import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photoset } from '../model/photoset';
import { Photo } from '../model/photo';
import { FlickrApiService } from '../flickr-api.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  private photoset: Photoset;
  private photoPerPage: number = 30;
  private photos: Photo[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService: FlickrApiService
  ) { }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    this.activatedRoute.params.subscribe(params => {
      this.initPhotoset(localStorage.getItem("id"), params['id']);
    });
  }

  private initPhotoset(userId: string, photosetId: string) {
    this.apiService.getPhotoset(userId, photosetId)
      .subscribe(photoset => {
        this.photoset = photoset;
        this.loadPhotos()
      });
  }

  private loadPhotos() {
    this.apiService.getPhotosByPhotosetId(localStorage.getItem("id"), this.photoset.id, this.photoLoadPageNumber(), this.photoPerPage)
      .subscribe(photos => this.addPhotosInList(photos));
  }

  private photoLoadPageNumber(): number {
    let page: number = 1;
    if (this.photos) {
      page = this.photos.length / this.photoPerPage + 1;
    }

    return page;
  }

  private addPhotosInList(photos: Photo[]) {
    if(this.photos) {
      this.photos = this.photos.concat(photos);
    } else {
      this.photos = photos;
    }
  }

  private isShowMoreButtonHidden(): boolean {
    let result: boolean = true;
    if (this.photoset && this.photos) {
      if (this.photos.length < this.photoset.photos) {
        result = false;
      }
    }

    return result;
  }

  private openPhoto(photoId: string) {
    this.router.navigate(["/album/" + this.photoset.id + "/photo/", photoId]);
  }

}
